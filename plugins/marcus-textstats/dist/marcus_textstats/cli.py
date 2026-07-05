import sys
import os

# Force UTF-8 output (Windows pipes use system code page by default)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def main():
    if len(sys.argv) < 2:
        print("用法: marcus-textstats <文件路径>")
        sys.exit(1)

    path = sys.argv[1]

    if not os.path.isfile(path):
        print(f"错误: 文件不存在 — {path}", file=sys.stderr)
        sys.exit(1)

    with open(path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()

    lines = content.splitlines()
    words = content.split()
    chars = len(content)

    print(f"文件: {path}")
    print(f"大小: {os.path.getsize(path):,} 字节")
    print(f"行数: {len(lines):,}")
    print(f"词数: {len(words):,}")
    print(f"字符: {chars:,}")


if __name__ == "__main__":
    main()
