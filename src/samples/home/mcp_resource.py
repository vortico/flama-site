import json

import flama

app = flama.Flama()
app.mcp.add_server("/mcp/server/", "server")


@app.mcp.resource(
    "config://app", name="config", mime_type="application/json", mcp="server"
)
def config():
    return json.dumps({"debug": True, "name": "flama-mcp"})
