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

## Build

```bash
pnpm run build
```
