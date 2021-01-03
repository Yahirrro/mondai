import { QuizModel } from '@models'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { DashboardFormikField, PageButton, QuizIconEmoji } from '@components/ui'
import { useDocument } from '@nandorojo/swr-firestore'
import OutsideClickHandler from 'react-outside-click-handler'

import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'

type Props = {
  quizId: string
}

export const DashboardQuizFormEditDetail: React.FunctionComponent<Props> = (
  props
) => {
  const [emoji, setEmoji] = useState<string>(null)
  const [useEmojiPicker, setUseEmojiPicker] = useState<boolean>(false)

  const { data: quiz, update: updateQuiz } = useDocument<QuizModel>(
    props.quizId ? `quiz/${props.quizId}` : null,
    {
      listen: true,
    }
  )
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={quiz}
        onSubmit={async (value: QuizModel) => {
          console.log({
            title: value.title,
            description: value.description,
            emoji: emoji ? emoji : value.emoji,
          })
          updateQuiz({
            title: value.title,
            description: value.description,
            emoji: emoji ? emoji : value.emoji,
          })
        }}>
        {({ values }) => (
          <Form style={{ width: '100%' }}>
            <label className="DashboardQuizFormEditDetail_emoji">
              <h3 className="DashboardQuizFormEditDetail_emojiTitle">
                えもじアイコンをえらぶ
              </h3>
              <button
                className="DashboardQuizFormEditDetail_emojiIndex"
                type="button"
                onClick={() => setUseEmojiPicker(true)}>
                <QuizIconEmoji emoji={emoji ? emoji : values.emoji} />
              </button>
              {useEmojiPicker && (
                <div className="DashboardQuizFormEditDetail_emojiPickerWrap">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setUseEmojiPicker(false)
                    }}>
                    <Picker
                      title="アイコン絵文字をえらぼう!"
                      onSelect={(emoji: BaseEmoji) => {
                        setEmoji(emoji.native)
                      }}
                      native
                      showPreview={false}
                      showSkinTones={false}
                    />
                  </OutsideClickHandler>
                </div>
              )}
              <style jsx>
                {`
                  .DashboardQuizFormEditDetail {
                    &_emoji {
                      position: relative;
                      display: grid;
                      gap: 0 20px;
                      grid-template-columns: 64px 1fr;
                      margin-bottom: 30px;
                    }
                    &_emojiTitle {
                      font-size: 1rem;
                      order: 1;
                    }
                    &_emojiIndex {
                      order: 0;
                      width: 64px;
                      height: 64px;
                      outline: none;
                      padding: 0;
                      margin: 0;
                      border: none;
                      background: none;
                    }
                    &_emojiPickerWrap {
                      order: 2;
                      grid-column: 1/3;
                    }
                  }
                  :global(.emoji-mart) {
                    position: absolute;
                    top: 64px;
                    left: 0;
                    z-index: 100;
                    @media (max-width: 550px) {
                      position: relative;
                      top: initial;
                      width: 100% !important;
                    }
                  }
                `}
              </style>
            </label>

            <DashboardFormikField
              title="👶クイズのタイトル"
              description="このクイズをひとことであらわすなら?"
              name="title"
              placeholder="たとえば: わかるかな? VTuberクイズ!"
              required
            />
            <DashboardFormikField
              title="🙌クイズの説明文"
              description="説明文だよ！ちょっとだけかいてね！"
              name="description"
              placeholder="たとえば: わかるひとにはわかる! とくべつな問題をチョイス!"
              required
            />
            {/* <DashboardFormikField
              title="🖼クイズのアイコン絵文字"
              description="なくてもいいよ! 好きなアイコンを指定しよう！"
              name="icon"
              type="url"
              placeholder="たとえば: https://yahiro.me/yahiro.png"
            /> */}

            <PageButton
              type="submit"
              buttontype="big"
              style={{
                marginTop: 'var(--mainNormalPaddingSize)',
                width: '100%',
                color: 'white',
                backgroundColor: 'var(--mainPrimaryColor)',
              }}>
              更新する
            </PageButton>
          </Form>
        )}
      </Formik>
    </>
  )
}
