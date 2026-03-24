# Flama — LLM Skill File

> **Repository**: https://github.com/vortico/flama
> **Documentation**: https://flama.dev/docs/
> **License**: Apache-2.0

This file is a comprehensive reference for LLMs and AI coding assistants to build applications with the
**Flama** framework. It covers every public API surface, pattern, and convention needed to write production-ready
Machine Learning APIs, RESTful services, and Domain-Driven Design applications using Flama.

---

## 1. WHAT IS FLAMA

Flama is a production-ready, open-source Python web framework for building **Machine Learning APIs** with automatic
**OpenAPI documentation**. Built on top of [Starlette](https://www.starlette.io/) (ASGI), it provides:

- **ML-native model serving** — package, serialise, and deploy sklearn / TensorFlow / PyTorch models
- **Dependency injection** — component-based DI with automatic resolution
- **Domain-Driven Design** — repositories, workers, resources (Unit of Work pattern)
- **Auto-documentation** — OpenAPI 3.x schema and interactive docs at `/docs/`
- **Flexible schemas** — Pydantic, Typesystem, or Marshmallow
- **REST resources** — full CRUD with pagination out of the box
- **JWT authentication** — access and refresh tokens with permission-based route protection
- **CLI** — serve apps and ML models with zero code

---

## 2. INSTALLATION

```bash
# Core
pip install flama

# With Pydantic (RECOMMENDED — most common choice)
pip install "flama[pydantic]"

# With database support (SQLAlchemy async)
pip install "flama[pydantic,database]"

# With HTTP test client
pip install "flama[pydantic,client]"

# Full installation (all extras)
pip install "flama[full]"
```

### Available extras

| Extra        | Packages                              | Purpose                            |
|-------------|---------------------------------------|-------------------------------------|
| `pydantic`  | `pydantic>=2.12`                      | Schema validation (recommended)     |
| `typesystem`| `typesystem>=0.4.1`                   | Alternative schema validation       |
| `marshmallow`| `marshmallow>=3.0`, `apispec>=6.0`   | Alternative schema validation       |
| `database`  | `SQLAlchemy[asyncio]>=2.0`            | Async database support (DDD, REST)  |
| `client`    | `httpx>=0.28`                         | HTTP test client                    |
| `full`      | All of the above                      | Everything                          |

### Core dependencies (always installed)

- `starlette>=0.48` — ASGI foundation
- `click>=8.1` — CLI
- `uvicorn[standard]>=0.38` — ASGI server
- `Jinja2>=3.1.2` — templating
- `pyyaml>=6.0` — YAML parsing
- `zstd>=1.5.7` — compression (stdlib from Python 3.14)

---

## 3. APPLICATION — `flama.Flama`

The central class. All-keyword constructor:

```python
from flama import Flama

app = Flama(
    routes=None,                    # Sequence[BaseRoute]
    components=None,                # Sequence[Component] | set[Component]
    modules=None,                   # Sequence[Module] | set[Module]
    middleware=None,                 # Sequence[Middleware]
    debug=False,                    # bool — enables interactive error pages
    events=None,                    # dict | Events — startup/shutdown handlers
    lifespan=None,                  # async context manager
    openapi={                       # OpenAPI spec metadata
        "info": {
            "title": "My API",
            "version": "1.0.0",
            "description": "My API description",
        }
    },
    schema="/schema/",              # str | None — OpenAPI JSON endpoint
    docs="/docs/",                  # str | None — interactive docs endpoint
    schema_library=None,            # "pydantic" | "typesystem" | "marshmallow" | None (auto-detect)
)
```

### Route registration

```python
# Decorator style
@app.get("/hello/")
async def hello():
    return {"message": "Hello, World!"}

@app.post("/items/")
async def create_item(name: str):
    return {"name": name}

# All HTTP methods: get, post, put, patch, delete, head, options, connect, trace
@app.route("/flexible/", methods=["GET", "POST"])
async def flexible():
    ...

# WebSocket
@app.websocket_route("/ws/")
async def websocket(websocket):
    ...

# Mount sub-application
app.mount("/admin", admin_app)
```

### Path parameters

```python
@app.get("/users/{user_id:int}/")
async def get_user(user_id: int):
    return {"id": user_id}

# Supported types: str (default), int, float, decimal, uuid
# Examples: {name}, {id:int}, {price:float}, {pk:uuid}
```

### Event handlers

```python
@app.on_event("startup")
async def on_startup():
    print("Application starting")

@app.on_event("shutdown")
async def on_shutdown():
    print("Application shutting down")
```

### Running the application

```python
# At the bottom of your module
if __name__ == "__main__":
    flama.run(
        flama_app="__main__:app",
        server_host="0.0.0.0",
        server_port=8080,
        server_reload=True,
    )
```

Or via CLI:

```bash
flama run src.main:app --server-host 0.0.0.0 --server-port 8080 --server-reload
```

---

## 4. SCHEMAS AND VALIDATION

Flama validates request/response data using schema libraries. **Pydantic** is the recommended choice.

### Pydantic schemas

```python
import typing
from pydantic import BaseModel
from flama import types

# Define schemas
class ItemCreate(BaseModel):
    name: str
    price: float
    description: str = ""

class ItemOutput(BaseModel):
    id: int
    name: str
    price: float

# Use in route handlers with Annotated
@app.post("/items/")
async def create_item(
    data: typing.Annotated[types.Schema, types.SchemaMetadata(ItemCreate)],
) -> typing.Annotated[types.Schema, types.SchemaMetadata(ItemOutput)]:
    # data is validated and parsed as dict
    return {"id": 1, **data}
```

### Schema annotation pattern

This is the **canonical pattern** for typed request/response data:

```python
import typing
from flama import types

# Request body
data: typing.Annotated[types.Schema, types.SchemaMetadata(MySchema)]

# Partial (for PATCH operations)
data: typing.Annotated[types.Schema, types.SchemaMetadata(MySchema, partial=True)]

# Return type annotation
def handler() -> typing.Annotated[types.Schema, types.SchemaMetadata(OutputSchema)]:
    ...
```

---

## 5. DEPENDENCY INJECTION — Components

Components are the DI building blocks. They resolve parameters for route handlers automatically.

### Defining a component

```python
from flama import Component

class MyServiceComponent(Component):
    def resolve(self) -> MyService:
        return MyService()

# Register
app = Flama(components=[MyServiceComponent()])

# Use in handler — resolved automatically by return type
@app.get("/service/")
async def use_service(service: MyService):
    return service.do_work()
```

### Component with dependencies

```python
class DatabaseComponent(Component):
    def __init__(self, connection_string: str):
        self.connection_string = connection_string

    async def resolve(self) -> Database:
        return await Database.connect(self.connection_string)

# Components can depend on other components or context types
class UserRepositoryComponent(Component):
    async def resolve(self, db: Database) -> UserRepository:
        return UserRepository(db)
```

### Built-in injectable types

These are provided by Flama's built-in ASGI components and can be used directly in handler signatures:

| Type                   | Description              |
|-----------------------|--------------------------|
| `types.Method`        | HTTP method string        |
| `types.URL`           | Request URL               |
| `types.Scheme`        | URL scheme (http/https)   |
| `types.Path`          | URL path                  |
| `types.PathParams`    | Path parameters dict      |
| `types.QueryString`   | Raw query string          |
| `types.QueryParams`   | Parsed query parameters   |
| `types.Headers`       | Request headers           |
| `types.Cookies`       | Request cookies           |
| `types.Body`          | Raw request body bytes    |

Primitive types (`int`, `str`, `float`, `bool`, `uuid.UUID`, `datetime.date`, `datetime.datetime`) are
resolved automatically from path and query parameters.

---

## 6. ENDPOINTS — Class-based handlers

```python
from flama.endpoints import HTTPEndpoint, WebSocketEndpoint

class ItemEndpoint(HTTPEndpoint):
    async def get(self):
        """
        tags:
            - Items
        summary:
            List items.
        description:
            Returns all items.
        responses:
            200:
                description: List of items.
        """
        return [{"id": 1, "name": "Widget"}]

    async def post(self, data: typing.Annotated[types.Schema, types.SchemaMetadata(ItemCreate)]):
        """
        tags:
            - Items
        summary:
            Create item.
        """
        return {"id": 1, **data}

app.add_route("/items/", ItemEndpoint)
```

### WebSocket endpoint

```python
class ChatEndpoint(WebSocketEndpoint):
    encoding = "json"

    async def on_connect(self, websocket):
        await websocket.accept()

    async def on_receive(self, websocket, data):
        await websocket.send_json({"echo": data})

    async def on_disconnect(self, websocket, websocket_code):
        pass

app.add_websocket_route("/ws/chat/", ChatEndpoint)
```

---

## 7. RESOURCES — RESTful CRUD

Resources provide a declarative pattern for building REST APIs with database-backed models.

### Prerequisites

```bash
pip install "flama[pydantic,database]"
```

### Defining schemas and table

```python
import sqlalchemy
from pydantic import BaseModel

# Database table
metadata = sqlalchemy.MetaData()
items_table = sqlalchemy.Table(
    "items",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("price", sqlalchemy.Float),
)

# Schemas
class ItemCreate(BaseModel):
    name: str
    price: float

class ItemOutput(BaseModel):
    id: int
    name: str
    price: float
```

### CRUDResource (full CRUD)

```python
from flama.resources import CRUDResource

class ItemResource(CRUDResource):
    name = "items"
    verbose_name = "Items"
    model = items_table
    input_schema = ItemCreate
    output_schema = ItemOutput

# Register
app.resources.add_resource("/items/", ItemResource)
```

This automatically creates:
- `POST /items/` — Create
- `GET /items/{resource_id}/` — Retrieve
- `PUT /items/{resource_id}/` — Update
- `PATCH /items/{resource_id}/` — Partial update
- `DELETE /items/{resource_id}/` — Delete
- `GET /items/` — List (with pagination)
- `DELETE /items/` — Drop all

### Custom resource methods

```python
from flama.resources import Resource
from flama.resources.routing import ResourceRoute

class ItemResource(Resource):
    name = "items"
    verbose_name = "Items"

    @ResourceRoute.method("/search/", methods=["GET"], name="search")
    async def search(self, q: str):
        """
        tags:
            - Items
        summary:
            Search items by name.
        """
        return {"query": q, "results": []}

app.resources.add_resource("/items/", ItemResource)
```

**IMPORTANT**: Always use `ResourceRoute.method()` as the decorator for custom resource methods.
The older `resource_method()` is deprecated.

---

## 8. ML MODEL SERVING

Flama's core feature: package, serialise, and serve ML models from sklearn, TensorFlow, and PyTorch.

### 8.1 Packaging models (FLM files)

```python
import flama
from sklearn.neural_network import MLPClassifier
import numpy as np

# Train model
model = MLPClassifier(activation="tanh", max_iter=2000, hidden_layer_sizes=(10,))
model.fit(
    np.array([[0, 0], [0, 1], [1, 0], [1, 1]]),
    np.array([0, 1, 1, 0]),
)

# Package as FLM file
flama.dump(
    model,
    path="model.flm",
    compression="zstd",          # "bz2" | "lzma" | "zlib" | "zstd" (default)
    model_id=None,               # UUID or auto-generated
    params={"activation": "tanh", "max_iter": 2000},
    metrics={"accuracy": 0.99},
    extra={"version": "1.0.0", "author": "Team"},
    artifacts={"config.json": "path/to/config.json"},
)
```

### Compression formats

| Format | Speed   | Ratio   | Standard library | Notes                    |
|--------|---------|---------|------------------|--------------------------|
| `zstd` | Fastest | Best    | From Python 3.14 | **Default** — recommended|
| `zlib` | Fast    | Good    | Yes              | No external dependency   |
| `lzma` | Slowest | Excellent| Yes             | Best ratio, slowest      |
| `bz2`  | Slow    | Good    | Yes              | Block-sorting compressor |

### Loading models

```python
model_artifact = flama.load(path="model.flm")

# Access model and metadata
model = model_artifact.model           # The ML model object
meta = model_artifact.meta             # Metadata (id, framework, params, metrics, etc.)
artifacts = model_artifact.artifacts   # Dict of artifact paths
```

### 8.2 Adding models to an app

```python
import flama
from flama import Flama

app = Flama(
    openapi={"info": {"title": "ML API", "version": "1.0.0"}},
    docs="/docs/",
)

# Load at startup, cleanup at shutdown
sklearn_model = None

@app.on_event("startup")
async def load_models():
    global sklearn_model
    sklearn_model = flama.load(path="sklearn_model.flm")

@app.on_event("shutdown")
async def unload_models():
    global sklearn_model
    sklearn_model = None

# Add model to app — creates /sklearn/predict/ and /sklearn/ (inspect) routes
app.models.add_model("/sklearn/", model=sklearn_model, name="sklearn")
```

### 8.3 Custom ModelResource

```python
import typing
from flama.models import ModelResource
from flama.resources.routing import ResourceRoute

class MyModelResource(ModelResource):
    name = "my_model"
    verbose_name = "My ScikitLearn Model"
    model_path = "sklearn_model.flm"

    @ResourceRoute.method("/metadata/", methods=["GET"], name="metadata-method")
    def metadata(self):
        """
        tags:
            - My ScikitLearn Model
        summary:
            Get model metadata.
        """
        return {
            "name": self._meta.verbose_name,
            "loaded": self.model is not None,
        }

app.models.add_model_resource(path="/model", resource=MyModelResource)
```

### 8.4 Custom Model + ModelComponent (lazy loading)

For full control over the model lifecycle:

```python
import typing
import flama
from flama.models import BaseModel, ModelComponent, BaseModelResource
from flama.resources.routing import ResourceRoute

class MyCustomModel(BaseModel):
    def __init__(self, model=None, meta=None, artifacts=None):
        self.model = model
        self.meta = meta
        self.artifacts = artifacts

    def inspect(self) -> typing.Any:
        return self.model.get_params()

    def predict(self, x: typing.Any) -> typing.Any:
        result = self.model.predict(x)
        # Ensure JSON-serialisable output (e.g. numpy int64 -> int)
        return [int(v) for v in result] if hasattr(result, "tolist") else result

class MyModelComponent(ModelComponent):
    def __init__(self, model_path: str):
        self._model_path = model_path
        self.model = MyCustomModel()

    def load(self):
        artifact = flama.load(path=self._model_path)
        self.model = MyCustomModel(artifact.model, artifact.meta, artifact.artifacts)

    def reset(self):
        self.model = MyCustomModel()

    def resolve(self) -> MyCustomModel:
        if not self.model.model:
            self.load()
        assert self.model.model
        return self.model

component = MyModelComponent("sklearn_model.flm")

class MyModelResource(BaseModelResource[MyModelComponent]):
    name = "custom_model"
    verbose_name = "Lazy-loaded Model"
    component = component

    @ResourceRoute.method("/unload/", methods=["GET"], name="unload")
    def unload(self):
        """
        tags:
            - Lazy-loaded Model
        summary:
            Unload model from memory.
        """
        self.component.reset()
        return {"loaded": False}

app = Flama(components=[component])
app.models.add_model_resource(path="/model", resource=MyModelResource)
```

### 8.5 Codeless serving via CLI

```bash
# Serve a single model (creates /predict/ and /inspect/ endpoints)
flama serve sklearn_model.flm

# Inspect model metadata without a server
flama model sklearn_model.flm inspect --pretty

# Batch predictions from JSON
echo '{"input": [[0,0],[0,1],[1,0],[1,1]]}' | flama model sklearn_model.flm predict --pretty

# Start from definition file
flama start config.json
```

---

## 9. DOMAIN-DRIVEN DESIGN (DDD)

Flama implements the **Repository** and **Unit of Work** patterns for clean separation of concerns.

### Prerequisites

```bash
pip install "flama[pydantic,database]"
```

### 9.1 Data model (SQLAlchemy + Pydantic)

```python
import sqlalchemy
from pydantic import BaseModel

metadata = sqlalchemy.MetaData()

user_table = sqlalchemy.Table(
    "user",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True, nullable=False),
    sqlalchemy.Column("password", sqlalchemy.String, nullable=False),
)

# Schema hierarchy: Credentials -> Details -> Full
class UserCredentials(BaseModel):
    email: str
    password: str

class UserDetails(BaseModel):
    name: str
    email: str

class UserFull(BaseModel):
    id: int
    name: str
    email: str
    password: str
```

### 9.2 Repository

```python
from flama.ddd.repositories.sqlalchemy import SQLAlchemyTableRepository

class UserRepository(SQLAlchemyTableRepository):
    _table = user_table

# Built-in methods:
# async create(data: dict) -> tuple[dict, ...]
# async retrieve(**filter_params) -> dict
# async update(data: dict, **filter_params) -> tuple[dict, ...]
# async delete(**filter_params) -> None
# async list(**filter_params) -> tuple[dict, ...]
```

### 9.3 Worker (Unit of Work)

```python
from flama.ddd.workers.sqlalchemy import SQLAlchemyWorker

class RegisterWorker(SQLAlchemyWorker):
    user: UserRepository          # Declare repositories as class attributes

# Usage:
# async with worker:
#     await worker.user.create({"name": "Alice", "email": "a@b.com", "password": "hashed"})
#     # Commits on successful exit, rolls back on exception
```

### 9.4 Resource (business logic)

```python
import hashlib
import typing

from flama import types
from flama.ddd.exceptions import NotFoundError
from flama.exceptions import HTTPException
from flama.http import APIResponse
from flama.resources import Resource
from flama.resources.routing import ResourceRoute

class UserResource(Resource):
    name = "user"
    verbose_name = "User"

    @ResourceRoute.method("/", methods=["POST"], name="create")
    async def create(
        self,
        worker: RegisterWorker,
        data: typing.Annotated[types.Schema, types.SchemaMetadata(UserCredentials)],
    ):
        """
        tags:
            - User
        summary:
            Register a new user.
        responses:
            201:
                description: User created.
        """
        async with worker:
            hashed = hashlib.sha256(data["password"].encode()).hexdigest()
            result = await worker.user.create({**data, "name": "", "password": hashed})
        return APIResponse(result[0], status_code=201)

    @ResourceRoute.method("/{user_id:int}/", methods=["GET"], name="retrieve")
    async def retrieve(
        self,
        worker: RegisterWorker,
        user_id: int,
    ) -> typing.Annotated[types.Schema, types.SchemaMetadata(UserDetails)]:
        """
        tags:
            - User
        summary:
            Get user by ID.
        responses:
            200:
                description: User details.
            404:
                description: User not found.
        """
        async with worker:
            try:
                return await worker.user.retrieve(id=user_id)
            except NotFoundError:
                raise HTTPException(status_code=404)
```

### 9.5 Application assembly

```python
from flama import Flama
from flama.ddd.components import WorkerComponent
from flama.sqlalchemy import SQLAlchemyModule

app = Flama(
    openapi={"info": {"title": "DDD API", "version": "1.0.0"}},
    docs="/docs/",
    components=[
        WorkerComponent(worker=RegisterWorker()),
    ],
    modules=[
        SQLAlchemyModule(url="sqlite+aiosqlite:///db.sqlite"),
    ],
)

app.resources.add_resource("/users/", UserResource)
```

### DDD exceptions

```python
from flama.ddd.exceptions import (
    NotFoundError,       # Resource not found
    AlreadyExistsError,  # Duplicate resource
    IntegrityError,      # Database constraint violation
    MultipleRecordsError,# Expected one record, got multiple
)
```

---

## 10. AUTHENTICATION — JWT

### Prerequisites

JWT is built-in (no extra dependency needed).

### Setup

```python
import os
from flama import Flama
from flama.authentication import AuthenticationMiddleware
from flama.authentication.jwt import JWT
from flama.authentication.components import AccessTokenComponent, RefreshTokenComponent

SECRET = os.urandom(32)

app = Flama(
    openapi={"info": {"title": "Auth API", "version": "1.0.0"}},
    docs="/docs/",
    components=[
        AccessTokenComponent(secret=SECRET),
        RefreshTokenComponent(secret=SECRET),
    ],
    middleware=[
        AuthenticationMiddleware,
    ],
)
```

### Creating tokens

```python
from flama.authentication.jwt import JWT

@app.post("/login/")
async def login(username: str, password: str):
    # Validate credentials...
    token = JWT(
        _header={"alg": "HS256"},
        _payload={
            "data": {"id": 1, "username": username, "permissions": ["admin"]},
            "iss": "my-api",
            "iat": datetime.now(tz=timezone.utc),
            "exp": datetime.now(tz=timezone.utc) + timedelta(hours=1),
        },
    )
    return {"access_token": token.encode(SECRET).decode()}
```

### Protected routes

```python
from flama import types

@app.get("/admin/", tags={"permissions": ["admin"]})
async def admin_panel(token: types.AccessToken):
    return {"user": token.payload["data"]["username"]}

# Routes with no "permissions" tag are public by default
@app.get("/public/")
async def public():
    return {"status": "open"}
```

The `AuthenticationMiddleware` checks the `permissions` tag on each route. If the route has permissions,
it validates the JWT token from the `Authorization: Bearer <token>` header or cookies, and verifies that
the token's `data.permissions` intersect with the required permissions.

---

## 11. PAGINATION

```python
# Page number pagination
@app.get("/items/", pagination="page_number")
async def list_items():
    # Automatically adds ?page=1&page_size=10 parameters
    return [{"id": i} for i in range(100)]

# Limit offset pagination
@app.get("/items/", pagination="limit_offset")
async def list_items():
    # Automatically adds ?limit=10&offset=0 parameters
    return [{"id": i} for i in range(100)]
```

On resources:

```python
@ResourceRoute.method("/", methods=["GET"], name="list", pagination="page_number")
async def list(self, worker: MyWorker):
    async with worker:
        return await worker.items.list()
```

---

## 12. MIDDLEWARE

```python
from flama import Flama
from flama.middleware import Middleware

# Built-in middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

app = Flama(
    middleware=[
        Middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]),
        Middleware(GZipMiddleware, minimum_size=1000),
    ],
)

# Add later
app.add_middleware(Middleware(TrustedHostMiddleware, allowed_hosts=["example.com"]))
```

### Custom ASGI middleware

```python
class TimingMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            start = time.perf_counter()
            await self.app(scope, receive, send)
            duration = time.perf_counter() - start
            print(f"Request took {duration:.3f}s")
        else:
            await self.app(scope, receive, send)

app.add_middleware(Middleware(TimingMiddleware))
```

---

## 13. BACKGROUND TASKS

```python
from flama.background import BackgroundThreadTask, BackgroundProcessTask, BackgroundTasks

# Thread-based (I/O-bound work)
async def handler():
    task = BackgroundThreadTask(send_email, to="user@example.com")
    return JSONResponse({"status": "ok"}, background=task)

# Process-based (CPU-bound work)
async def handler():
    task = BackgroundProcessTask(train_model, data=dataset)
    return JSONResponse({"status": "training"}, background=task)

# Chaining tasks
async def handler():
    tasks = BackgroundTasks()
    tasks.add_task("thread", send_notification, user_id=1)
    tasks.add_task("process", generate_report, month="March")
    return JSONResponse({"status": "queued"}, background=tasks)
```

---

## 14. LIFESPAN AND EVENTS

### Event-based (simple)

```python
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
```

### Context-manager lifespan (advanced)

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app):
    # Startup
    db = await Database.connect()
    yield
    # Shutdown
    await db.disconnect()

