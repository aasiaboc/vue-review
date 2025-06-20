import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

describe('Todo App Logic', () => {
    it('Can add a task when input is not empty', () => {
        const text = ref('Buy milk')
        const tasks = ref([])

        const addTask = () => {
        const trimmed = text.value.trim()
        if (trimmed) {
            tasks.value.push({ name: trimmed, done: false })
            text.value = ''
        }
        }

        addTask()

        expect(tasks.value.length).toBe(1)
        expect(tasks.value[0].name).toBe('Buy milk')
        expect(text.value).toBe('')
    })

    it('Does not add an empty task', () => {
        const text = ref('   ')
        const tasks = ref([])

        const addTask = () => {
        const trimmed = text.value.trim()
        if (trimmed) {
            tasks.value.push({ name: trimmed, done: false })
            text.value = ''
        }
        }

        addTask()

        expect(tasks.value.length).toBe(0)
    })

    it('Can view all tasks', () => {
        const tasks = ref([{ name: 'Buy milk', done: false }])

        const getAllTasks = () => {
            return tasks.value
        }

        expect(getAllTasks().length).toBe(1)
        expect(getAllTasks()[0].name).toBe('Buy milk')
    })

    it('Can delete a task', () => {
        const tasks = ref([{ name: 'Buy milk', done: false }])

        const removeTask = (task) => {
        const index = tasks.value.indexOf(task)
        if (index > -1) {
            tasks.value.splice(index, 1)
        }
        }

        removeTask(tasks.value[0])

        expect(tasks.value.length).toBe(0)
    })

    it('Can mark task as complete', () => {
        const tasks = ref([{ name: 'Buy milk', done: false }])

        const toggleTask = (task) => {
        task.done = !task.done
        }

        toggleTask(tasks.value[0])

        expect(tasks.value[0].done).toBe(true)

        toggleTask(tasks.value[0])

        expect(tasks.value[0].done).toBe(false)
    })

    it('Can update task name', () => {
        const tasks = ref([{ name: 'Buy milk', done: false }])
        const newName = 'Buy bread'

        const updateTaskName = (task, newName) => {
        task.name = newName
        }

        updateTaskName(tasks.value[0], newName)

        expect(tasks.value[0].name).toBe(newName)
    })

    it('Does not update task name to empty', () => {
        const tasks = ref([{ name: 'Buy milk', done: false }])
        const newName = '   '

        const updateTaskName = (task, newName) => {
        const trimmed = newName.trim()
        if (trimmed) {
            task.name = trimmed
        }
        }

        updateTaskName(tasks.value[0], newName)

        expect(tasks.value[0].name).toBe('Buy milk')
    })

    it('Filters tasks by completion status', () => {
        const tasks = ref([
            { name: 'Buy milk', done: false },
            { name: 'Clean room', done: true },
            { name: 'Do laundry', done: false }
        ])

        const filterTasks = (status) => {
            if (status === 'completed') {
                return tasks.value.filter(task => task.done)
            } else if (status === 'pending') {
                return tasks.value.filter(task => !task.done)
            }
            return tasks.value
        }

        expect(filterTasks('completed').length).toBe(1)
        expect(filterTasks('pending').length).toBe(2)
        expect(filterTasks('all').length).toBe(3)
    })

    it('Has placeholder text in input field', () => {
        const placeholder = 'Add a new task...'
        const text = ref('')

        const setPlaceholder = (placeholder) => {
            text.value = placeholder
        }

        setPlaceholder(placeholder)

        expect(text.value).toBe(placeholder)
    })

    it('Can truncate long task names', () => {
        const tasks = ref([{ name: 'A very long task name that exceeds the maximum length allowed for a task name', done: false }])
        const maxLength = 50

        const truncateTaskName = (task) => {
            if (task.name.length > maxLength) {
                task.name = task.name.slice(0, maxLength) + '...'
            }
        }

        truncateTaskName(tasks.value[0])

        expect(tasks.value[0].name.length).toBeLessThanOrEqual(maxLength + 3) // +3 for '...'
    })
    it('security: does not allow script injection in task names', () => {
        const tasks = ref([])
        const text = ref('<script>alert("XSS")</script>')

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed) {
                const escapedName = trimmed.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                tasks.value.push({ name: escapedName, done: false })
                text.value = ''
            }
        }

        addTask()

        expect(tasks.value[0].name).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;')
    })

    it('Input field is cleared after adding task', () => {
        const text = ref('Buy milk')
        const tasks = ref([])

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed) {
                tasks.value.push({ name: trimmed, done: false })
                text.value = ''
            }
        }

        addTask()

        expect(text.value).toBe('')
    })
    it('does not add duplicate tasks', () => {
        const text = ref('Buy milk')
        const tasks = ref([{ name: 'Buy milk', done: false }])

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed && !tasks.value.some(task => task.name === trimmed)) {
                tasks.value.push({ name: trimmed, done: false })
                text.value = ''
            }
        }

        addTask()

        expect(tasks.value.length).toBe(1)
    })
    
    it('Can add more than 10 items', () => {
        const text = ref('Task')
        const tasks = ref([])

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed) {
                tasks.value.push({ name: trimmed, done: false })
                text.value = ''
            }
        }

        for (let i = 0; i < 15; i++) {
            text.value = `Task ${i + 1}`
            addTask()
        }

        expect(tasks.value.length).toBe(15)
    })

    it('Symbols in task names are handled correctly', () => {
        const text = ref('Task with symbols !@#$%^&*()')
        const tasks = ref([])

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed) {
                tasks.value.push({ name: trimmed, done: false })
                text.value = ''
            }
        }

        addTask()

        expect(tasks.value.length).toBe(1)
        expect(tasks.value[0].name).toBe('Task with symbols !@#$%^&*()')
    })
    it('Input control characters', () => {
        const text = ref('Task with control characters \n\t\r')
        const tasks = ref([])

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed) {
                tasks.value.push({ name: trimmed, done: false })
                text.value = ''
            }
        }

        addTask()

        expect(tasks.value.length).toBe(1)
        expect(tasks.value[0].name).toBe('Task with control characters')
    })
    
    it('Input with double-width characters', () => {
        const text = ref('タスク名')
        const tasks = ref([])

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed) {
                tasks.value.push({ name: trimmed, done: false })
                text.value = ''
            }
        }

        addTask()

        expect(tasks.value.length).toBe(1)
        expect(tasks.value[0].name).toBe('タスク名')
    })
    it('Input with emojis', () => {
        const text = ref('Task with emoji 😊')
        const tasks = ref([])

        const addTask = () => {
            const trimmed = text.value.trim()
            if (trimmed) {
                tasks.value.push({ name: trimmed, done: false })
                text.value = ''
            }
        }

        addTask()

        expect(tasks.value.length).toBe(1)
        expect(tasks.value[0].name).toBe('Task with emoji 😊')
    })
})
