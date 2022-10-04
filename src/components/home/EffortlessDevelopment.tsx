import HomeSection from '@/components/home/HomeSection'
import { BoltIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useMemo, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import FlamaName from '@/components/FlamaName'

const samples = [
  {
    id: 'adaptable-schemas',
    title: 'Adaptable Schemas',
    description: (
      <>
        <p>
          There is a wide spectrum of data validation libraries for Python to
          combine data types into structures, validate them, and provide tools
          for serialisation of app-level objects to primitive Python types.
        </p>
        <br />
        <p>
          <FlamaName /> natively supports both Typesystem and Marshmallow, data
          type validation libraries which make possible the standardisation of
          the API via generation of OpenAPI schemas, and allow the user to
          define API schemas effortlessly.
        </p>
        <br />
        <p>
          <FlamaName /> Schema generator gathers all the API information needed
          directly from your code and infers the schema that represents your API
          based on OpenAPI standard. The schema will be also served at the route{' '}
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
          Developing and maintaining pagination is a tedious task. <FlamaName />{' '}
          provides a built-in mechanism to add pagination to your API responses
          without complications.
        </p>
        <br />
        <p>
          Add pagination to any API endpoint readily by adding a decorator to
          the endpoint function, and <FlamaName /> will take the burden off you.{' '}
          The <code>@paginator</code> decorator will automatically include
          required parameters in the function signature, and turn the API
          response as paginated results.
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
          Any service ultimately requires the interaction with objects to
          perform operations on them, also known as resources. A resource can be
          a record of a table in a database, or even a machine learning model.
        </p>
        <br />
        <p>
          <FlamaName /> offers built-in Resource classes which make the
          definition of resources uncomplicated and general, which also allows
          the reduction of boilerplate code. If you want your API to follow the
          REST standard you can use <code>RESTResource</code> class, which comes
          with the standard CRUD methods. In case you require the interaction
          with ML models, <FlamaName /> brings the <code>ModelResource</code>{' '}
          class for representing the model and its methods, e.g. predict.
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
          As complexity grows, we tend to modularise our code, eventually
          yielding classes which collect data and methods encapsulating some
          desired functionality.
        </p>
        <br />
        <p>
          Using objects of our custom classes typically requires instantiation
          via parameter passing from the endpoint to the class constructor,
          besides manual management of the lifecycle of the object instantiated.
          This is one of the most challenging tasks when developing an app.{' '}
          <FlamaName /> provides a neat solution to this challenge with{' '}
          <code>Components</code>, which make possible to load objects on demand
          without pain and automatically resolving all the required inputs via
          dependency injection.
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
          Documenting code is a time consuming process which does not yield
          significant project value. In practice this means your documentation
          is outdated and not really useful to understand the functionality of
          your code.
        </p>
        <br />
        <p>
          Why waste your time creating documentation by yourself when{' '}
          <FlamaName /> can do it for you? Your APIs will be deployed
          auto-documented based on your doc-strings and your own{' '}
          <code>schemas</code>.
        </p>
      </>
    ),
  },
]

export default function EffortlessDevelopment() {
  const [selected, setSelected] = useState<string>(samples[0].id)

  const onSelect = useCallback(
    (value: string) => () => setSelected(value),
    [setSelected]
  )

  const selectedSample = useMemo(
    () => samples.find(({ id }) => id === selected),
    [selected]
  )

  return (
    <HomeSection
      id="effortless-development"
      icon={<BoltIcon />}
      title="Effortless Development"
      docRef="/docs/"
      content={
        <>
          <p>
            <FlamaName /> is designed to be quick to learn and use. This goal is
            accomplished with a simple and clear syntax, and a rich spectrum of
            built-in functionality, reducing boilerplating and development time.
          </p>
        </>
      }
    >
      <div className="flex flex-col items-center justify-start gap-y-10 lg:flex-row lg:justify-center">
        <div className="h-full w-full basis-full space-y-6 pl-9 lg:basis-1/3">
          {samples.map(({ id, title }) => (
            <button
              key={id}
              className="flex items-center"
              onClick={onSelect(id)}
            >
              {selected === id && (
                <ChevronRightIcon className="-ml-7 inline h-7 text-brand-500" />
              )}
              <span
                className={`text-lg font-bold tracking-tight sm:text-xl ${
                  selected === id
                    ? 'text-primary-700 underline decoration-brand-500 decoration-2 underline-offset-8 dark:text-primary-200'
                    : 'text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200'
                }`}
              >
                {title}
              </span>
            </button>
          ))}
        </div>
        <div className="h-full w-full basis-full lg:basis-2/3">
          {selectedSample && selectedSample.description}
        </div>
      </div>
    </HomeSection>
  )
}
