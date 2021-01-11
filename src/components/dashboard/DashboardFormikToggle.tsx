import { PageFormToggle } from '@components/ui'
import { Field, FieldAttributes } from 'formik'
import React from 'react'

type Props = {
  title: string
  name: string
  defaultChecked: boolean
  error?: string
  style?: React.CSSProperties
}

export const DashboardFormikToggle: React.FunctionComponent<
  Props | FieldAttributes<any>
> = (props) => {
  return (
    <label className="DashboardFormikToggle">
      <h3 className="DashboardFormikToggle_title">{props.title}</h3>

      <Field
        name={props.name}
        as={PageFormToggle}
        defaultChecked={props.defaultChecked}
      />
      <style jsx>
        {`
          .DashboardFormikToggle {
            display: grid;
            grid-template-columns: 1fr 50px;
            gap: 30px;
            margin-top: 30px;
            align-items: center;
            &_title {
              font-size: 1rem;
              margin: 0;
            }
          }
        `}
      </style>
    </label>
  )
}
