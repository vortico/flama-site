from flama import Flama, ModelComponentBuilder


with open("/path/to/model.flm", "rb") as f:
    component = ModelComponentBuilder.loads(f.read())
    ModelType = type(component.model)  # Get the type to allow inject dependency


app = Flama(components=[component])


@app.get("/")
def model_view(model: ModelType, model_input: str):
    model_output = model.predict(model_input)
    return {"model_output": model_output}