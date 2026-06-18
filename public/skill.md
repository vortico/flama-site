# Flama Skill File

> **Repository**: https://github.com/vortico/flama
> **Documentation**: https://flama.dev/docs/
> **License**: Apache-2.0
> **Version**: latest

This file is a comprehensive reference for LLMs and AI coding assistants to build applications with the
**Flama** framework. It covers every public API surface, pattern, and convention needed to write
production-ready Machine Learning APIs, LLM serving APIs, MCP servers, RESTful services, and Domain-Driven
Design applications using Flama.

---

## 1. WHAT IS FLAMA

Flama is a production-ready, open-source Python framework for building **Machine Learning APIs**,
**LLM serving endpoints**, and **MCP (Model Context Protocol) servers** with automatic **OpenAPI documentation**.
It provides:

- **Rust-powered core** — routing, JSON encoding, request parsing, compression compiled to native code via PyO3
- **Unified model serving** — package, serialise, and deploy sklearn / TensorFlow / PyTorch (predictive) and LLM (generative) models with the same workflow
- **Native LLM serving** — serve any LLM behind OpenAI, Anthropic, Ollama, and Native-compatible APIs with a single command. Backends: vLLM (Linux/CUDA) and MLX (macOS/Metal)
- **Model Context Protocol (MCP)** — first-class stateless MCP support. Expose tools, resources, and prompts to AI agents with type-safe schemas derived from type hints
- **Streaming-first HTTP** — Server-Sent Events (SSE) and NDJSON as first-class response types
- **Dependency injection** — component-based DI with automatic resolution
- **Domain-Driven Design** — repositories, workers, resources (Unit of Work pattern)
- **Auto-documentation** — OpenAPI 3.x schema and interactive docs at `/docs/`
- **Flexible schemas** — Pydantic, Typesystem, or Marshmallow
- **REST resources** — full CRUD with pagination out of the box
- **JWT authentication** — access and refresh tokens with permission-based route protection
- **CLI** — download, serve, query, and stream models with zero code
- **Built-in middleware** — compression (brotli/gzip), CORS, correlation ID, HTTPS redirect, trusted hosts, sessions

---

## 2. INSTALLATION

```bash
# Core
pip install flama

# With Pydantic (RECOMMENDED)
pip install "flama[pydantic]"

# With database support (SQLAlchemy async)
pip install "flama[pydantic,database]"

# With LLM support (vLLM on Linux, MLX on macOS)
pip install "flama[llm]"

# Full installation (all extras)
pip install "flama[full]"
```

### Available extras

| Extra        | Packages                                                      | Purpose                            |
|-------------|---------------------------------------------------------------|-------------------------------------|
| `pydantic`  | `pydantic>=2.12`                                              | Schema validation (recommended)     |
| `typesystem`| `typesystem>=0.4.1`                                           | Alternative schema validation       |
| `marshmallow`| `marshmallow>=3.0`, `apispec>=6.0`                           | Alternative schema validation       |
| `database`  | `SQLAlchemy[asyncio]>=2.0`                                    | Async database support (DDD, REST)  |
| `llm`       | `vllm` (Linux) or `mlx`+`mlx-lm`+`mlx-vlm` (macOS), `Pillow`, `soundfile` | LLM inference backends |
| `full`      | All of the above                                              | Everything                          |

### Core dependencies (always installed)

- `click>=8.1` — CLI
- `uvicorn[standard]>=0.38` — ASGI server
- `Jinja2>=3.1.2` — templating
- `pyyaml>=6.0` — YAML parsing
- `rich>=14.0` — terminal formatting
- `httpx[http2]>=0.28` — HTTP client

### Supported Python versions

Python 3.10 through 3.14.

---

## 3. RUST-POWERED CORE

Flama compiles performance-critical paths to native code via PyO3 (Rust). The Rust core handles:

- **Route table** — compiled routing with typed path converters
- **JSON encoder** — native encoding with first-class support for `datetime`, `date`, `uuid`, `Enum`, `set`, `dataclass`, `Decimal`
- **HTTP parsing** — URL decoding, cookie parsing, multipart and URL-encoded form parsing
- **Compression** — gzip, brotli, bzip2, lzma, zstd codecs
- **FLM serialisation** — tar archiving for model bundles

No Rust toolchain is required. The Rust extension is pre-compiled into the wheel. You just `pip install`.

---

## 4. APPLICATION — `flama.Flama`

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

The constructor automatically registers four built-in modules: `MCPModule`, `ResourcesModule`, `SchemaModule`,
and `ModelsModule`. These provide `app.mcp`, `app.resources`, `app.schema`, and `app.models` respectively.

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