app = Flama(lifespan=lifespan)
```

---

## 15. MODULES

Modules are reusable plugins that hook into the application lifecycle:

```python
from flama.modules import Module

class MetricsModule(Module):
    name = "metrics"

    async def on_startup(self):
        self.counter = 0

    async def on_shutdown(self):
        print(f"Total requests: {self.counter}")

app = Flama(modules=[MetricsModule()])
```

### Built-in: SQLAlchemyModule

```python
from flama.sqlalchemy import SQLAlchemyModule

app = Flama(
    modules=[
        SQLAlchemyModule(url="sqlite+aiosqlite:///app.db"),
    ],
)
```

---

## 16. HTTP RESPONSES

```python
from flama.http import (
    Response,               # Base response
    JSONResponse,           # JSON (default for dict returns)
    HTMLResponse,           # HTML content
    PlainTextResponse,      # Plain text
    RedirectResponse,       # HTTP redirect
    StreamingResponse,      # Streaming
    FileResponse,           # File download
    APIResponse,            # JSON with schema validation
    APIErrorResponse,       # Standardised error response
    HTMLFileResponse,       # HTML from file
    HTMLTemplateResponse,   # Jinja2 template
)

# Dict returns are auto-converted to JSON
@app.get("/data/")
async def data():
    return {"key": "value"}

