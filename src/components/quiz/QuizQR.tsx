type Props = {
  url: string
  code: number
}

export const QuizQR: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuizQR">
        <h3 className="QuizQR_title">いますぐ参加しよう</h3>
        <div className="QuizQR_qr">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${props.url}&size=100x100`}
            alt="Quiz invite qr code"
          />
          <p>#{props.code}</p>
        </div>
        <style jsx>
          {`
            .QuizQR {
              text-align: center;
              &_title {
                display: inline-block;
                padding: 10px 15px;
                border-radius: 50px;
                background: var(--mainAccentColor);
                margin-top: 0;
                margin-bottom: 15px;
              }
              &_qr {
                display: block;
                width: fit-content;
                background-color: white;
                padding: 20px;
                border-radius: 20px;
                margin: auto;
                img {
                  width: 80px;
                  height: 80px;
                }
                p {
                  display: block;
                  margin-top: 5px;
                  margin-bottom: 0;
                  opacity: 0.3;
                  font-size: 20px;
                  line-height: 24px;
                  font-weight: bold;
                }
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
