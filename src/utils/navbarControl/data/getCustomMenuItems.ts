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

export const getCustomMenuItems = async () => {
  const {
    data: items,
    success,
    error,
  } = await CustomMenuItemsSchema.safeParseAsync([
    {
      label: 'Kurse',
      url: 'https://neu.k5-leitertraining.de/#courses',
      children: [
        {
          label: '00 Einflussnehmerkurs',
          url: 'https://go.k5-leitertraining.de/einflussnehmerkurs-anmeldung',
        },
        {
          label: '01 Leiter-Werden-Kurs',
          url: 'https://go.k5-leitertraining.de/leiter-werden-kurs-info',
        },
        {
          label: '02 Gruppenleiterkurs',
          url: 'https://go.k5-leitertraining.de/gruppenleiterkurs-info',
        },
        {
          label: '03 Bereichsleiterkurs',
          url: 'https://go.k5-leitertraining.de/bereichsleiterkursseite',
        },
        {
          label: '04 Gesamtleiterkurs',
          url: 'https://go.k5-leitertraining.de/gesamtleiterkurs-info',
        },
        {
          label: 'Lerngruppen Info',
          url: 'https://go.k5-leitertraining.de/en-lerngruppen',
        },
        {
          label: 'K5 Gruppen verwalten',
          url: 'https://go.k5-leitertraining.de/en-gruppenanmeldungen-info',
        },
      ],
    },
    {
      label: 'Events',
      url: 'https://go.k5-leitertraining.de/konferenz24-home',
      children: [
        {
          label: 'Rewatch: K5 Next Steps Event',
          url: 'https://go.k5-leitertraining.de/k5-2024-next-steps-event',
        },
        {
          label: 'K5 Leiterkonferenz Wuppertal',
          url: 'https://go.k5-leitertraining.de/konferenz24-wuppertal',
        },
      ],
    },
    {
      label: 'Für Kirchen & Org.',
      url: 'https://go.k5-leitertraining.de/partner',
      children: [
        {
          label: 'Preise & Modelle',
          url: 'https://go.k5-leitertraining.de/k5-gruppen-preise',
        },
        {
          label: 'Gemeindel. & Pastorennetzwerk',
          url: 'https://go.k5-leitertraining.de/gemeindeleiternetzwerk',
        },
        {
          label: 'Entwickler Task Force',
          url: 'https://go.k5-leitertraining.de/entwicklung',
        },
        {
          label: 'Flexkurse (Coming 2025)',
          url: 'https://go.k5-leitertraining.de/flexkurse',
        },
        {
          label: 'Key Workshops (Coming 2025)',
          url: 'https://go.k5-leitertraining.de/workshops',
        },
        {
          label: '1% Coaching (Coming 2025)',
          url: 'https://go.k5-leitertraining.de/coaching',
        },
        {
          label: 'Jetzt Partner werden',
          url: 'https://go.k5-leitertraining.de/partnerkirche-org-anmeldung',
        },
      ],
    },
    {
      label: 'NEU: Leitertest',
      url: 'https://neu.k5-leitertraining.de/leitertest#/',
    },
    {
      label: 'Zur Kursplattform',
      url: 'https://onecommunity.mn.co/sign_in',
    },
  ])
  if (!success) {
    console.error(error.message)
    return []
  }
  return items
}