## 5. SCHEMAS AND VALIDATION

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

# Return type annotation (single item)
def handler() -> typing.Annotated[types.Schema, types.SchemaMetadata(OutputSchema)]:
    ...

# Return type annotation (list)
def handler() -> typing.Annotated[types.SchemaList, types.SchemaMetadata(OutputSchema)]:
    ...
```

---

## 6. DEPENDENCY INJECTION — Components

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
| `types.App`           | The Flama application    |
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

## 7. ENDPOINTS — Class-based handlers

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

### JSON-RPC endpoint

```python
from flama.endpoints import JSONRPCEndpoint

class MyRPCEndpoint(JSONRPCEndpoint):
    async def my_method(self, params):
        return {"result": params}
```

---

## 8. RESOURCES — RESTful CRUD

Resources provide a declarative pattern for building REST APIs with database-backed models.

### Prerequisites

```bash
pip install "flama[pydantic,database]"
```

### Defining schemas and table

```python
import sqlalchemy
from pydantic import BaseModel
from flama.sqlalchemy import metadata

# Database table (use flama.sqlalchemy.metadata for auto table creation)
items_table = sqlalchemy.Table(
    "items",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("price", sqlalchemy.Float),
)

# Schemas
class ItemSchema(BaseModel):
    id: int | None = None
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
    schema = ItemSchema

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

## 9. MODEL SERVING — PREDICTIVE (ML)

Flama serves predictive ML models from sklearn, TensorFlow, and PyTorch behind auto-generated API endpoints.

### 9.1 Packaging models (FLM files)

```python
import flama
from sklearn.linear_model import LogisticRegression
import numpy as np

# Train model
model = LogisticRegression().fit(
    np.array([[0, 0], [0, 1], [1, 0], [1, 1]]),
    np.array([0, 0, 0, 1]),
)

# Package as FLM file (protocol v2)
flama.dump(
    model,
    path="model.flm",
    family="ml",                 # "ml" (default for sklearn/tf/torch) or "llm"
    compression="zstd",          # "bz2" | "lzma" | "zlib" | "zstd" (default)
    model_id="and-classifier",   # str or auto-generated UUID
    params={"penalty": "l2"},
    metrics={"accuracy": 0.99},
    extra={"version": "1.0.0", "author": "Team"},
    artifacts={"labels.json": "path/to/labels.json"},
)
```

### Compression formats

| Format | Speed   | Ratio   | Notes                    |
|--------|---------|---------|--------------------------|
| `zstd` | Fastest | Best    | **Default**. Recommended |
| `zlib` | Fast    | Good    | No external dependency   |
| `lzma` | Slowest | Excellent| Best ratio, slowest     |
| `bz2`  | Slow    | Good    | Block-sorting compressor |

### FLM protocol v2

The FLM v2 format is a multi-artifact container with:
- Typed metadata header (`id`, `timestamp`, `framework`, `model`, `capabilities`, `extra`)
- Per-section compression (each section can use a different algorithm)
- Model kind: `binary` (ML) or `bundle` (LLM/transformers)
- Side-artifact bundling alongside the model

### Loading and introspecting models

```python
# Full load (deserialises the model object)
model_artifact = flama.load(path="model.flm")
model = model_artifact.model           # The ML model object
meta = model_artifact.meta             # Metadata
artifacts = model_artifact.artifacts   # Dict of artifact paths

# Cheap header-only introspection (no model load)
meta = flama.meta(path="model.flm")             # Metadata only
manifest = flama.manifest(path="model.flm")      # List of archive entries
```

### 9.2 Adding ML models to an app

```python
import flama
from flama import Flama

app = Flama(
    openapi={"info": {"title": "ML API", "version": "1.0.0"}},
    docs="/docs/",
)

# Auto-detects family from artifact metadata; creates /model/inspect/ and /model/predict/ routes
app.models.add_model(path="/model", model="sklearn_model.flm", name="sklearn")
```

### 9.3 MLResource (declarative)

```python
from flama.models import MLResource

class AndModel(MLResource):
    name = "and_model"
    verbose_name = "AND model"
    model_path = "and.flm"

app.models.add_model_resource("/model", AndModel)
```

This automatically creates:
- `GET /model/inspect/` — model metadata
- `POST /model/predict/` — generate predictions
- `POST /model/stream/` — stream predictions via SSE

### 9.4 Codeless ML serving via CLI

```bash
# Serve a single model
flama serve --model file=sklearn_model.flm,url=/,name=sklearn

# Inspect model metadata without a server
flama model sklearn_model.flm inspect --pretty

# Batch predictions from JSON
echo '{"input": [[0,0],[0,1],[1,0],[1,1]]}' | flama model sklearn_model.flm run --pretty
```

