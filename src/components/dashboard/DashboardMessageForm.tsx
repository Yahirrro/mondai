import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import {
  DashboardFormikField,
  DashboardMessagePercent,
} from '@components/dashboard'
import { PageButton } from '@components/ui'
import { fuego, useCollection } from '@nandorojo/swr-firestore'
import { toast } from 'react-toastify'
import { useDashboardQuizUI } from '@hook/dashboard'
import { useRouter } from 'next/router'
import { MessageModel } from '@models'

type Props = {
  style?: React.CSSProperties
}

export const DashboardMessageForm: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const [formData, setFormData] = useState({
    percent: dashboardQuizUI.optional?.messagePercent,
    message: dashboardQuizUI.optional?.messageData?.message
      ? dashboardQuizUI.optional?.messageData?.message
      : '',
  })
  useEffect(() => {
    setFormData({
      percent: dashboardQuizUI.optional?.messagePercent,
      message: dashboardQuizUI.optional?.messageData?.message
        ? dashboardQuizUI.optional?.messageData?.message
        : '',
    })
  }, [
    dashboardQuizUI.optional?.messageData,
    dashboardQuizUI.optional?.messagePercent,
  ])

  const removeMessage = async () => {
    if (window.confirm('このメッセージを本当に削除しますか?')) {
      try {
        await fuego.db
          .doc(
            `/quiz/${router.query.quizId}/message/${dashboardQuizUI.optional?.messageData?.id}`
          )
          .delete()
        setFormData({
          percent: dashboardQuizUI.optional?.messagePercent,
          message: '',
        })
        toast.success('😃メッセージを削除できました!')
      } catch (error) {
        console.error(error)
        toast.error('😥メッセージの削除に失敗しました')
      }
    }
  }

  const submitMessage = async (
    value,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      if (value.percent == null) {
        toast.error('😥メッセージのパーセント値がありません')
        return
      }
      if (dashboardQuizUI.optional?.messageData?.id) {
        await fuego.db
          .doc(
            `/quiz/${router.query.quizId}/message/${dashboardQuizUI.optional?.messageData?.id}`
          )
          .update({
            message: value.message,
          })
        setStatus({ success: true })
        toast.success('😆メッセージを更新できました!')
      } else {
        await fuego.db.collection(`/quiz/${router.query.quizId}/message`).add({
          percent: dashboardQuizUI.optional?.messagePercent,
          message: value.message,
        })
        toast.success('😆メッセージを追加できました!')
      }
    } catch (error) {
      console.error(error)
      toast.error('😥なにかエラーが発生しました...')
    }
  }

  return (
    <main className="DashboardQuizFormMessage" style={props.style}>
      <div className="DashboardQuizFormMessage_title">
        <DashboardMessagePercent
          selected={true}
          clear={true}
          percent={dashboardQuizUI.optional?.messagePercent * 100}
        />
        <h2>
          {dashboardQuizUI.optional?.messagePercent * 100}
          %以上の正解率に表示するメッセージ
        </h2>
      </div>
      <Formik
        enableReinitialize
        initialValues={formData}
        onSubmit={submitMessage}>
        {({ values }) => (
          <Form>
            <DashboardFormikField
              title="メッセージ"
              description="ここにめっせーじいれてみて！"
              placeholder="たとえば：こんなに正解できたの！？すごい！"
              name="message"
              required
              style={{
                marginTop: '30px',
                marginBottom: '40px',
              }}></DashboardFormikField>
            <PageButton
              style={{
                width: '100%',
                backgroundColor: 'var(--mainPrimaryColor)',
                color: 'white',
              }}
              buttontype="big"
              type="submit">
              {dashboardQuizUI.optional?.messageData?.id
                ? '更新する'
                : '追加する'}
            </PageButton>
          </Form>
        )}
      </Formik>
      {dashboardQuizUI.optional?.messageData?.id && (
        <div style={{ marginTop: '30px', textAlign: 'right', width: '100%' }}>
          <a
            style={{
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: 'red',
              opacity: 0.6,
            }}
            onClick={removeMessage}>
            このクイズを削除する
          </a>
        </div>
      )}
      <style jsx>
        {`
          .DashboardQuizFormMessage {
            margin-top: 40px;
            padding: 30px;
            background-color: white;
            border-radius: 30px;
            &_title {
              display: grid;
              grid-template-columns: 82px 1fr;
              gap: 20px;
              color: var(--mainPrimaryColor);
              h2 {
                align-self: center;
                margin: 0;
              }
            }
          }
        `}
      </style>
    </main>
  )
}
