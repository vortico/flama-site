from flama import Flama, ModelComponentBuilder


with open("/path/to/model.flm", "rb") as f:
    component = ModelComponentBuilder.loads(f.read())
    ModelType = component.get_model_type  # Get the type to allow inject dependency


app = Flama(components=[component])


@app.get("/")
def model_view(model: ModelType, model_input: str):
    """
    tags:
        - model
    summary:
        Model prediction.
    description:
        Interact with the model to generate a prediction based on
        given input
    responses:
        200:
            description: Model prediction.
    """
    model_output = model.predict(model_input)
    return {"model_output": model_output}