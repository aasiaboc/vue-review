import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoApp from './../../App.vue'

describe('TodoApp.vue (DOM test)', () => {
   it('adds a task when user types and clicks add button', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input')
    await input.setValue('Buy milk')

    const addButton = wrapper.findComponent({ name: 'IconButton' })
    await addButton.trigger('click')

    expect(wrapper.text()).toContain('Buy milk')
  })

  it('deletes a task when delete button is clicked', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input')
    await input.setValue('Buy milk')

    const addButton = wrapper.findComponent({ name: 'IconButton' })
    await addButton.trigger('click')

    const deleteButton = wrapper.find('[data-icon="trash-can"]')
    await deleteButton.trigger('click')

    expect(wrapper.text()).not.toContain('Buy milk')
  })

  it('toggles task as complete/incomplete when icon is clicked', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input')
    await input.setValue('Buy milk')

    const addButton = wrapper.findComponent({ name: 'IconButton' })
    await addButton.trigger('click')

    const toggleIcon = wrapper.find('[data-icon="square"]')
    await toggleIcon.trigger('click')

    expect(wrapper.find('p.done').exists()).toBe(true)

    await toggleIcon.trigger('click')
    expect(wrapper.find('p.done').exists()).toBe(false)
  })

  it('edits a task name through prompt', async () => {
    window.prompt = vi.fn().mockReturnValue('Buy bread')

    const wrapper = mount(TodoApp)
    const input = wrapper.find('input')
    await input.setValue('Buy milk')

    const addButton = wrapper.findComponent({ name: 'IconButton' })
    await addButton.trigger('click')

    const editIcon = wrapper.find('[data-icon="pencil"]')
    await editIcon.trigger('click')

    expect(wrapper.text()).toContain('Buy bread')
  })

  it('filters tasks properly (pending/completed/all)', async () => {
    const wrapper = mount(TodoApp)
    const input = wrapper.find('input')

    await input.setValue('Task 1')
    await wrapper.findComponent({ name: 'IconButton' }).trigger('click')
    await input.setValue('Task 2')
    await wrapper.findComponent({ name: 'IconButton' }).trigger('click')

    // Mark Task 2 as complete
    const toggleIcons = wrapper.findAll('[data-icon="square"]')
    await toggleIcons[1].trigger('click')

    const select = wrapper.find('select')
    await select.setValue('pending')
    expect(wrapper.text()).toContain('Task 1')
    expect(wrapper.text()).not.toContain('Task 2')

    await select.setValue('completed')
    expect(wrapper.text()).not.toContain('Task 1')
    expect(wrapper.text()).toContain('Task 2')

    await select.setValue('all')
    expect(wrapper.text()).toContain('Task 1')
    expect(wrapper.text()).toContain('Task 2')
  })
})