# Explicit response with status code
@app.post("/items/")
async def create():
    return APIResponse({"id": 1}, status_code=201)

# Error response
from flama.exceptions import HTTPException
raise HTTPException(status_code=404, detail="Item not found")
```

---

## 17. TESTING

### Setup

```python
# pyproject.toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
```

```bash
pip install "flama[pydantic,database,client]" pytest pytest-asyncio
```

### Test client

```python
from flama.client import Client

async def test_hello():
    app = Flama()

    @app.get("/hello/")
    async def hello():
        return {"message": "Hello"}

    async with Client(app=app) as client:
        response = await client.get("/hello/")
        assert response.status_code == 200
        assert response.json() == {"message": "Hello"}
```

### Testing with database

```python
import pytest
from flama.client import Client
from flama.sqlalchemy import SQLAlchemyModule

@pytest.fixture
async def app():
    app = Flama(
        modules=[SQLAlchemyModule(url="sqlite+aiosqlite://")],  # In-memory
        components=[WorkerComponent(worker=MyWorker())],
    )
    app.resources.add_resource("/users/", UserResource)
    return app

@pytest.fixture
async def client(app):
    async with Client(app=app) as client:
        yield client

async def test_create_user(client):
    response = await client.post("/users/", json={"email": "test@test.com", "password": "secret"})
    assert response.status_code == 201
