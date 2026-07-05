def marcus() -> dict:
    return {
        "display_name": "文本统计器",
        "description": "统计文本文件的行数、词数、字符数",
        "icon": "bar_chart",
        "category": "text",
        "contribution": "terminal",
        "terminal": {
            "command": "marcus-textstats",
            "args": [
                {"name": "path", "label": "选择文件", "type": "file"}
            ]
        }
    }
