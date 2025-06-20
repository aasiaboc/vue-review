import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ListContainer from '../ListContainer.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


describe('ListContainer.vue', () => {
  const sampleTasks = [
    { name: 'Buy milk', done: false },
    { name: 'Walk dog', done: true },
  ]

  it('renders the correct number of tasks', () => {
    const wrapper = mount(ListContainer, {
      props: { tasks: sampleTasks },
        global: {
            stubs: {
            FontAwesomeIcon: true
            }
        }
    })

    const rows = wrapper.findAll('.rowContainer')
    expect(rows.length).toBe(2)
  })

  it('applies line-through for done tasks', () => {
    const wrapper = mount(ListContainer, {
      props: { tasks: sampleTasks },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    const taskTexts = wrapper.findAll('p')
    expect(taskTexts[0].classes('done')).toBe(false)
    expect(taskTexts[1].classes('done')).toBe(true)
  })

  it('emits "toggle" when checkbox icon is clicked', async () => {
    const wrapper = mount(ListContainer, {
      props: { tasks: sampleTasks },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    const toggleIcon = wrapper.findAllComponents(FontAwesomeIcon)[0]
    await toggleIcon.trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')[0][0]).toEqual(sampleTasks[0])
  })

  it('emits "edit" when pencil icon is clicked', async () => {
    const wrapper = mount(ListContainer, {
      props: { tasks: sampleTasks },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    const icons = wrapper.findAllComponents(FontAwesomeIcon) 
    const editIcon = icons[1]
    
    await editIcon.trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')[0][0]).toEqual(sampleTasks[0])
  })

  it('emits "delete" when trash icon is clicked', async () => {
    const wrapper = mount(ListContainer, {
      props: { tasks: sampleTasks },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    const deleteIcon = wrapper.findAllComponents(FontAwesomeIcon)[2]
    await deleteIcon.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0][0]).toEqual(sampleTasks[0])
  })
})
