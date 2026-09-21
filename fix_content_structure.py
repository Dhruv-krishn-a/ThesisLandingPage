import json

with open("src/data/content.json", "r") as f:
    data = json.load(f)

# 1. Remove integrity text from hero
if "integrityBold" in data["hero"]:
    del data["hero"]["integrityBold"]
if "integrityText" in data["hero"]:
    del data["hero"]["integrityText"]

# 2. Convert whyTrustUs to strugglingSection format
data["strugglingSection"] = {
    "heading": data["whyTrustUs"]["heading"]["value"],
    "intro": data["whyTrustUs"].get("intro", "You may be unsure about:"),
    "points": [
        "Is my research problem clearly defined?",
        "Are my research objectives appropriate and aligned with my study?",
        "Am I using the right research methodology?",
        "How should I structure my literature review?",
        "How do I analyse and interpret my research findings?",
        "Are my thesis chapters logically connected?"
    ]
}
del data["whyTrustUs"]

with open("src/data/content.json", "w") as f:
    json.dump(data, f, indent=2)