---

## 10. MODEL SERVING — GENERATIVE (LLM)

Flama natively serves large language models with the same simplicity as predictive models.

### 10.1 Downloading an LLM

```bash
# Download from HuggingFace and package as .flm
flama get mlx-community/gemma-4-E2B-it-qat-4bit --source huggingface --family llm

# Custom output path and concurrency
flama get mlx-community/gemma-4-E2B-it-qat-4bit --source huggingface --family llm -o gemma.flm --max-concurrent 16
```

### 10.2 Querying an LLM from the CLI

```bash
# Run a prompt (loads model, runs, exits)
echo "What is Flama?" | flama model gemma.flm run --system "Be concise."

# Stream tokens to stdout
echo "Explain gravity" | flama model gemma.flm stream --system "Be concise."

# Buffered streaming (accumulates, then prints)
echo "Write a haiku" | flama model gemma.flm stream --buffer
```

### 10.3 Serving an LLM as an API

```bash
# Serve with all dialects (native, openai, anthropic, ollama)
flama serve --model file=gemma.flm,url=/,name=gemma

# Serve with specific dialects only
flama serve --model file=gemma.flm,url=/,name=gemma,serving=native+openai
```

This creates a full production API with:
- **Native dialect**: `/inspect/`, `/configure/`, `/query/`, `/streams/`, `/streams/{stream_id}/`, `/chat/`
- **OpenAI dialect**: `/v1/chat/completions`, `/v1/responses`, `/v1/models`
- **Anthropic dialect**: `/v1/messages`, `/v1/models`
- **Ollama dialect**: `/api/chat`, `/api/generate`
- **Built-in chat interface** with Markdown, LaTeX, and Mermaid rendering

### 10.4 LLM backends

| Backend | Platform | GPU | Notes |
|---------|----------|-----|-------|
| vLLM    | Linux    | CUDA | High-throughput, production-grade |
| MLX     | macOS    | Metal | Apple Silicon native |

The framework auto-selects the best available backend at runtime (vLLM first, then MLX).

### 10.5 Wire dialects

Each dialect translates the same internal generation into the protocol your client expects:

| Dialect    | Routes created | Compatible with |
|------------|----------------|-----------------|
| `native`   | inspect, configure, query, stream, chat | Flama native clients |
| `openai`   | /v1/chat/completions, /v1/responses, /v1/models | OpenAI SDK, Claude Code, any OpenAI-compatible tool |
| `anthropic` | /v1/messages, /v1/models | Anthropic SDK |
| `ollama`   | /api/chat, /api/generate | Ollama SDK |

### 10.6 LLM serving via Python

```python
from flama import Flama

app = Flama(
    openapi={
        "info": {
            "title": "LLM API",
            "version": "1.0.0",
        }
    },
)

# Automatic: detects family=llm from the artifact, wires all serving layers
app.models.add_model(
    path="/gemma/",
    model="gemma.flm",
    name="gemma",
    serving=("native", "openai"),        # Optional: restrict to specific dialects
    params={"temperature": 0.7},         # Optional: default generation params
)
```

### 10.7 Custom LLMResource

```python
from flama.models import LLMResource

class GemmaResource(LLMResource):
    name = "gemma"
    verbose_name = "Gemma LLM"
    model_path = "gemma.flm"
    serving = ("native", "openai", "anthropic", "ollama")  # or a subset

app.models.add_model_resource("/gemma/", GemmaResource)
```

### 10.8 Model capabilities

LLM models declare their capabilities (auto-detected from the model config):

```python
from flama.serialize.data_structures import LLMModelCapabilities

# Capabilities include:
# text, image, audio, video — input modality support
# tools — function calling support
# reasoning — chain-of-thought / <think> block support
# is_multimodal — True if any non-text modality is supported
# modalities — tuple of supported input modality names
```

### 10.9 Decoder (channel parsing)

The LLM decoder parses structured output from the generation stream into channels:

```python
from flama.models.engine.llm.decoder.decoder import Decoder

# Default decoder parses <think>, <tool_call>, <json_object> blocks
decoder = Decoder("think", "tool_call", "json_object")
```

Channels are parsed from the raw token stream and surfaced as typed events:
- `TextEvent` — visible assistant text
- `ToolEvent` — function/tool calls
- `TraceEvent` — reasoning traces (`<think>` blocks)
- `StartEvent` / `StopEvent` — stream lifecycle

---

## 11. MODEL CONTEXT PROTOCOL (MCP)

