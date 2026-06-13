import flama

app = flama.Flama()
app.mcp.add_server("/mcp/server/", "server")


@app.mcp.tool("add", description="Add two integers", mcp="server")
def add(a: int, b: int) -> int:
    return a + b
