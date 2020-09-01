import React from 'react'
import { render } from 'react-dom'
import { Form, FormSpy, Field } from 'react-final-form'
import setFieldData from 'final-form-set-field-data'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const WarningEngine = ({ mutators: { setFieldData } }) => (
    <FormSpy
      subscription={{ values: true }}
      onChange={({ values }) => {
        setFieldData('firstName', {
          warning: values.firstName ? undefined : 'Recommended'
        })
        setFieldData('lastName', {
          warning: values.lastName ? undefined : 'Recommended'
        })
      }}
    />
  )

export const WarningForm = () => (
  <Form
    onSubmit={onSubmit}
    mutators={{ setFieldData }}
    render={({
               handleSubmit,
               reset,
               mutators,
               submitting,
               pristine,
               values
             }) => (
      <form onSubmit={handleSubmit}>
        <Field name="firstName">
          {({ input, meta }) => (
            <div>
              <label>First Name</label>
              <input {...input} placeholder="First Name" />
              {meta.touched && meta.data.warning && (
                <span>{meta.data.warning}</span>
              )}
            </div>
          )}
        </Field>
        <Field name="lastName">
          {({ input, meta }) => (
            <div>
              <label>Last Name</label>
              <input {...input} placeholder="Last Name" />
              {meta.touched && meta.data.warning && (
                <span>{meta.data.warning}</span>
              )}
            </div>
          )}
        </Field>
        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
        <pre>{JSON.stringify(values, 0, 2)}</pre>
        <WarningEngine mutators={mutators} />
      </form>
    )}
  />
);
