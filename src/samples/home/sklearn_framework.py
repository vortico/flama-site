import uvicorn
from flama import Flama

app = Flama()

app.models.add_sklearn_model("/", "path/to/your_model_file")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
