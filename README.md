# k5-ghl-utils

## Usage

### Email Validation

Checks, if an email entered in a form is already registered.

Add the following code snippet in your form you want to use:

```html
<script type="module">
  import { validateEmail } from 'https://k5-leitertraining.github.io/k5-ghl-utils/k5-ghl-utils.js'

  validateEmail({
    errorMessage:
      'Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.',
    courseId: 'generalCourseParticipantOrCommunityMember',
  })
</script>
```

### Group Name Validation

Checks, if a group name is correctly matching an organization name

Add the following code snippet in your form you want to use:

```html
<script type="module">
  import { validateGroupName } from 'https://k5-leitertraining.github.io/k5-ghl-utils/k5-ghl-utils.js'

  validateGroupName({
    errorMessage: 'Der eingegebene Gruppenname ist nicht korrekt.',
    orgNameSelector: {
      query:
        '.multiselect__tags:has([name="G6SvkDtrlHDJKHY2jY5m"]) .multiselect__single',
      getValue: (el) => el.textContent,
    },
    groupNameSelector: {
      query: '[name="8WaTK0Z4tr7KRp72mHZz"]',
    },
  })
</script>
```

### Redirect After Form Submission

Listens for a form submission, waits for the ghl contact of the entered e-mail to have a `contact.redirect_url` attribute and then redirects to that url.

Add the following code snippet in your form you want to use:

```html
<script type="module">
  import { redirectAfterFormSubmission } from 'https://k5-leitertraining.github.io/k5-ghl-utils/k5-ghl-utils.js'

  redirectAfterFormSubmission({})
</script>
```

# Contribution

## Setup

```bash
pnpm i
```

## Develop

```bash
pnpm run dev
```

add the following code snippet in your form you want to test:

```html
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module">
  import { validateEmail } from 'http://localhost:5173/src/main.dev.ts'

  validateEmail({
    errorMessage:
      'Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.',
    courseId: 'generalCourseParticipantOrCommunityMember',
  })
</script>
```

```html
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module">
  import { validateGroupName } from 'http://localhost:5173/src/main.dev.ts'

  validateGroupName({
    errorMessage: 'Der eingegebene Gruppenname ist nicht korrekt.',
    orgNameSelector: {
      query:
        '.multiselect__tags:has([name="G6SvkDtrlHDJKHY2jY5m"]) .multiselect__single',
      getValue: (el) => el.textContent,
    },
    groupNameSelector: {
      query: '[name="8WaTK0Z4tr7KRp72mHZz"]',
    },
  })
</script>
```

```html
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module">
  import { redirectAfterFormSubmission } from 'http://localhost:5173/src/main.dev.ts'

  redirectAfterFormSubmission({})
</script>
```

## Build

```bash
pnpm run build
```
