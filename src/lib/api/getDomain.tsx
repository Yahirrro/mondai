export const getDomain = (): string => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV == 'production')
    return 'https://mondai.page'
  else if (process.env.NEXT_PUBLIC_VERCEL_ENV == 'preview')
    return 'https://dev.mondai.page'
  else return 'https://dev.mondai.page'
}
