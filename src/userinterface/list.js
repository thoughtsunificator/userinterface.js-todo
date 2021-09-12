UserInterface.model({
	name: "todo.list",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		className: "list",
		children: [
			{
				tagName: "div",
				style: "display: grid;",
				className: "set",
				children: [
					{
						tagName: "div",
						className: "name",
						textContent: data.name
					}
				]
			},
			{
				tagName: "button",
				className: "settings",
				textContent: "⚙️"
			}
		]
	})
})

UserInterface.bind("todo.list", async function(element, todo, list) {

	const _listeners = []

	const _setNode = element.querySelector(".set")
	const _nameNode = element.querySelector(".name")
	const _settingsButton = element.querySelector(".settings")

	_listeners.push(UserInterface.listen(list, "remove", async () => {
		list.tasks.forEach(task => UserInterface.announce(task, "remove"))
		_listeners.forEach(listener => UserInterface.removeListener(listener))
		element.remove()
	}))

	_listeners.push(UserInterface.listen(list, "update", async () => {
		_nameNode.textContent = list.name
	}))

	_listeners.push(UserInterface.listen(list, "set", async () => {
		element.classList.add("active")
	}))

	_listeners.push(UserInterface.listen(list, "unset", async () => {
		element.classList.remove("active")
	}))

	_setNode.addEventListener("click", () => {
		UserInterface.announce(todo, "list set", list)
	})

	_settingsButton.addEventListener("click", () => {
		UserInterface.announce(todo, "popup controls open", [
			{
				model: "collection.button",
				text: "Edit",
				action: "list edit popup",
				value: list
			},
			{
				model: "collection.button",
				text: "Remove",
				action: "popup confirm open",
				value: {
					eventYes: "list remove",
					data: list,
					text: "Are you sure?"
				}
			}
		])
	})

})