Flama provides first-class support for the **Model Context Protocol**, enabling AI agents to
discover and invoke tools, read resources, and use prompts via a stateless JSON-RPC interface.

### 11.1 Creating an MCP server

```python
from flama import Flama
from flama.mcp.server import MCPServer

server = MCPServer("tools", version="1.0.0", instructions="My MCP tools server")
```

### 11.2 Defining tools

```python
# Simple sync tool
@server.tool("add", description="Add two integers")
def add(a: int, b: int) -> int:
    return a + b

# Async tool
@server.tool(description="Greet someone by name")
async def greet(name: str) -> str:
    return f"Hello, {name}!"

# Background task tool (requires client Extensions.TASKS support)
@server.tool("square", task=True, description="Square a number as a background task")
async def square(x: int) -> int:
    return x * x
```

Input schemas are derived automatically from the function signature via type hints.
Output schemas are inferred from the return type annotation.

### 11.3 Elicitation (interactive round-trips)

```python
from flama.mcp.data_structures import Elicit, Elicitation

@server.tool("confirm", description="Confirm an action")
def confirm(elicitation: Elicitation) -> str:
    if "confirm" not in elicitation:
        return Elicit.require("Are you sure?", {"type": "boolean"}, name="confirm")
    return f"confirmed={elicitation['confirm']}"
```

The `Elicitation` parameter is injected by the framework and excluded from the tool's input schema.

### 11.4 Defining resources

```python
import json

@server.resource(
    "config://app",
    name="config",
    description="Application configuration",
    mime_type="application/json",
)
def config():
    return json.dumps({"debug": True, "name": "my-app"})
```

### 11.5 Defining prompts

```python
@server.prompt("summarise", description="Summarise the given text")
def summarise(text: str):
    return f"Summarise the following:\n\n{text}"
```

Prompt arguments are derived from the handler's parameters.

### 11.6 App templates (MCP Apps)

```python
@server.app_template("ui://widget", name="widget", description="A small UI widget")
def widget():
    return "<html><body><h1>My widget</h1></body></html>"
```

### 11.7 Mounting MCP servers on the app

```python
app = Flama(
    openapi={
        "info": {
            "title": "MCP API",
            "version": "1.0.0",
        }
    },
)

# Mount one or more MCP servers
app.mcp.add_server("/mcp/tools/", "tools", server=server)

# Or use the module-level shorthand (uses a default server)
@app.mcp.tool("multiply", description="Multiply two integers")
def multiply(a: int, b: int) -> int:
    return a * b

@app.mcp.resource("status://health", name="health", description="Health check")
def health():
    return "ok"

@app.mcp.prompt("explain", description="Explain a concept")
def explain(concept: str):
    return f"Explain {concept} in simple terms."
```

### 11.8 MCP protocol details

- Protocol version: `2026-07-28`
- Transport: stateless HTTP POST with JSON-RPC 2.0 envelopes
- Routing headers: `Mcp-Method` and `Mcp-Name`
- Client metadata carried in `_meta` field (protocol version, capabilities, client info)
- Supported JSON-RPC methods: `server/discover`, `ping`, `tools/list`, `tools/call`,
  `resources/list`, `resources/read`, `resources/templates/list`, `prompts/list`, `prompts/get`,
  `tasks/get`, `tasks/update`, `tasks/cancel`

### 11.9 MCP injectable types

These types can be used in tool/resource/prompt handler signatures for DI:

| Type | Description |
|------|-------------|
| `RequestMeta` | Client metadata (protocol version, capabilities, extensions) |
| `RequestHeaders` | MCP routing headers (method, name, protocol version) |
| `TraceContext` | OpenTelemetry trace context (traceparent, tracestate, baggage) |
| `Extensions` | Client-advertised extensions (TASKS, APPS) |
| `Elicitation` | Elicitation state for interactive tool round-trips |

---

## 12. STREAMING RESPONSES

Flama provides first-class streaming response types.

### Server-Sent Events (SSE)

```python
from flama.http.responses.sse import ServerSentEvent, ServerSentEventResponse

@app.route("/sse/", name="sse")
def sse():
    async def gen():
        for i in range(50):
            if i % 10 == 0:
                yield ServerSentEvent(comment="heartbeat")
            yield ServerSentEvent(data=str(i), event="tick", id=str(i))

    return ServerSentEventResponse(gen())
```

`ServerSentEvent` fields: `data`, `event`, `id`, `retry`, `comment`.

Strings yielded to `ServerSentEventResponse` are auto-wrapped as `ServerSentEvent(data=chunk)`.