```

### URL resolution in tests

```python
async with Client(app=app) as client:
    url = app.resolve_url("user-retrieve", user_id=1)
    response = await client.get(str(url))
```

---

## 18. CONFIGURATION

```python
from flama.config import Config

config = Config("config.yaml")    # or .env, .json, .toml, environment variables

# Type-casted access
DEBUG = config("DEBUG", cast=bool, default=False)
DATABASE_URL = config("DATABASE_URL")
API_KEY = config("API_KEY", cast=Secret)  # Masked in logs

# URL type
from flama.config import URL
db_url = config("DATABASE_URL", cast=URL)
```

---

## 19. OPENAPI DOCSTRINGS

Route handlers use **YAML-formatted docstrings** for OpenAPI documentation:

```python
@app.post("/items/")
async def create_item(data: typing.Annotated[types.Schema, types.SchemaMetadata(ItemCreate)]):
    """
    tags:
        - Items
    summary:
        Create a new item.
    description:
        Creates a new item in the catalogue and returns the created resource.
    responses:
        201:
            description: Item created successfully.
        400:
            description: Validation error.
    """
    return APIResponse({"id": 1, **data}, status_code=201)
```

---

## 20. COMPLETE EXAMPLE — ML API WITH DDD

```python
import hashlib
import typing
from datetime import datetime

