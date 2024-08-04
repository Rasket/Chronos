import { defineStore } from 'pinia'

export const taskStore = defineStore('task', {
  state: () => {
    return { task: '', start: 0 }
  },
  // также может быть объявлено как
  // state: () => ({ count: 0 })
  actions: {
    setTask (taskName) {
      let start = Date.now()
      this.start = start
      this.task = taskName
      console.log(this.task, this.start)
    },
  },
})