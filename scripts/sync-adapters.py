#!/usr/bin/env python3
"""
sync-adapters.py — Memory Adapter Layer

从 adapters/ (薄 Agent 入口模板) 生成各 Agent 入口文件。
入口文件只作为钥匙和索引；项目记忆保存在 .ai/ 内，不随每次状态变化重新编译。

用法:
  python scripts/sync-adapters.py              # 生成全部
  python scripts/sync-adapters.py --dry-run    # 预览不写入
  python scripts/sync-adapters.py --agent codex  # 只生成指定 Agent
  python scripts/sync-adapters.py --status     # 检查同步状态

映射表:
  adapters/codex.md    → AGENTS.md              (Codex CLI 入口)
  adapters/claude.md   → CLAUDE.md              (Claude Code 入口)
  adapters/cursor.md   → .cursorrules           (Cursor 规则)
  adapters/openclaw.md → AGENTS.openclaw.md     (OpenClaw 备选入口)
  adapters/hermes.md   → ~/.hermes/skills/potato-ui/SKILL.md  (Hermes Skill)
"""

import os
import sys
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
AI_DIR = PROJECT_ROOT / ".ai"
ADAPTERS_DIR = PROJECT_ROOT / "adapters"
SYNCSTATE_FILE = PROJECT_ROOT / ".syncstate.json"

# Agent → adapter source → output target
ADAPTER_MAP = {
    "codex": {
        "source": ADAPTERS_DIR / "codex.md",
        "target": PROJECT_ROOT / "AGENTS.md",
        "description": "Codex CLI",
    },
    "claude": {
        "source": ADAPTERS_DIR / "claude.md",
        "target": PROJECT_ROOT / "CLAUDE.md",
        "description": "Claude Code",
    },
    "cursor": {
        "source": ADAPTERS_DIR / "cursor.md",
        "target": PROJECT_ROOT / ".cursorrules",
        "description": "Cursor IDE",
    },
    "openclaw": {
        "source": ADAPTERS_DIR / "openclaw.md",
        "target": PROJECT_ROOT / "AGENTS.openclaw.md",
        "description": "OpenClaw (备选 AGENTS.md)",
    },
    "hermes": {
        "source": ADAPTERS_DIR / "hermes.md",
        "target": Path.home() / ".hermes" / "skills" / "potato-ui" / "SKILL.md",
        "description": "Hermes Skill",
    },
}

HEADER_TEMPLATE = """<!--
  由 scripts/sync-adapters.py 自动生成
  来源: {source}
  同步时间: {timestamp}
  请勿手动编辑 — 修改 {source} 或 .ai/vendor/ 后再运行 sync
-->
"""


def get_entry_hash() -> str:
    """计算 vendor 协议和适配器模板哈希；项目 state/logs 变化不触发入口同步。"""
    import hashlib

    hasher = hashlib.sha256()
    for d in [AI_DIR / "vendor", ADAPTERS_DIR]:
        if not d.exists():
            continue
        for f in sorted(d.glob("*.md")):
            hasher.update(f.read_bytes())
    return hasher.hexdigest()[:16]


def load_syncstate() -> dict:
    if SYNCSTATE_FILE.exists():
        return json.loads(SYNCSTATE_FILE.read_text())
    return {}


def save_syncstate(state: dict):
    SYNCSTATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n")


def check_prerequisites() -> bool:
    """检查必需目录和文件是否存在。"""
    issues = []

    if not AI_DIR.exists():
        issues.append(f"  ✗ .ai/ 目录不存在: {AI_DIR}")
    if not ADAPTERS_DIR.exists():
        issues.append(f"  ✗ adapters/ 目录不存在: {ADAPTERS_DIR}")

    for agent, cfg in ADAPTER_MAP.items():
        if not cfg["source"].exists():
            issues.append(f"  ✗ 适配器缺失: {cfg['source']} (Agent: {agent})")

    if issues:
        print("前置检查失败:")
        for i in issues:
            print(i)
        return False
    return True


