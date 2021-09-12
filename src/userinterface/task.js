UserInterface.model({
	name: "todo.task",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		className: "task",
		children: [
			{
				tagName: "input",
				type: "checkbox",
				checked: data.state === Todo.Task.STATE_COMPLETED
			},
			{
				tagName: "h3",
				className: "name",
				textContent: data.name
			},
			{
				tagName: "button",
				className: "settings",
				textContent: "⚙️"
			},
		]
	})
})

UserInterface.bind("todo.task", async function(element, todo, list, task) {

	const listeners = []

	const _checkboxNode = element.querySelector("input[type=checkbox]")
	const _nameNode = element.querySelector(".name")
	const _settingsButton = element.querySelector(".settings")

	listeners.push(UserInterface.listen(task, "remove", async () => {
		element.remove()
	}))

	listeners.push(UserInterface.listen(task, "update", async () => {
		_nameNode.textContent = task.name
	}))

	_checkboxNode.addEventListener("change", event => {
		UserInterface.announce(todo, "task update", { data: task, form: { state: event.target.checked ? Todo.Task.STATE_COMPLETED : Todo.Task.STATE_TODO } })
	})

	_settingsButton.addEventListener("click", () => {
		UserInterface.announce(todo, "popup controls open", [
			{
				model: "collection.button",
				text: "Edit",
				action: "task edit popup",
				value: task
			},
			{
				model: "collection.button",
				text: "Remove",
				action: "popup confirm open",
				value: {
					eventYes: "task remove",
					data: task,
					text: "Are you sure?"
				}
			}
		])
	})

})