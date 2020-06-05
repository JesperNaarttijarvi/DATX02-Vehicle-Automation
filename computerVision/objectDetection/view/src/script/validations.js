export const validID = val => /^(19|20)?[0-9]{6}[- ]?[0-9]{4}$/.test(val)
export const validPhone = val =>
  val.startsWith('+46') ||
  val.startsWith('+47') ||
  val.startsWith('+358') ||
  val.startsWith('+45') // TODO: hårdkodat

export const status = validation => ({
  error: validation.$error,
  dirty: validation.$dirty
})
