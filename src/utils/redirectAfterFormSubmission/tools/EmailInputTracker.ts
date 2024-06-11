export class EmailInputTracker {
  private email = ''

  trackEmailInput() {
    document
      .querySelector('input[type="email"]')
      ?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        this.email = target.value
      })
  }

  getEmail() {
    return this.email
  }
}
