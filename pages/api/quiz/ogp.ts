import * as path from 'path'
import { createCanvas, registerFont, loadImage } from 'canvas'
import { fillTextWithTwemoji } from 'node-canvas-with-twemoji'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  try {
    registerFont(path.resolve('./src/ogp/NotoSansJP-Bold.otf'), {
      family: 'NotoSansJP-Bold',
    })
    const width = 1200
    const height = 630
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    const test = await loadImage(path.resolve('./src/ogp/ogpBase.jpg'))
    context.drawImage(test, 0, 0, 1200, 630)

    let title = req.query.title as string
    if (req.query.title.length > 17) {
      title = title.substr(0, 16) + '…'
    }
    context.font = '65px NotoSansJP-Bold'
    context.fillStyle = '#000000'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    await fillTextWithTwemoji(context, title, 1200 / 2, 330)

    let description = req.query.description as string
    if (req.query.description.length > 34) {
      description = description.substr(0, 33) + '…'
    }
    context.font = '32px NotoSansJP-Bold'
    context.fillStyle = '#808080'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    await fillTextWithTwemoji(context, description, 1200 / 2, 415)

    const buffer = canvas.toBuffer()

    res.writeHead(200, {
      'Cache-Control': 'public, max-age=86400, s_maxage=86400',
      Expires: new Date(Date.now() + 86400).toUTCString(),
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    })
    res.end(buffer, 'binary')
  } catch (error) {
    res.status(500).end()
  }
}

export default handler
