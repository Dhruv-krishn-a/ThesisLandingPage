import json
import os

with open("src/data/content.json", "r") as f:
    data = json.load(f)

# 1. Remove process description
if "description" in data["process"]:
    del data["process"]["description"]

# 2. Add ourPhilosophy section for the final quote
if "faqs" in data and "description" in data["faqs"]:
    del data["faqs"]["description"]

data["ourPhilosophy"] = {
    "tagline": "We don't write the thesis. We don't conduct the research. We teach, explain, guide, review, and help the researcher learn how to do it themselves."
}

# Write back
with open("src/data/content.json", "w") as f:
    json.dump(data, f, indent=2)

