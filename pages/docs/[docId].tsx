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
              margin-top: 0;
              font-size: 3rem;
              @media (max-width: 750px) {
                font-size: 2.5rem;
              }
            }
            :global(a) {
              color: var(--mainPrimaryColor);
              font-weight: bold;
            }
            :global(h2) {
              margin-top: 2.5rem;
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
