import json
from pprint import pprint

# 'r' flag opens the file for reading only
source_file = open('chapters_rough.json', 'r')
dest_file = open('chapters.json', 'w')
us_states = open('us_states.json')

data = json.load(source_file)

states_data = json.load(us_states)

data_clean = {
	"chapters": [
	]
}

for chapter in data["chapters"]:
	data_clean["chapters"].append({
		"name": chapter["name"],
		"city": chapter["city"],
		"state": chapter["state"],
		"state_full": [ c["name"] for c in states_data["usStates"] if c["abbreviation"] == chapter["state"]],
		"zip": chapter["zip"],
		"lat": chapter["lat"],
		"lng": chapter["lng"],
		"description": chapter["description"],
		"url": chapter["url"],
		"email": chapter["email"],
		"id": chapter["id"]
	})

json.dump(data_clean, dest_file)
