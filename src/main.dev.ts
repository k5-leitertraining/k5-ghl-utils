import { validateEmail as _validateEmail } from './main'
import { validateGroupName as _validateGroupName } from './main'

const withLocalDev = <TFunction extends (...args: never[]) => unknown>(
  fn: TFunction,
): TFunction => {
  return ((...params) => {
    const [options, ...args] = params as unknown as [
      Record<string, unknown>,
      ...unknown[],
    ]
    return fn(
      {
        ...options,
        localDev: options.localDev ?? true,
      } as never,
      ...(args as never[]),
    )
  }) as TFunction
}

export const validateEmail = withLocalDev(_validateEmail)
export const validateGroupName = withLocalDev(_validateGroupName)
