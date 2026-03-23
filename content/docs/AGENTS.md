### FLAMA DOCUMENTATION STYLE GUIDE — Personality & Writing Profile

#### 1. Voice and Tone

- **Authoritative yet approachable**: The author writes with the confidence of a domain expert but never talks down to
  the reader. There is an implicit assumption that the reader is a competent developer who can handle technical concepts
  but may be encountering Flama (or a given topic like DDD, JWT, pagination) for the first time.
- **Pedagogical and methodical**: Concepts are introduced in careful order, from the abstract ("What is X?") to the
  concrete ("Here's the code"). There is always a conceptual explanation _before_ any code. Code never appears without
  preceding prose that frames _why_ it exists.
- **Warm but professional**: Occasional light touches of enthusiasm ("This is a game-changer for extensibility") but
  never slangy or overly casual. No emojis in documentation prose (though 🔥 appears in code strings). The tone respects
  the reader's time.
- **Empowering**: Phrases like "you can leverage", "you're now ready to", "let's build" — the author positions the
  reader as an active participant, not a passive consumer.

#### 2. Document Structure (Mandatory Pattern)

Every documentation page follows this exact skeleton:

````
---
title: <Title>
wip: false
---

<Opening paragraph — 2-4 sentences contextualising the topic. No heading.
 References <FlamaName /> by name using the MDX component. Explains WHY this topic matters
 in the broader context of API development.>

## What is/are <concept>?

<Conceptual explanation. Definitions. No code yet.
 Often starts with "In <FlamaName />, a **<Concept>** is..." >

**Why is it/are they important?**

<Bulleted list of 3-6 reasons, each bolded with a keyword label, e.g.:>
- **Decoupling**: <explanation>
- **Modularity**: <explanation>
- **Testability**: <explanation>

<Concluding sentence: "The main virtue <Concept> bring(s) is **<bolded key benefit>**...">

## Building / Implementing <concept>

<Step-by-step guide with numbered or headed subsections.
 Introduces code incrementally. Each code block has preceding prose.>

### Step/Sub-concept 1
<prose>
```python
# code
````

<explanation of what the code does>

### Step/Sub-concept 2

...

## Utilising / Using <concept>

<How to wire it into a Flama application: registering, accessing, etc.>

## Example

<Self-contained, runnable example that ties together all concepts from the page. Usually the same code as the associated
test script in tests/documentation/. Code is shown in full, with inline comments.>

````

#### 3. Prose Style Details

- **British English spelling**: "organising", "initialising", "customising", "behaviour", "honour", "serialisation", "colour" — consistently British throughout.
- **Oxford comma**: Used consistently ("routes, components, and modules").
- **Present tense, active voice**: "Flama provides", "The injector resolves", "This pattern ensures". Passive voice is rare and only used for emphasis.
- **Sentence length**: Mix of short punchy sentences and longer compound sentences. Paragraphs are typically 2-5 sentences.
- **Emphasis patterns**:
  - **Bold** for key terms on first introduction (e.g., **Component**, **Repository**, **Worker**).
  - **Bold** for class/module names in prose (e.g., **`flama.Flama`**, **`SQLAlchemyModule`**).
  - `backticks` for inline code: class names, function names, parameter names, file names, paths, CLI commands.
  - *Italics* for terms being defined conceptually (e.g., *domain*, *model*, *business logic*).
- **Cross-references**: Frequent links to other documentation pages using relative paths (e.g., `[Components](/docs/fundamentals/components/)`). Also links to external resources (RFC documents, Cosmic Python, Real Python).
- **Recurring rhetorical devices**:
  - "Think of X as Y" — analogies to ground abstract concepts.
  - "Let's" — collaborative tone ("Let's start with", "Let's illustrate this").
  - "In what follows" — transitional phrase used to preview upcoming content.
  - Direct address: "you", "your application", "your route handlers".

#### 4. Code Style

- **Python code blocks**: Always annotated with ` ```python `. Console/terminal blocks use ` ```console `.
- **Comments in code**: Sparingly used, mostly for clarifying non-obvious lines. Not every line is commented. Comments are terse and informative.
- **File path annotations**: Code blocks often start with a comment indicating the file path (e.g., `# src/app.py`).
- **Imports**: Always shown explicitly at the top of each code block. Imports are grouped: stdlib → third-party → flama → local.
- **Type hints**: Used throughout (especially `typing.Annotated`, `types.Schema[...]`, `types.SchemaMetadata(...)`). The modern annotation style is preferred.
- **Docstrings in route handlers**: YAML-formatted OpenAPI docstrings inside triple-quote strings, with `tags`, `summary`, `description`, `responses` fields. This is a Flama convention and must be shown consistently.
- **App instantiation pattern**: Always shows the full `Flama(...)` constructor with relevant parameters. Uses keyword arguments.
- **Running examples**: Each page ends with `if __name__ == "__main__": flama.run(...)` or equivalent.
- **Updated API conventions** (critical for DDD section):
  - Use `ResourceRoute.method(...)` decorator, NOT the deprecated `resource_method(...)`.
  - Import from `flama.resources.routing import ResourceRoute`.
  - Workers are defined by annotating repositories as class attributes: `user: UserRepository`.
  - `WorkerComponent(worker=RegisterWorker())` for DI registration.