SSE responses automatically set `Cache-Control: no-cache` and `Connection: keep-alive`.

### Resumable SSE with Last-Event-ID

```python
@app.route("/sse/resume/", name="sse_resume")
def sse_resume(request: http.Request):
    start = int(request.headers.get("last-event-id", "-1")) + 1

    async def gen():
        for i in range(start, start + 5):
            yield ServerSentEvent(data=str(i), event="tick", id=str(i))

    return ServerSentEventResponse(gen())
```

### NDJSON (Newline-Delimited JSON)

```python
from flama.http.responses.ndjson import NDJSONResponse

@app.route("/ndjson/", name="ndjson")
def ndjson():
    async def gen():
        for i in range(50):
            yield {"i": i, "square": i * i}

    return NDJSONResponse(gen())
```

Content type: `application/x-ndjson`. Each item is JSON-encoded and followed by `\n`.

---

## 13. DOMAIN-DRIVEN DESIGN (DDD)

Flama implements the **Repository** and **Unit of Work** patterns for clean separation of concerns.

### Prerequisites

```bash
pip install "flama[pydantic,database]"
```

### 13.1 Data model (SQLAlchemy + Pydantic)

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

### 13.2 Repository

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

### 13.3 Worker (Unit of Work)

```python
from flama.ddd.workers.sqlalchemy import SQLAlchemyWorker

class RegisterWorker(SQLAlchemyWorker):
    user: UserRepository          # Declare repositories as class attributes

# Usage:
# async with worker:
#     await worker.user.create({"name": "Alice", "email": "a@b.com", "password": "hashed"})
#     # Commits on successful exit, rolls back on exception
```

### 13.4 Resource (business logic)

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

### 13.5 Application assembly

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

## 14. AUTHENTICATION — JWT

### Prerequisites

JWT is built-in (no extra dependency needed).

### Setup

```python
import os
from flama import Flama
from flama.authentication.components import AccessTokenComponent
from flama.authentication.middleware import AuthenticationMiddleware

SECRET = os.urandom(32)

app = Flama(
    openapi={"info": {"title": "Auth API", "version": "1.0.0"}},
    docs="/docs/",
    components=[
        AccessTokenComponent(secret=SECRET),
    ],
    middleware=[
        AuthenticationMiddleware(ignored=[r"/health.*"]),  # regex patterns to skip
    ],
)
```

### Creating tokens

```python
from flama.authentication.jwt import JWT
from datetime import datetime, timezone, timedelta

@app.post("/login/")
async def login(username: str, password: str):
    token = JWT(
        _header={"alg": "HS256", "typ": "JWT"},
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
@app.route("/admin/", tags={"permissions": ["admin"]})
def admin_panel():
    return {"area": "admin"}

@app.route("/secure/", tags={"permissions": ["articles:read"]})
def secure():
    return {"area": "secure"}

# Routes with no "permissions" tag are public by default
@app.route("/health/")
def health():
    return {"status": "ok"}
```

The `AuthenticationMiddleware` checks the `permissions` tag on each route. If the route has permissions,
it validates the JWT token from the `Authorization: Bearer <token>` header or cookies, and verifies that
the token's `data.permissions` intersect with the required permissions.

---

## 15. MIDDLEWARE

Flama ships its own middleware classes (no Starlette dependency for middleware):

```python
from flama import Flama
from flama.middleware import (
    Middleware,              # Base middleware class / wrapper
    CompressionMiddleware,   # Brotli + gzip negotiation
    CORSMiddleware,          # Cross-Origin Resource Sharing
    CorrelationIdMiddleware, # X-Correlation-Id propagation
    HTTPSRedirectMiddleware, # Force HTTPS
    TrustedHostMiddleware,   # Host header validation
    SessionMiddleware,       # Cookie-based sessions
)

app = Flama(
    middleware=[
        CorrelationIdMiddleware(),
        CORSMiddleware(allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]),
        CompressionMiddleware(minimum_size=500),
    ],
)
```

### CompressionMiddleware

Negotiates `Accept-Encoding` (brotli preferred, then gzip). Skips bodies below `minimum_size`.
Never compresses `text/event-stream`. Compresses streaming NDJSON chunk-by-chunk.

```python
from flama.middleware import CompressionMiddleware

app = Flama(middleware=[CompressionMiddleware(minimum_size=500)])
```

### CorrelationIdMiddleware

Assigns a unique ID to every request. Propagates existing `X-Correlation-Id` from incoming headers
or generates a new UUID4. Stored in `scope["correlation_id"]` and emitted as a response header.

```python
from flama.middleware import CorrelationIdMiddleware

app = Flama(middleware=[CorrelationIdMiddleware(header="X-Correlation-Id")])
```

