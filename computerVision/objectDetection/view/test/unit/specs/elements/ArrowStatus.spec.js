import { mount } from '@vue/test-utils'
import ArrowStatus from '@/components/elements/ArrowStatus.vue'

describe('ArrowStatus.vue', () => {
  test('is a Vue instance', () => {
    let wrapper = mount(ArrowStatus)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Set a title', () => {
    let wrapper = mount(ArrowStatus, {
      propsData: {
        title: 'Test title'
      }
    })

    expect(wrapper.find('.title').text()).toMatch('Test title')
  })

  test('Set a caption', () => {
    let wrapper = mount(ArrowStatus)

    expect(wrapper.find('.caption').text()).toBe('')

    wrapper.setProps({
      caption: 'Test caption'
    })

    expect(wrapper.find('.caption').text()).toMatch('Test caption')
  })

  test('Set a value', () => {
    let wrapper = mount(ArrowStatus)

    // Default value
    expect(wrapper.find('.value').text()).toBe('0')

    wrapper.setProps({
      value: '9 999'
    })

    expect(wrapper.find('.value').text()).toMatch('9 999')
  })

  test('Set a subvalue', () => {
    let wrapper = mount(ArrowStatus)

    // Default value
    expect(wrapper.find('.subValue').text()).toBe('')

    wrapper.setProps({
      subValue: 'TON'
    })

    expect(wrapper.find('.subValue').text()).toMatch('TON')
  })

  test('Set a progress value', () => {
    let wrapper = mount(ArrowStatus)

    // Default value
    expect(wrapper.find('.progress').text()).toBe('0%')

    wrapper.setProps({
      progress: '3%'
    })

    // Add + if positive
    expect(wrapper.find('.progress').text()).toMatch('+3%')

    wrapper.setProps({
      progress: '-17%'
    })

    // Keep - if negative
    expect(wrapper.find('.progress').text()).toMatch('-17%')
  })
})