#### 5. MDX Components Used

- `<FlamaName />` — renders the Flama brand name (used instead of raw "Flama" in prose).
- `<Label color="green">GET</Label>`, `<Label color="blue">POST</Label>`, `<Label color="orange">PUT</Label>`, `<Label color="red">DELETE</Label>` — coloured HTTP method badges.
- Standard Markdown: headings (`##`, `###`, `######`), bullet lists, numbered lists, bold, italic, inline code, fenced code blocks, blockquotes.
- Images referenced via `/images/blog/...` paths.

#### 6. Frontmatter

```yaml
---
title: <Page Title>
wip: false
---
````

Always exactly these two fields. `wip: false` for published pages.

#### 7. Authorial Personality Traits

- **Systematic thinker**: Never jumps to code without context. Builds understanding layer by layer: concept → mechanics
  → code → integration → full example.
- **Detail-oriented**: Explains not just _what_ but _how_ and _why_. For instance, doesn't just say "use
  WorkerComponent" — explains that it uses `can_handle_parameter()` to match by class identity.
- **Practical and hands-on**: Every concept is grounded in a runnable example. Theory never exists in isolation.
- **Self-consistent**: Terminology is used consistently across pages. "Worker" always means Unit of Work. "Repository"
  always means the data-access abstraction. Cross-references tie the documentation into a coherent whole.
- **Narrative arc within pages**: Each page tells a story — from motivation ("why do we need this?") through
  implementation ("how do we build it?") to payoff ("here's the full working example").
- **Narrative arc across sections**: Pages within a section build on each other. Early pages introduce simple concepts;
  later pages compose them into sophisticated patterns.
- **References and attribution**: Credits external sources (Cosmic Python, Eric Evans, RFC documents, Tim Peters
  quotes). Provides URLs. Positions Flama within the broader Python ecosystem.
- **Production-awareness**: Examples are realistic, not toy. Password hashing, database migrations, error responses,
  HTTP status codes — these are production patterns, not hello-world.

#### 8. Anti-Patterns (Things the Author Does NOT Do)

- Never uses "simply" or "just" to minimise complexity.
- Never dumps a wall of code without prior explanation.
- Never uses emojis in documentation prose.
- Never uses first-person singular ("I") — always "we" or direct address ("you").
- Never leaves code unexplained or without context.
- Never uses abbreviations without first defining them (DDD, JWT, CRUD, ASGI, etc.).
- Never hand-waves past error handling — shows proper HTTP status codes and error responses.
- Never mixes British and American spelling.

--- Always exactly these two fields. `wip: false` for published pages.

#### 7. Authorial Personality Traits

- **Systematic thinker**: Never jumps to code without context. Builds understanding layer by layer: concept → mechanics
  → code → integration → full example.
- **Detail-oriented**: Explains not just _what_ but _how_ and _why_. For instance, doesn't just say "use
  WorkerComponent" — explains that it uses `can_handle_parameter()` to match by class identity.
- **Practical and hands-on**: Every concept is grounded in a runnable example. Theory never exists in isolation.
- **Self-consistent**: Terminology is used consistently across pages. "Worker" always means Unit of Work. "Repository"
  always means the data-access abstraction. Cross-references tie the documentation into a coherent whole.
- **Narrative arc within pages**: Each page tells a story — from motivation ("why do we need this?") through
  implementation ("how do we build it?") to payoff ("here's the full working example").
- **Narrative arc across sections**: Pages within a section build on each other. Early pages introduce simple concepts;
  later pages compose them into sophisticated patterns.
- **References and attribution**: Credits external sources (Cosmic Python, Eric Evans, RFC documents, Tim Peters
  quotes). Provides URLs. Positions Flama within the broader Python ecosystem.
- **Production-awareness**: Examples are realistic, not toy. Password hashing, database migrations, error responses,
  HTTP status codes — these are production patterns, not hello-world.

#### 8. Anti-Patterns (Things the Author Does NOT Do)

- Never uses "simply" or "just" to minimise complexity.
- Never dumps a wall of code without prior explanation.
- Never uses emojis in documentation prose.
- Never uses first-person singular ("I") — always "we" or direct address ("you").
- Never leaves code unexplained or without context.
- Never uses abbreviations without first defining them (DDD, JWT, CRUD, ASGI, etc.).
- Never hand-waves past error handling — shows proper HTTP status codes and error responses.
- Never mixes British and American spelling.
