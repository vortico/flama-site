import flama

app = flama.Flama()

app.models.add_model("/puppy/", "/path/to/puppy_model.flm", name="Puppy")

if __name__ == "__main__":
    flama.run(flama_app=app, server_host="0.0.0.0", server_port=8080)