import flama
from flama import Flama, types
from flama.ddd.components import WorkerComponent
from flama.ddd.exceptions import NotFoundError
from flama.ddd.repositories.sqlalchemy import SQLAlchemyTableRepository
from flama.ddd.workers.sqlalchemy import SQLAlchemyWorker
from flama.exceptions import HTTPException
from flama.http import APIResponse
from flama.models import BaseModel, BaseModelResource, ModelComponent
from flama.resources import Resource
from flama.resources.routing import ResourceRoute
from flama.sqlalchemy import SQLAlchemyModule
from pydantic import BaseModel as PydanticModel

import sqlalchemy

# --- Database ---
metadata = sqlalchemy.MetaData()

user_table = sqlalchemy.Table(
    "user", metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True, nullable=False),
    sqlalchemy.Column("password", sqlalchemy.String, nullable=False),
)

# --- Schemas ---
class UserCreate(PydanticModel):
    name: str
    email: str
    password: str

class UserOutput(PydanticModel):
    id: int
    name: str
    email: str

# --- DDD layers ---
class UserRepository(SQLAlchemyTableRepository):
    _table = user_table

class UserWorker(SQLAlchemyWorker):
    user: UserRepository

class UserResource(Resource):
    name = "user"
    verbose_name = "User"

    @ResourceRoute.method("/", methods=["POST"], name="create")
    async def create(
        self,
        worker: UserWorker,
        data: typing.Annotated[types.Schema, types.SchemaMetadata(UserCreate)],
    ):
        """
        tags:
            - User
        summary:
            Register a new user.
        responses:
            201:
                description: User created.
        """
        async with worker:
            hashed = hashlib.sha256(data["password"].encode()).hexdigest()
            result = await worker.user.create({**data, "password": hashed})
        return APIResponse(result[0], status_code=201)

    @ResourceRoute.method("/{user_id:int}/", methods=["GET"], name="retrieve")
    async def retrieve(
        self, worker: UserWorker, user_id: int,
    ) -> typing.Annotated[types.Schema, types.SchemaMetadata(UserOutput)]:
        """
        tags:
            - User
        summary:
            Get user by ID.
        """
        async with worker:
            try:
                return await worker.user.retrieve(id=user_id)
            except NotFoundError:
                raise HTTPException(status_code=404, detail="User not found")

