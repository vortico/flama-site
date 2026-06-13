import typing

import mlflow
from flama import Flama, Module


class MLFlowModule(Module):
    name = "mlflow"

    def __init__(self, app: Flama, url: typing.Optional[str] = None, *args, **kwargs):
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
runs = app.mlflow.search_runs(["foo"], "tags.name = 'bar'")
