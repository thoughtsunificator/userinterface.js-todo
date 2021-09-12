function Todo() {
	this.lists = []
	this.list = null
	this.nextListId = 0
	this.localStorage = null
}

/**
 * @param  {LocalStorage} localStorage
 */
Todo.prototype.initialize = function(localStorage) {
	this.localStorage = localStorage
	let lists = []
	if(localStorage.getItem("userinterface-js_todo") !== null) {
		lists = JSON.parse(localStorage.getItem("userinterface-js_todo"))
	} else {
		lists = Todo.SAMPLE_TODO
	}
	lists.forEach(data => {
		const list = this.addList(data)
		data.tasks.forEach(taskData => list.addTask(taskData))
	})
}

/**
 * @param {object} data
 * @param {integer} data.id
 * @param {string}  data.name
 */
Todo.prototype.addList = function(data) {
	const list = new Todo.List(this.nextListId, data.name)
	this.lists.push(list)
	this.nextListId++
	return list
}

/**
 * @param  {List} list
 */
Todo.prototype.removeList = function(list) {
	this.lists.splice(this.lists.indexOf(list), 1)
}

/**
 * @param  {List} list
 * @param  {object} data
 */
Todo.prototype.updateList = function(list, data) {
	for(const key in data) {
		list[key] = data[key]
	}
}

Todo.prototype.clearLists = function() {
	this.lists = []
}

Todo.prototype.save = function() {
	this.localStorage.setItem("userinterface-js_todo", JSON.stringify(this.lists))
}