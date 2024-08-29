import { z } from 'zod'

const _CustomMenuItemSchema = z.object({
  label: z.string(),
  url: z.string(),
})

export type CustomMenuItem = z.infer<typeof _CustomMenuItemSchema> & {
  children?: CustomMenuItem[]
}

export const CustomMenuItemSchema: z.ZodType<CustomMenuItem> =
  _CustomMenuItemSchema.extend({
    children: z.lazy(() => z.array(CustomMenuItemSchema).optional()),
  })

export const CustomMenuItemsSchema = z.array(CustomMenuItemSchema)

export const getCustomMenuItems = async ({ localDev = false }) => {
  const host = localDev
    ? 'http://localhost:9999'
    : 'https://k5-leitertraining.de'
  const result = await fetch(
    `${host}/.netlify/functions/get-k5-navigation`,
  ).then((response) => response.json() as Promise<unknown>)
  const {
    success,
    data: items,
    error,
  } = CustomMenuItemsSchema.safeParse(result)

  if (!success) {
    console.error(error.message)
    return []
  }
  return items
}
