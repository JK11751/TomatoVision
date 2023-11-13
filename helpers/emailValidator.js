export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email is required."
    if (!re.test(email)) return 'Enter a valid email address.'
    return ''
  }