### Custom ASGI middleware

```python
from flama import concurrency
from flama.middleware import Middleware

class TimingMiddleware(Middleware):
    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            start = time.perf_counter()
            await concurrency.run(self.app, scope, receive, send)
            duration = time.perf_counter() - start
            print(f"Request took {duration:.3f}s")
        else:
            await concurrency.run(self.app, scope, receive, send)

app.add_middleware(TimingMiddleware())
```

### TelemetryMiddleware

```python
from flama.telemetry import TelemetryMiddleware
```

Captures request/response data (headers, body, status code, errors) for observability hooks.

---

## 16. PAGINATION

```python
# Page number pagination
@app.get("/items/", pagination="page_number")
async def list_items():
    return [{"id": i} for i in range(100)]

# Limit offset pagination
@app.get("/items/", pagination="limit_offset")
async def list_items():
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

## 17. HTTP RESPONSES

```python
from flama.http import (
    Response,               # Base response
    BufferedResponse,       # Fully-buffered body with auto Content-Length
    StreamingResponse,      # Streaming iterable
    JSONResponse,           # JSON (default for dict returns)
    HTMLResponse,           # HTML content
    PlainTextResponse,      # Plain text
    RedirectResponse,       # HTTP redirect
    FileResponse,           # File download (supports Range and multipart byte ranges)
    APIResponse,            # JSON with schema validation
    APIErrorResponse,       # Standardised error response
    HTMLTemplateResponse,   # Jinja2 template
    JSONRPCResponse,        # JSON-RPC 2.0 response
    JSONRPCErrorResponse,   # JSON-RPC 2.0 error response
)

from flama.http.responses.sse import ServerSentEventResponse    # SSE streaming
from flama.http.responses.ndjson import NDJSONResponse          # NDJSON streaming

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

## 18. BACKGROUND TASKS

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

## 19. LIFESPAN AND EVENTS

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
    # Runs AFTER all module startup events
    async with app.sqlalchemy.engine.begin() as conn:
        await conn.run_sync(metadata.create_all)
    yield
    # Shutdown

app = Flama(lifespan=lifespan)
```

---

## 20. MODULES

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

### Built-in modules

| Module | Attribute | Purpose |
|--------|-----------|---------|
| `ModelsModule` | `app.models` | ML and LLM model serving |
| `MCPModule` | `app.mcp` | Model Context Protocol servers |
| `ResourcesModule` | `app.resources` | REST resource registration |
| `SchemaModule` | `app.schema` | OpenAPI schema management |
| `SQLAlchemyModule` | `app.sqlalchemy` | Async database engine |

```python
from flama.sqlalchemy import SQLAlchemyModule

app = Flama(
    modules=[
        SQLAlchemyModule(url="sqlite+aiosqlite:///app.db"),
    ],
)
```

---

## 21. TESTING

### Setup

```python
# pyproject.toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
```

```bash
pip install "flama[pydantic,database]" pytest pytest-asyncio
```

### Test client

Flama bundles an HTTP client based on `httpx`:

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

## 22. CONFIGURATION

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

## 23. OPENAPI DOCSTRINGS

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

## 24. CLI REFERENCE

### `flama get` — Download and package a model

```bash
flama get MODEL_NAME --source huggingface --family {ml,llm} [-o OUTPUT] [--max-concurrent N]

# Examples:
flama get mlx-community/gemma-4-E2B-it-qat-4bit --source huggingface --family llm
flama get sklearn-model/iris --source huggingface --family ml -o iris.flm
```

### `flama model` — Inspect, run, and stream models offline

```bash
# Inspect model metadata
flama model MODEL.flm inspect [--pretty]

# Run a prediction or prompt (ML: JSON input, LLM: text prompt)
flama model MODEL.flm run [-i INPUT] [-o OUTPUT] [--pretty]
    [--transport {raw,chat,conversation}]    # LLM only
    [--system TEXT]                            # LLM only
    [--param KEY=VALUE]...                    # LLM only
    [--channel CHANNEL]...                    # LLM only

# Stream tokens (LLM only)
flama model MODEL.flm stream [-i INPUT] [-o OUTPUT] [--buffer]
    [--transport {raw,chat,conversation}]
    [--system TEXT]
    [--param KEY=VALUE]...
    [--channel CHANNEL]...

# Examples:
flama model sklearn.flm inspect --pretty
echo '{"input": [[0,0],[1,1]]}' | flama model sklearn.flm run --pretty
echo "What is Flama?" | flama model gemma.flm run --system "Be concise."
echo "Explain gravity" | flama model gemma.flm stream --buffer
```

### `flama run` — Run a Flama application

```bash
flama run MODULE:APP [--server-host HOST] [--server-port PORT] [--server-reload]

