const taskForm = document.querySelector("#taskForm")

document.addEventListener("DOMContentloaded", () => {
  App.init()
})

taskForm.addEventListener("submit", (e) => {
  e.preventDefault()

  App.createTask(taskForm["title"].value, taskForm["description"].value)
})
