export const getDomain = (): string => {
  if (process.env.VERCEL_ENV == 'production') return 'https://mondai.page'
  else if (process.env.VERCEL_ENV == 'preview') return 'https://dev.mondai.page'
  return 'https://dev.mondai.page'
}
