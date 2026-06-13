import flama

app = flama.Flama()
app.mcp.add_server("/mcp/server/", "server")


@app.mcp.prompt("summarise", description="Summarise the given text", mcp="server")
def summarise(text: str):
    return f"Summarise the following:\n\n{text}"
