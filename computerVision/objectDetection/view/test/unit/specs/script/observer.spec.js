import observer from '@/components/script/observer'

beforeEach(() => {
  observer.listeners = {}
})

test('Add listener', () => {
  let foo = jest.fn()

  expect(observer.listeners).toEqual({})

  observer.listen('test', foo)

  expect(observer.listeners['test']).toHaveLength(1)

  expect(observer.listeners['test']).toContain(foo)
})

test('Remove listener', () => {
  let foo = jest.fn()

  observer.listen('test', foo)

  expect(observer.listeners['test']).toHaveLength(1)

  observer.removeListener('test', foo)

  expect(observer.listeners['test']).toHaveLength(0)
})

test('Trigger listener', () => {
  let foo = jest.fn()

  expect(foo).not.toBeCalled()

  observer.listen('test', foo)
  observer.emit('test')

  expect(foo).toBeCalled()
})

test('Add multiple listeners', () => {
  let fooA = jest.fn()
  let fooB = jest.fn()

  observer.listen('test', fooA)

  expect(observer.listeners['test']).toHaveLength(1)

  observer.listen('test', fooB)

  expect(observer.listeners['test']).toHaveLength(2)

  expect(fooA).not.toHaveBeenCalled()
  expect(fooB).not.toHaveBeenCalled()
})

test('Trigger multiple listeners', () => {
  let fooA = jest.fn()
  let fooB = jest.fn()

  observer.listen('test', fooA)
  observer.listen('test', fooB)
  observer.emit('test')

  expect(fooA).toHaveBeenCalledTimes(1)
  expect(fooB).toHaveBeenCalledTimes(1)
})

test('Should not trigger removed listeners', () => {
  let fooA = jest.fn()
  let fooB = jest.fn()

  observer.listen('test', fooA)
  observer.listen('test', fooB)
  observer.removeListener('test', fooB)
  observer.emit('test')

  expect(fooA).toHaveBeenCalledTimes(1)
  expect(fooB).toHaveBeenCalledTimes(0)
})