def sync_agent(agent: str, dry_run: bool = False) -> bool:
    """同步单个 Agent 的入口文件。"""
    cfg = ADAPTER_MAP[agent]
    source = cfg["source"]
    target = cfg["target"]

    if not source.exists():
        print(f"  ✗ {agent}: 源适配器不存在 ({source})")
        return False

    content = source.read_text()
    header = HEADER_TEMPLATE.format(
        source=str(source.relative_to(PROJECT_ROOT)),
        timestamp=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
    )

    # 检查是否已有 header (防止重复)
    if content.startswith("<!--"):
        # 已有 header，替换它
        lines = content.split("\n")
        end_idx = 0
        for i, line in enumerate(lines):
            if line.strip() == "-->":
                end_idx = i + 1
                break
        body = "\n".join(lines[end_idx:]).lstrip("\n")
        output = header.rstrip("\n") + "\n\n" + body
    else:
        output = header.rstrip("\n") + "\n\n" + content

    if dry_run:
        print(f"  → {agent}: {target} ({len(output)} bytes)")
        return True

    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(output)
    print(f"  ✓ {agent}: {target}")
    return True


def check_status() -> dict:
    """检查各 Agent 入口文件的同步状态。"""
    state = load_syncstate()
    current_hash = get_entry_hash()
    previous_hash = state.get("entry_hash", state.get("ai_hash", "never"))

    status = {
        "entry_hash": current_hash,
        "previous_hash": previous_hash,
        "entry_changed": current_hash != previous_hash,
        "agents": {},
    }

    for agent, cfg in ADAPTER_MAP.items():
        target = cfg["target"]
        source = cfg["source"]
        agent_status = {
            "target_exists": target.exists(),
            "source_exists": source.exists(),
        }
        if target.exists() and source.exists():
            # 简单检查: 比较修改时间
            target_mtime = target.stat().st_mtime
            source_mtime = source.stat().st_mtime
            agent_status["stale"] = source_mtime > target_mtime
        status["agents"][agent] = agent_status

    return status


def print_status(status: dict):
    """打印同步状态报告。"""
    print("=== Memory Adapter Layer 状态 ===\n")

    if status["entry_changed"]:
        print(f"⚠ 入口协议或适配器已变更 (上次: {status['previous_hash']}, 当前: {status['entry_hash']})")
        print("  建议运行 scripts/sync-adapters.py 同步入口文件\n")
    else:
        print(f"✓ 入口协议和适配器未变更 (hash: {status['entry_hash']})\n")

    print("Agent 入口文件状态:")
    for agent, s in status["agents"].items():
        if not s["source_exists"]:
            print(f"  ✗ {agent}: 适配器文件缺失")
        elif not s["target_exists"]:
            print(f"  ⚡ {agent}: 未生成过")
        elif s.get("stale"):
            print(f"  ⚠ {agent}: 过期 (适配器已更新)")
        else:
            print(f"  ✓ {agent}: 同步")


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="Memory Adapter Layer — 同步 .ai/ 到各 Agent 入口文件"
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="预览变化，不写入文件"
    )
    parser.add_argument(
        "--agent", type=str, choices=list(ADAPTER_MAP.keys()), help="只同步指定 Agent"
    )
    parser.add_argument(
        "--status", action="store_true", help="检查同步状态"
    )
    parser.add_argument(
        "--openclaw", action="store_true",
        help="将 OpenClaw 设为主 AGENTS.md (覆盖 Codex 的 AGENTS.md)"
    )
    args = parser.parse_args()

    if args.status:
        print_status(check_status())
        return

    if not check_prerequisites():
        sys.exit(1)

    # --openclaw 模式: 将 openclaw 适配器写到 AGENTS.md
    if args.openclaw:
        ADAPTER_MAP["openclaw"]["target"] = PROJECT_ROOT / "AGENTS.md"
        print("模式: OpenClaw 作为主 AGENTS.md")

    agents = [args.agent] if args.agent else list(ADAPTER_MAP.keys())

    print(f"同步 {len(agents)} 个 Agent 入口{' (dry-run)' if args.dry_run else ''}:\n")

    success_count = 0
    for agent in agents:
        if sync_agent(agent, dry_run=args.dry_run):
            success_count += 1

    print(f"\n完成: {success_count}/{len(agents)} 个 Agent 同步成功")

    # 更新状态
    if not args.dry_run:
        state = load_syncstate()
        state["entry_hash"] = get_entry_hash()
        state.pop("ai_hash", None)
        state["last_sync"] = datetime.now(timezone.utc).isoformat()
        previous_agents = set(state.get("synced_agents", []))
        state["synced_agents"] = sorted(previous_agents.union(agents))
        save_syncstate(state)

    # Hermes 提示
    if not args.agent or args.agent == "hermes":
        hermes_target = ADAPTER_MAP["hermes"]["target"]
        if not args.dry_run and hermes_target.exists():
            print(f"\n💡 Hermes: 运行 hermes 后输入 /skill potato-ui 加载项目上下文")


if __name__ == "__main__":
    main()
