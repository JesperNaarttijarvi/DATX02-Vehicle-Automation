import devMode from '@/devMode'

test('Disable dev mode', () => {
  expect(devMode.dev).toBe(false)
})

test('Disable localServer mode', () => {
  expect(devMode.localServer).toBe(false)
})
