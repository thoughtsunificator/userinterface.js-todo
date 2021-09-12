/**
 * @param {string} name
 * @param {string} state
 */
Todo.Task = function(name, state = Todo.Task.STATE_TODO) {
	this.name = name
	this.state = state
}

Todo.Task.STATE_TODO = "STATE_TODO"
Todo.Task.STATE_COMPLETED = "STATE_COMPLETED"