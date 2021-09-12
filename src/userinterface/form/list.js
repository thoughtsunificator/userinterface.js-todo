UserInterface.model({
	name: "todo.form_list",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		children: [
			{
				tagName: "label",
				textContent: "List name",
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