# --- ML Model (lazy loading) ---
class PredictionModel(BaseModel):
    def __init__(self, model=None, meta=None, artifacts=None):
        self.model = model
        self.meta = meta
        self.artifacts = artifacts

    def inspect(self) -> typing.Any:
        return self.model.get_params() if self.model else {}

    def predict(self, x: typing.Any) -> typing.Any:
        result = self.model.predict(x)
        return [int(v) for v in result] if hasattr(result, "tolist") else result

class PredictionComponent(ModelComponent):
    def __init__(self, path: str):
        self._path = path
        self.model = PredictionModel()

    def load(self):
        artifact = flama.load(path=self._path)
        self.model = PredictionModel(artifact.model, artifact.meta, artifact.artifacts)

    def reset(self):
        self.model = PredictionModel()

    def resolve(self) -> PredictionModel:
        if not self.model.model:
            self.load()
        return self.model

prediction_component = PredictionComponent("sklearn_model.flm")

class PredictionResource(BaseModelResource[PredictionComponent]):
    name = "predictor"
    verbose_name = "ML Predictor"
    component = prediction_component

# --- App assembly ---
app = Flama(
    openapi={
        "info": {
            "title": "Full-Stack ML + DDD API",
            "version": "1.0.0",
            "description": "Machine learning API with Domain-Driven Design 🔥",
        }
    },
    docs="/docs/",
    components=[
        WorkerComponent(worker=UserWorker()),
        prediction_component,
    ],
    modules=[
        SQLAlchemyModule(url="sqlite+aiosqlite:///app.db"),
    ],
)

