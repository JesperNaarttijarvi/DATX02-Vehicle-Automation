import { mount } from '@vue/test-utils'
import ProgressBar from '@/components/elements/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProgressBar)
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Sets a caption', () => {
    wrapper.setProps({
      caption: 'Test caption'
    })

    expect(wrapper.find('.caption').text()).toMatch('Test caption')
  })

  test('Displays percentage', () => {
    wrapper.setProps({
      percentage: 52
    })

    expect(wrapper.find('.label').text()).toMatch('52%')
  })

  test('Renders wave', () => {
    wrapper.setProps({
      mean: '9000',
      percentage: 20
    })

    expect(wrapper.text()).toContain('9000')
  })
})
