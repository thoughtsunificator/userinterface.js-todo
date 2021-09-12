UserInterface.model({
	name: "todo",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "todo",
		children: [
			{
				tagName: "div",
				id: "lists",
				children: [
					{
						tagName: "div",
						className: "lists"
					},
					{
						tagName: "button",
						id: "add-list",
						textContent: "Add a list"
					}
				]
			}
		]
	}
})

UserInterface.bind("todo", async function(element) {

	const _listsNode = element.querySelector(".lists")
	const _addListButton = element.querySelector("#add-list")

	const todo = new Todo()

	todo.initialize(localStorage)

	UserInterface.listen(todo, "list add", async data => {
		const list = todo.addList(data.form)
		todo.save()
		if(data.form.tasks) {
			data.form.tasks.forEach(taskData => list.addTask(taskData))
		}
		await UserInterface.runModel("todo.list", { parentNode: _listsNode, data: list, bindingArgs: [todo, list] })
		UserInterface.announce(todo, "list set", list)
		await UserInterface.announce(todo, "list added", list)
	})

	UserInterface.listen(todo, "list update", async data => {
		todo.updateList(data.data, data.form)
		todo.save()
		await UserInterface.announce(data.data, "update")
	})

	UserInterface.listen(todo, "list remove", async data => {
		todo.removeList(data)
		todo.save()
		if(todo.list === data) {
			todo.list = null
		}
		await UserInterface.announce(data, "remove", data)
		if(todo.lists.length >= 1 && todo.list === null) {
			await UserInterface.announce(todo, "list set", todo.lists[0])
		}
		await UserInterface.announce(todo, "list removed", data)
	})

	UserInterface.listen(todo, "list edit popup", async data => {
		UserInterface.announce(todo, "popup form open", {
			model: "todo.form_list",
			action: "list update",
			form: data,
			data: data
		})
	})

	UserInterface.listen(todo, "list set", async list => {
		todo.list = list
		todo.lists.filter(list_ => list_ !== list).forEach(list_ => UserInterface.announce(list_, "unset"))
		UserInterface.announce(list, "set")
	})

	UserInterface.listen(todo, "task add", async data => {
		const task = data.data.addTask(data.form)
		todo.save()
		await UserInterface.announce(todo, "task added", task)
	})

	UserInterface.listen(todo, "task update", async data => {
		todo.list.updateTask(data.data, data.form)
		todo.save()
		await UserInterface.announce(data.data, "update")
	})

	UserInterface.listen(todo, "task remove", async data => {
		todo.list.removeTask(data)
		todo.save()
		await UserInterface.announce(data, "remove", data)
	})

	UserInterface.listen(todo, "task edit popup", async data => {
		UserInterface.announce(todo, "popup form open", {
			model: "todo.form_task",
			action: "task update",
			form: data,
			data: data
		})
	})

	_addListButton.addEventListener("click", () => {
		UserInterface.announce(todo, "popup form open", {
			model: "todo.form_list",
			action: "list add"
		})
	})

	for(const list of todo.lists) {
		await UserInterface.runModel("todo.list", { parentNode: _listsNode, data: list, bindingArgs: [todo, list] })
	}

	if(todo.lists.length >= 1) {
		await UserInterface.announce(todo, "list set", todo.lists[0])
	}

	await UserInterface.runModel("todo.tasks", { parentNode: element, bindingArgs: [todo] })
	await UserInterface.runModel("collection.popup", { parentNode: element, bindingArgs: [todo] })

})