# Example:
flama run src.main:app --server-host 0.0.0.0 --server-port 8080 --server-reload
```

### `flama serve` — Serve model files as an API

```bash
flama serve --model SPEC [--model SPEC ...] [server options] [app options]

# Model spec formats:
#   Bare path:     --model model.flm
#   Key=value:     --model file=model.flm,url=/,name=my-model,serving=native+openai
#   Spec file:     --model @model-spec.json

# App options:
#   --app-title TEXT          (default: Flama)
#   --app-version TEXT        (default: 0.1.0)
#   --app-description TEXT
#   --app-schema TEXT         (default: /schema/)
#   --app-docs TEXT           (default: /docs/)
#   --app-debug

# Examples:
flama serve --model file=gemma.flm,url=/,name=gemma
flama serve --model file=sklearn.flm,url=/ml/,name=sklearn --model file=gemma.flm,url=/llm/,name=gemma
```

### `flama start` — Start from a config file

```bash
flama start [CONFIG_FILE] [--create-config {simple,full}]

# Default config file: flama.json
# Examples:
flama start
flama start my-config.json
flama start --create-config full    # Generate a template config
```

### `flama upgrade` — Migrate code to a new major version

```bash
flama upgrade PATHS... [--to TARGET] [--from SOURCE] [--diff|--write] [--select IDS] [--skip IDS]

# Examples:
flama upgrade src/ --diff           # Preview changes
flama upgrade src/ --write          # Apply changes
flama upgrade src/ --select op1,op2 # Apply specific operations only
```

### Common server options (for `run` and `serve`)

```
--server-host TEXT          (default: 127.0.0.1, env: HOST)
--server-port INT           (default: 8000, env: PORT)
--server-reload             Enable auto-reload on file changes
--server-workers INT        Number of worker processes
--server-log-level LEVEL    Logging level
```

All CLI commands support the `FLAMA_` environment variable prefix (e.g. `FLAMA_SERVER_HOST`).

---

## 25. COMPLETE EXAMPLE — ML + LLM + MCP + DDD

```python
import hashlib
import json
import typing

import sqlalchemy
from pydantic import BaseModel as PydanticModel

import flama
from flama import Flama, types
from flama.ddd.components import WorkerComponent
from flama.ddd.exceptions import NotFoundError
from flama.ddd.repositories.sqlalchemy import SQLAlchemyTableRepository
from flama.ddd.workers.sqlalchemy import SQLAlchemyWorker
from flama.exceptions import HTTPException
from flama.http import APIResponse
from flama.mcp.server import MCPServer
from flama.models import MLResource
from flama.resources import Resource
from flama.resources.routing import ResourceRoute
from flama.sqlalchemy import SQLAlchemyModule, metadata

# --- Database ---
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

# --- ML Model ---
class PredictionModel(MLResource):
    name = "predictor"
    verbose_name = "ML Predictor"
    model_path = "sklearn_model.flm"

# --- MCP Server ---
mcp_server = MCPServer("tools", version="1.0.0", instructions="API tools for user management")

@mcp_server.tool("user_count", description="Get the total number of users")
async def user_count() -> int:
    return 42

@mcp_server.resource("config://app", name="config", description="App config", mime_type="application/json")
def config():
    return json.dumps({"version": "1.0.0"})

@mcp_server.prompt("welcome", description="Generate a welcome message")
def welcome(name: str):
    return f"Write a friendly welcome message for {name}."

# --- App assembly ---
app = Flama(
    openapi={
        "info": {
            "title": "Full-Stack ML + LLM + MCP + DDD API",
            "version": "1.0.0",
            "description": "Flama production API 🔥",
        }
    },
    docs="/docs/",
    components=[
        WorkerComponent(worker=UserWorker()),
    ],
    modules=[
        SQLAlchemyModule(url="sqlite+aiosqlite:///app.db"),
    ],
)

app.resources.add_resource("/users/", UserResource)
app.models.add_model_resource(path="/predict", resource=PredictionModel)
app.models.add_model(path="/llm/", model="gemma.flm", name="gemma", serving=("native", "openai"))
app.mcp.add_server("/mcp/", "tools", server=mcp_server)

if __name__ == "__main__":
    flama.run(flama_app="__main__:app", server_host="0.0.0.0", server_port=8080, server_reload=True)
