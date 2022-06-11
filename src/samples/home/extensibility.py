import typing

import mlflow
from flama import Module, Flama


class MLFlowModule(Module):
    name = "mlflow"

    def __init__(self, app: Flama, url: str = None, *args, **kwargs):
        super().__init__(app, *args, **kwargs)
        self.url = url

    async def on_startup(self):
        mlflow.set_tracking_uri(self.url)

    async def on_shutdown(self):
        ...

    def search_runs(self, experiment_ids: typing.List[str], filter_string: str):
        return mlflow.search_runs(experiment_ids, filter_string)


app = Flama(modules=[MLFlowModule])

# Module usage example
model = app.mlflow.search_runs(["foo"], "tags.name = 'bar'")