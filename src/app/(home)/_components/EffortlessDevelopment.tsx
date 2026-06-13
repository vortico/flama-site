'use client'

import React, { useMemo, useState } from 'react'

import { IconBolt } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { FlamaName } from '@/components/names'

import HomeSection from './HomeSection'
import SelectableText from './SelectableText'

const samples = [
  {
    id: 'adaptable-schemas',
    title: 'Adaptable Schemas',
    description: (
      <>
        <p>
          There is a wide spectrum of data validation libraries for Python to combine data types into structures,
          validate them, and provide tools for serialisation of app-level objects to primitive Python types.
        </p>
        <br />
        <p>
          <FlamaName /> natively supports Pydantic, Typesystem, and Marshmallow, now split into optional packages so you
          install only what you need. These data-type validation libraries make possible the standardisation of the API
          via generation of OpenAPI schemas, and allow the user to define API schemas effortlessly.
        </p>
        <br />
        <p>
          <FlamaName /> Schema generator gathers all the API information needed directly from your code and infers the
          schema that represents your API based on OpenAPI standard. The schema will be also served at the route{' '}
          <code>/schema/</code> by default.
        </p>
      </>
    ),
  },
  {
    id: 'pagination',
    title: 'Pagination',
    description: (
      <>
        <p>
          Developing and maintaining pagination is a tedious task. <FlamaName /> provides a built-in mechanism to add
          pagination to your API responses without complications.
        </p>
        <br />
        <p>
          Add pagination to any API endpoint readily by adding a decorator to the endpoint function, and <FlamaName />{' '}
          will take the burden off you. The <code>@paginator</code> decorator will automatically include required
          parameters in the function signature, and turn the API response as paginated results.
        </p>
      </>
    ),
  },
  {
    id: 'resources',
    title: 'Resources',
    description: (
      <>
        <p>
          Any service ultimately requires the interaction with objects to perform operations on them, also known as
          resources. A resource can be a record of a table in a database, or even a machine learning model.
        </p>
        <br />
        <p>
          <FlamaName /> offers built-in Resource classes which make the definition of resources uncomplicated and
          general, which also allows the reduction of boilerplate code. If you want your API to follow the REST standard
          you can use <code>RESTResource</code> class, which comes with the standard CRUD methods. In case you require
          the interaction with ML models, <FlamaName /> brings the <code>ModelResource</code> class for representing the
          model and its methods, e.g. predict.
        </p>
      </>
    ),
  },
  {
    id: 'components',
    title: 'Components',
    description: (
      <>
        <p>
          As complexity grows, we tend to modularise our code, eventually yielding classes which collect data and
          methods encapsulating some desired functionality.
        </p>
        <br />
        <p>
          Using objects of our custom classes typically requires instantiation via parameter passing from the endpoint
          to the class constructor, besides manual management of the lifecycle of the object instantiated. This is one
          of the most challenging tasks when developing an app. <FlamaName /> provides a neat solution to this challenge
          with <code>Components</code>, which make possible to load objects on demand without pain and automatically
          resolving all the required inputs via dependency injection.
        </p>
        <br />
        <p>
          This is also how <FlamaName /> manages your models: they are loaded once on startup and injected wherever they
          are needed, so their lifecycle is handled for you and never leaks into your request handlers.
        </p>
      </>
    ),
  },
  {
    id: 'ddd',
    title: 'Domain-Driven Design',
    description: (
      <>
        <p>
          As an application grows, business logic tends to leak into routes and data access, blurring the line between
          what the business needs and how the code is structured. Domain-Driven Design keeps the domain at the centre,
          but wiring up its patterns by hand is repetitive and error-prone.
        </p>
        <br />
        <p>
          <FlamaName /> ships native, first-class support for DDD. Model your data, hide persistence behind a{' '}
          <code>Repository</code>, wrap atomic transactions in a <code>Worker</code> (the unit of work), and expose your
          business logic through a <code>Resource</code>. The SQLAlchemy and HTTP backends share the same interfaces, so
          your domain stays decoupled from storage and transport.
        </p>
      </>
    ),
  },
  {
    id: 'authentication',
    title: 'Authentication & Authorisation',
    description: (
      <>
        <p>
          Privatising endpoints, or whole APIs, is a common requirement, especially for ML APIs handling sensitive or
          proprietary data. Building that gatekeeping from scratch is tedious and easy to get wrong.
        </p>
        <br />
        <p>
          <FlamaName /> provides a native authentication system based on JSON Web Tokens (JWT). Register the{' '}
          <code>AccessTokenComponent</code> with your secret and the <code>AuthenticationMiddleware</code>, then protect
          any route by listing the permissions it requires in its <code>tags</code>. The decoded token is injected
          straight into your handlers through dependency injection, keeping route logic clean and secure.
        </p>
      </>
    ),
  },
  {
    id: 'streaming',
    title: 'Streaming responses',
    description: (
      <>
        <p>
          Some responses are best delivered as they are produced rather than buffered whole, e.g. a live feed of events
          or the tokens of a language model. <FlamaName /> is streaming-first to make this effortless.
        </p>
        <br />
        <p>
          Return a <code>ServerSentEventResponse</code> or an <code>NDJSONResponse</code> wrapping an async generator,
          and <FlamaName /> takes care of the rest, including named events, heartbeats, and <code>Last-Event-ID</code>{' '}
          based resumption, so clients see the first chunk immediately and memory stays bounded.
        </p>
      </>
    ),
  },
  {
    id: 'auto-doc',
    title: 'Auto-documentation & Auto-schema',
    description: (
      <>
        <p>
          Documenting code is a time consuming process which does not yield significant project value. In practice this
          means your documentation is outdated and not really useful to understand the functionality of your code.
        </p>
        <br />
        <p>
          Why waste your time creating documentation by yourself when <FlamaName /> can do it for you? Your APIs will be
          deployed auto-documented based on your doc-strings and your own <code>schemas</code>.
        </p>
      </>
    ),
  },
]

export default function EffortlessDevelopment() {
  const [selected, setSelected] = useState<string>(samples[0].id)

  const selectedSample = useMemo(() => samples.find(({ id }) => id === selected), [selected])

  return (
    <HomeSection
      id="effortless-development"
      icon={<IconBolt className="h-full w-full" />}
      title="Effortless Development"
      docRef="/docs/"
      body={
        <>
          <p>
            <FlamaName /> is designed to be quick to learn and use. This goal is accomplished with a simple and clear
            syntax, and a rich spectrum of built-in functionality, reducing boilerplating and development time.
          </p>
        </>
      }
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-start justify-start gap-y-10 lg:flex-row lg:justify-center"
      >
        <SelectableText items={samples} selected={selected} onSelect={setSelected} />
        <div className="h-full min-h-[16rem] w-full basis-full lg:basis-2/3">
          {selectedSample && selectedSample.description}
        </div>
      </motion.div>
    </HomeSection>
  )
}
