import { useState } from 'react'
import { QuizIconEmoji } from '@components/ui'
import OutsideClickHandler from 'react-outside-click-handler'
import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'

type Props = {
  emoji: string
  setEmoji: (value: React.SetStateAction<string>) => void
}

export const DashboardQuizEmojiPicker: React.FunctionComponent<Props> = (
  props
) => {
  const [useEmojiPicker, setUseEmojiPicker] = useState<boolean>(false)
  return (
    <label className="DashboardQuizEmojiPicker">
      <h3 className="DashboardQuizEmojiPicker_title">えもじアイコンをえらぶ</h3>
      <button
        className="DashboardQuizEmojiPicker_emoji"
        type="button"
        onClick={() => setUseEmojiPicker(true)}>
        <QuizIconEmoji emoji={props.emoji} />
      </button>
      {useEmojiPicker && (
        <div className="DashboardQuizEmojiPicker_emojiPickerWrap">
          <OutsideClickHandler
            onOutsideClick={() => {
              setUseEmojiPicker(false)
            }}>
            <Picker
              title="アイコン絵文字をえらぼう!"
              onSelect={(emoji: BaseEmoji) => {
                props.setEmoji(emoji.native)
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
          .DashboardQuizEmojiPicker {
            cursor: pointer;
            position: relative;
            display: grid;
            gap: 0 20px;
            grid-template-columns: 64px 1fr;
            margin-bottom: 30px;
            &_title {
              font-size: 1rem;
              order: 1;
            }
            &_emoji {
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
  )
}
