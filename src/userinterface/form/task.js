UserInterface.model({
	name: "todo.form_task",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		children: [
			{
				tagName: "label",
				textContent: "Task name",
				children: [
					{
						tagName: "div",
						children: [
							{
								required: true,
								className: "identifier-name",
								tagName: "input"
							}
						]
					},
				]
			}
		]
	}
})