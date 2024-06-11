export const getRedirectUrl = async ({
  email,
  localDev = false,
}: {
  email: string
  localDev?: boolean
}) => {
  if (!email) return ''

  const host = localDev
    ? 'http://localhost:9999'
    : 'https://k5-leitertraining.de'
  const result = await fetch(
    `${host}/.netlify/functions/get-redirect-url?email=${email}`,
  ).then(
    (response) =>
      response.json() as Promise<{
        redirectUrl: string
      }>,
  )

  const redirectUrl = result.redirectUrl
  return redirectUrl
}
