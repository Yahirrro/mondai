import AdSense from 'react-adsense'

type Props = {
  type: 'normal' | 'quiz'
  style?: React.CSSProperties
  adstyle?: React.CSSProperties
}

export const PageAd: React.FunctionComponent<Props> = (props) => {
  const slot = {
    normal: '8354252102',
    quiz: '9934077026',
  }

  return (
    <figure className="PageAd" style={props.style}>
      <AdSense.Google
        client="ca-pub-6248776021404303"
        slot={slot[props.type]}
        style={props.adstyle}
      />
      <style jsx>
        {`
          .PageAd {
            text-align: center;
            margin: var(--mainNormalPaddingSize) 0;
          }
        `}
      </style>
    </figure>
  )
}
