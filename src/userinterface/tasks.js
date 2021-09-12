UserInterface.model({
	name: "todo.tasks",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "tasks",
		children: [
			{
				tagName: "div",
				className: "tasks"
			},
			{
				tagName: "p",
				className: "placeholder",
				textContent: "Your list is empty",
			},
			{
				tagName: "button",
				id: "add-task",
				textContent: "Add a task"
			},
		]
	}
})

UserInterface.bind("todo.tasks", async function(element, todo) {

	const _tasksNode = element.querySelector(".tasks")
	const _addTaskButton = element.querySelector("#add-task")

	if(todo.list === null) {
		element.style.display = "none"
	}

	UserInterface.listen(todo, "list set", async list => {
		_tasksNode.textContent = ""
		for(const task of list.tasks) {
			await UserInterface.runModel("todo.task", { parentNode: _tasksNode, data: task, bindingArgs: [todo, list, task] })
		}
	})

	UserInterface.listen(todo, "task added", async task => {
		UserInterface.runModel("todo.task", { parentNode: _tasksNode, data: task, bindingArgs: [todo, todo.list, task] })
	})

	UserInterface.listen(todo, "list added", async () => {
		element.style.display = ""
	})

	UserInterface.listen(todo, "list removed", async () => {
		if(todo.list === null) {
			element.style.display = "none"
		}
	})

	_addTaskButton.addEventListener("click", () => {
		UserInterface.announce(todo, "popup form open", {
			model: "todo.form_task",
			action: "task add",
			data: todo.list
		})
	})

	if(todo.list !== null) {
		for(const task of todo.list.tasks) {
			await UserInterface.runModel("todo.task", { parentNode: _tasksNode, data: task, bindingArgs: [todo, todo.list, task] })
		}
	}

})