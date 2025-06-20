import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconButton from '../IconButton.vue'

describe('IconButton.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(IconButton, {
      props: {
        icon: 'plus'
      }
    })

    const button = wrapper.find('button')
    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' })

    expect(button.exists()).toBe(true)
    expect(icon.exists()).toBe(true)

    const buttonStyle = getComputedStyle(button.element)
    const iconStyle = getComputedStyle(icon.element)

    expect(buttonStyle.backgroundColor).toBe('rgb(0, 0, 0)') 
    expect(iconStyle.color).toBe('rgb(255, 255, 255)')
  })

  it('renders with custom colors', () => {
    const wrapper = mount(IconButton, {
      props: {
        icon: 'plus',
        buttonColor: '#123456',
        iconColor: '#abcdef'
      }
    })

    const button = wrapper.find('button')
    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' })

    const buttonStyle = getComputedStyle(button.element)
    const iconStyle = getComputedStyle(icon.element)

    expect(buttonStyle.backgroundColor).toBe('rgb(18, 52, 86)')
    expect(iconStyle.color).toBe('rgb(171, 205, 239)')
  })

  it('emits a click event when clicked', async () => {
    const wrapper = mount(IconButton, {
      props: {
        icon: 'plus'
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })


})
