import flama

app = flama.Flama()

app.models.add_model("/", "/path/to/model.flm", name="model-name")

if __name__ == "__main__":
    flama.run(flama_app=app, server_host="0.0.0.0", server_port=8080)
