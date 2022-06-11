import uvicorn
from flama import Flama

app = Flama()

app.models.add_model("/puppy/", "/path/to/puppy_model.flm", name="Puppy")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