app.resources.add_resource("/users/", UserResource)
app.models.add_model_resource(path="/predict", resource=PredictionResource)

if __name__ == "__main__":
    flama.run(flama_app="__main__:app", server_host="0.0.0.0", server_port=8080, server_reload=True)
```

---

## 21. COMMON PATTERNS AND CONVENTIONS

### Import organisation

```python
# 1. Standard library
import typing
import hashlib
from datetime import datetime

# 2. Third-party
import sqlalchemy
from pydantic import BaseModel

# 3. Flama
import flama
from flama import Flama, types
from flama.resources.routing import ResourceRoute
```

### Return types

- **Dict** → auto-serialised to JSON with status 200
- **`APIResponse(content, status_code=201)`** → explicit status code
- **`APIErrorResponse(detail="...", status_code=400)`** → structured error
- **Raise `HTTPException(status_code=404)`** → error response

### Schema annotations

```python
# ALWAYS use this exact pattern for typed request data:
data: typing.Annotated[types.Schema, types.SchemaMetadata(MyPydanticModel)]

# For partial updates (PATCH):
data: typing.Annotated[types.Schema, types.SchemaMetadata(MyPydanticModel, partial=True)]
```

### Worker transaction pattern

```python
# ALWAYS wrap repository calls in `async with worker:`
async with worker:
    result = await worker.repository.create(data)
    # Auto-commits on success, auto-rollbacks on exception