```

---

## 26. COMMON PATTERNS AND CONVENTIONS

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

# For list returns:
def handler() -> typing.Annotated[types.SchemaList, types.SchemaMetadata(MyPydanticModel)]:
    ...
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

## 27. PROJECT STRUCTURE RECOMMENDATION

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
│   ├── ml/
│   │   ├── __init__.py
│   │   └── resources.py    # MLResource / LLMResource subclasses
│   └── mcp/
│       ├── __init__.py
│       └── servers.py      # MCPServer definitions with tools/resources/prompts
├── models/
│   ├── sklearn_model.flm   # Packaged ML models
│   └── gemma.flm           # Packaged LLM models
├── tests/
│   ├── conftest.py
│   └── test_users.py
├── pyproject.toml
└── README.md
```

---

## 28. EXCEPTIONS REFERENCE

| Exception                    | Module                       | Default status | Use case                    |
|-----------------------------|------------------------------|----------------|-----------------------------|
| `HTTPException`             | `flama.exceptions`           | Varies         | Any HTTP error              |
| `ValidationError`           | `flama.exceptions`           | 400            | Request validation failure  |
| `SerializationError`        | `flama.exceptions`           | 500            | Response serialization fail |
| `FrameworkNotInstalled`     | `flama.exceptions`           | 500            | Missing ML/LLM dependency   |
| `NotFoundError`             | `flama.ddd.exceptions`       | —              | Repository: record missing  |
| `AlreadyExistsError`        | `flama.ddd.exceptions`       | —              | Repository: duplicate       |
| `IntegrityError`            | `flama.ddd.exceptions`       | —              | DB constraint violation     |
| `MultipleRecordsError`      | `flama.ddd.exceptions`       | —              | Expected one, got many      |
| `WebSocketException`        | `flama.exceptions`           | —              | WebSocket protocol error    |
| `ModelError`                | `flama.models.exceptions`    | —              | Model loading/serving error |
| `LLMGenerationError`        | `flama.models.exceptions`    | —              | LLM generation failure      |
| `LLMUnsupportedCapability`  | `flama.models.exceptions`    | —              | Model lacks capability      |
| `LLMUnsupportedContentPart` | `flama.models.exceptions`    | —              | Unsupported input modality  |

---

## 29. KEY API SURFACE

### Top-level imports

```python
import flama
from flama import Flama                                        # Application
from flama import types                                        # Type definitions
from flama import Component                                    # DI component base
from flama.modules import Module                               # Module base

# Middleware
from flama.middleware import (
    Middleware, CompressionMiddleware, CORSMiddleware,
    CorrelationIdMiddleware, HTTPSRedirectMiddleware,
    TrustedHostMiddleware, SessionMiddleware,
)

# Resources & CRUD
from flama.resources import Resource, CRUDResource
from flama.resources.routing import ResourceRoute

# Model serving (ML + LLM)
from flama.models import MLResource, LLMResource, MLResourceType, LLMResourceType
from flama.models import BaseModel, MLModel, LLMModel, ModelComponent

# MCP
from flama.mcp.server import MCPServer
from flama.mcp.data_structures import Elicit, Elicitation

# DDD
from flama.ddd.repositories.sqlalchemy import SQLAlchemyTableRepository
from flama.ddd.workers.sqlalchemy import SQLAlchemyWorker
from flama.ddd.components import WorkerComponent
from flama.sqlalchemy import SQLAlchemyModule

# Authentication
from flama.authentication.jwt import JWT
from flama.authentication.components import AccessTokenComponent, RefreshTokenComponent
from flama.authentication.middleware import AuthenticationMiddleware

# HTTP
from flama.http import APIResponse, APIErrorResponse, JSONResponse
from flama.http.responses.sse import ServerSentEvent, ServerSentEventResponse
from flama.http.responses.ndjson import NDJSONResponse
from flama.exceptions import HTTPException, ValidationError
from flama.ddd.exceptions import NotFoundError, AlreadyExistsError

# Testing
from flama.client import Client

# Config
from flama.config import Config, Secret, URL

# Background tasks
from flama.background import BackgroundThreadTask, BackgroundProcessTask, BackgroundTasks

# Endpoints
from flama.endpoints import HTTPEndpoint, WebSocketEndpoint, JSONRPCEndpoint

# Serialisation
from flama.serialize.data_structures import LLMModelCapabilities, MLModelCapabilities
```

### Serialisation

```python
flama.dump(model, path="file.flm", family="ml", compression="zstd", ...)  # Package model
flama.load(path="file.flm")                                                # Load model -> ModelArtifact
flama.meta(path="file.flm")                                                # Metadata only (no model load)
flama.manifest(path="file.flm")                                            # List archive entries (no model load)
```

