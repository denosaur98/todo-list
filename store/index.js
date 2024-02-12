import { createStore } from 'vuex'

export default createStore({
	state() {
		return {
			users: [],
			tasks: [],
		}
	},
	mutations: {
		addTask(state, task) {
			state.tasks.unshift(task)
		},
		removeTask(state, id) {
			const index = state.tasks.findIndex(i => i.id === id)
			if (index !== -1) {
				const copyTasks = [...state.tasks]
				copyTasks.splice(index, 1)
				return (state.tasks = copyTasks)
			}
		},
		updateTask(state, { id, title, description }) {
			const task = state.tasks.find(t => t.id === id)
			if (task) {
				task.title = title
				task.description = description
			}
		},
		toggleCheckbox(state, id) {
			const isCheck = state.tasks.find(i => i.id === id)
			if (isCheck.done === false) {
				isCheck.done = true
			} else {
				isCheck.done = false
			}
		},
		createUser(state, user) {
			state.users.push(user)
		},
	},
	actions: {
		addTask({ commit }, task) {
			commit('addTask', task)
		},
		removeTask({ commit }, id) {
			commit('removeTask', id)
		},
		createUser({ commit }, user) {
			commit('createUser', user)
		},
	},
})
