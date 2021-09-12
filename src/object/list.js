/**
 * @param {string} id
 * @param {string} name
 */
Todo.List = function(id, name) {
	this.id = id
	this.name = name
	this.tasks = []
}

/**
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.state
 */
Todo.List.prototype.addTask = function(data) {
	const task = new Todo.Task(data.name, data.state)
	this.tasks.push(task)
	return task
}

/**
 * @param  {Task} task
 */
Todo.List.prototype.removeTask = function(task) {
	this.tasks.splice(this.tasks.indexOf(task), 1)
}

/**
 * @param  {Task} task
 * @param  {object} data
 */
Todo.List.prototype.updateTask = function(task, data) {
	for(const key in data) {
		task[key] = data[key]
	}
}

Todo.List.prototype.clearEntries = function() {
	this.tasks = []
}