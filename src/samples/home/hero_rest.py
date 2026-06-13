import flama

app = flama.Flama()


@app.get("/greet/{name}/")
async def greet(name: str) -> dict:
    return {"message": f"Hello, {name}"}


if __name__ == "__main__":
    flama.run(flama_app=app, server_host="0.0.0.0", server_port=8080)
