import { validateEmail as _validateEmail } from './main'

export const validateEmail: typeof _validateEmail = (
  { localDev, ...rest } = {},
  ...args
) => {
  return _validateEmail(
    {
      ...rest,
      localDev: localDev ?? true,
    },
    ...args,
  )
}
