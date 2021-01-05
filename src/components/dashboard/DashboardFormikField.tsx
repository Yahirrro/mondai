import { Field, FieldAttributes } from 'formik'
import React from 'react'
import { PageFormInput } from '@components/ui'

type Props = {
  title: string
  description: string
  error?: string
}

export const DashboardFormikField: React.FunctionComponent<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Props & FieldAttributes<any>
> = (props) => {
  return (
    <label className="DashboardFormikField">
      <h3 className="DashboardFormikField_title">{props.title}</h3>
      <Field {...props} as={PageFormInput} />
      <p className="DashboardFormikField_description">{props.description}</p>

      {props.error && (
        <p className="DashboardFormikField_error">{props.error}</p>
      )}
      <style jsx>
        {`
          .DashboardFormikField {
            width: 100%;
            font-weight: bold;
            display: block;
            &_title {
              font-size: 1rem;
              margin: 0;
            }
            :global(.PageFormInput) {
              margin-top: 10px;
            }
            &_description {
              margin-top: 6px;
              margin-bottom: 0;
              font-size: 0.9rem;
              font-weight: normal;
              opacity: 0.6;
            }
            &_error {
              color: rgba(255, 0, 0, 0.6);
              margin-top: 4px;
              margin-bottom: 0;
            }
            & + & {
              margin-top: 30px;
            }
          }
        `}
      </style>
    </label>
  )
}