```

### Resource method decorator

```python
# ALWAYS use ResourceRoute.method(), NEVER resource_method()
@ResourceRoute.method("/path/", methods=["GET", "POST"], name="method-name")
def my_method(self, ...):
    """
    tags:
        - Tag Name
    summary:
        Short description.
    """
    ...
```

### numpy output serialisation

When returning predictions from sklearn models, numpy types are not JSON-serialisable:

```python
def predict(self, x):
    result = self.model.predict(x)
    return [int(v) for v in result] if hasattr(result, "tolist") else result
```

---

## 22. CLI REFERENCE

```bash
# Run an application
flama run <module:app> [--server-host HOST] [--server-port PORT] [--server-reload]

# Serve a model file (no code needed)
flama serve <model.flm> [--server-host HOST] [--server-port PORT]

# Start from config file
flama start <config.json>

# Inspect a model
flama model <model.flm> inspect [--pretty]

# Predict with a model
flama model <model.flm> predict [--file input.json] [--output output.json] [--pretty]
echo '{"input": [[0,0],[1,1]]}' | flama model model.flm predict
```

---

## 23. PROJECT STRUCTURE RECOMMENDATION

```
my-api/
├── src/
│   ├── __init__.py
│   ├── app.py              # Flama app assembly
│   ├── models/
│   │   ├── __init__.py
│   │   └── tables.py       # SQLAlchemy table definitions
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── user.py         # Pydantic schemas
│   ├── repositories/
│   │   ├── __init__.py
│   │   └── user.py         # SQLAlchemyTableRepository subclasses
│   ├── workers/
│   │   ├── __init__.py
│   │   └── user.py         # SQLAlchemyWorker subclasses
│   ├── resources/
│   │   ├── __init__.py
│   │   └── user.py         # Resource classes with @ResourceRoute.method
│   └── ml/
│       ├── __init__.py
│       ├── components.py   # ModelComponent subclasses
│       └── resources.py    # BaseModelResource subclasses
├── models/
│   └── sklearn_model.flm   # Packaged ML models
├── tests/
│   ├── conftest.py
│   └── test_users.py
├── pyproject.toml
└── README.md
```

---

## 24. EXCEPTIONS REFERENCE

| Exception                    | Module                       | Default status | Use case                    |
|-----------------------------|------------------------------|----------------|-----------------------------|
| `HTTPException`             | `flama.exceptions`           | Varies         | Any HTTP error              |
| `ValidationError`           | `flama.exceptions`           | 400            | Request validation failure  |
| `SerializationError`        | `flama.exceptions`           | 500            | Response serialization fail |
| `NotFoundError`             | `flama.ddd.exceptions`       | —              | Repository: record missing  |
| `AlreadyExistsError`        | `flama.ddd.exceptions`       | —              | Repository: duplicate       |
| `IntegrityError`            | `flama.ddd.exceptions`       | —              | DB constraint violation     |
| `MultipleRecordsError`      | `flama.ddd.exceptions`       | —              | Expected one, got many      |
| `WebSocketException`        | `flama.exceptions`           | —              | WebSocket protocol error    |
| `DependencyNotInstalled`    | `flama.exceptions`           | —              | Missing optional package    |

---

## 25. KEY API SURFACE

### Top-level imports

```python
import flama
from flama import Flama                                        # Application
from flama import types                                        # Type definitions
from flama import Component                                    # DI component base
from flama.modules import Module                               # Module base
from flama.middleware import Middleware                         # Middleware wrapper
from flama.resources import Resource, CRUDResource             # Resource classes
from flama.resources.routing import ResourceRoute              # Route decorator
from flama.models import BaseModel, ModelComponent, ModelResource, BaseModelResource
from flama.ddd.repositories.sqlalchemy import SQLAlchemyTableRepository
from flama.ddd.workers.sqlalchemy import SQLAlchemyWorker
from flama.ddd.components import WorkerComponent
from flama.sqlalchemy import SQLAlchemyModule
from flama.authentication.jwt import JWT
from flama.authentication.components import AccessTokenComponent, RefreshTokenComponent
from flama.authentication import AuthenticationMiddleware
from flama.http import APIResponse, APIErrorResponse, JSONResponse
from flama.exceptions import HTTPException, ValidationError
from flama.ddd.exceptions import NotFoundError, AlreadyExistsError
from flama.client import Client                                # Test client
from flama.config import Config, Secret, URL
from flama.background import BackgroundThreadTask, BackgroundProcessTask, BackgroundTasks
from flama.endpoints import HTTPEndpoint, WebSocketEndpoint
from flama.pagination import paginator
```

### Serialisation

```python
flama.dump(model, path="file.flm", compression="zstd", ...)  # Package model
flama.load(path="file.flm")                                   # Load model -> ModelArtifact
```

