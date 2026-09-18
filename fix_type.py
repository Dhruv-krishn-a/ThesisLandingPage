import json

with open("src/data/content.json", "r") as f:
    data = json.load(f)

if isinstance(data["trustedPartner"]["description"], str):
    data["trustedPartner"]["description"] = [{"value": data["trustedPartner"]["description"]}]

with open("src/data/content.json", "w") as f:
    json.dump(data, f, indent=2)

