import { NextSeo } from 'next-seo'

import ReactMarkdown from 'react-markdown'
import { ParsedUrlQuery } from 'querystring'
import path from 'path'
import fs from 'fs'

import matter from 'gray-matter'

import { PageContainer } from '@components/ui'
import { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
  params: ParsedUrlQuery
  markdown: {
    data: {
      title: string
      description?: string
    }
    content: string
  }
}

export default function Home(props: Props): React.ReactElement {
  return (
    <>
      <figure className="PageContent_wave">
        <svg
          width="1440"
          height="50"
          viewBox="0 0 1440 50"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50L80 37.4884C160 25.1643 320 -0.139996 480 0.000583377C640 -0.139996 800 25.1643 960 35.0049C1120 44.8454 1280 40.1594 1360 37.4884L1440 35.0049V50H1360C1280 50 1120 50 960 50C800 50 640 50 480 50C320 50 160 50 80 50H0Z" />
        </svg>
      </figure>

      <NextSeo
        title={props.markdown.data.title}
        description={props.markdown.data.description}
      />
      <PageContainer style={{ maxWidth: '800px' }}>
        <article className="PageContent">
          <h1 className="PageContent_title">{props.markdown.data.title}</h1>
          <ReactMarkdown skipHtml={true}>
            {props.markdown.content}
          </ReactMarkdown>
        </article>
      </PageContainer>
      <style jsx>
        {`
          .PageContent {
            word-break: break-all;
            &_title {
              font-size: 3rem;
            }
            &_wave {
              display: block;
              position: relative;
              background-color: var(--mainAccentColor);
              background-size: auto auto;
              background-image: var(--mainBackgroundPattern);
              width: 100%;
              height: 80px;
              margin: 0;
              svg {
                position: absolute;
                bottom: 0;
                width: 100%;
                fill: var(--mainBackgroundColor);
              }
            }
          }
        `}
      </style>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const getPath = fs
    .readdirSync(process.cwd() + '/src/docs/')
    .filter((file) => {
      return path.extname(file).toLowerCase() === '.md'
    })
    .map((file) => {
      return { params: { docId: file.replace('.md', '') } }
    })

  return {
    paths: getPath,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const markdown = JSON.parse(
    JSON.stringify(
      matter(
        fs.readFileSync(
          process.cwd() + '/src/docs/' + params.docId + '.md',
          'utf8'
        )
      )
    )
  )
  return {
    props: {
      params: params,
      markdown: markdown,
    },
  }
}
