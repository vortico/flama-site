import flama

app = flama.Flama()
app.mcp.add_server("/mcp/tools/", "tools")


@app.mcp.tool("add", description="Add two integers", mcp="tools")
def add(a: int, b: int) -> int:
    return a + b


if __name__ == "__main__":
    flama.run(flama_app=app, server_host="0.0.0.0", server_port=8080)
