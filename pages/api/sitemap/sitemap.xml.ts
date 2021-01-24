import '@lib/firebase-admin'
import admin from 'firebase-admin'

import { NextApiHandler } from 'next'

import { getDomain } from '@lib/api'

const handler: NextApiHandler = async (req, res) => {
  try {
    const quizRef = await admin
      .firestore()
      .collection('quiz')
      .where('currentStatus', '==', 'archive')
      .where('permission.playagain', '==', true)
      .where('playagain.isPlayagain', '==', false)
      .get()
    const topicsRef = await admin.firestore().collection('topic').get()

    const urls = []
    await Promise.all(
      topicsRef.docs.map((doc) => {
        urls.push({
          loc: `${getDomain()}/topic/${doc.id}`,
          lastmod: doc.data().startAt,
          changefreq: 'daily',
          priority: 0.5,
        })
      })
    )
    await Promise.all(
      quizRef.docs.map((doc) => {
        urls.push({
          loc: `${getDomain()}/quiz/${doc.id}`,
          lastmod: doc.data().createdAt,
          changefreq: 'weekly',
        })
      })
    )

    let sitemapUrl = ''
    urls.map((data) => {
      sitemapUrl =
        sitemapUrl +
        `<url>
      <loc>${data.loc}</loc>
      ${
        data.lastmod
          ? `<lastmod>${new Date(
              data.lastmod.seconds * 1000
            ).toISOString()}</lastmod>`
          : ''
      }
      ${data.changefreq ? `<changefreq>${data.changefreq}</changefreq>` : ''}
      ${data.priority ? `<priority>${data.priority}</priority>` : ''}
    </url>`
    })

    const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapUrl}
      </urlset>
    `

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/xml')
    res.end(sitemap)
  } catch (error) {
    res.status(500).end()
  }
}

export default handler
