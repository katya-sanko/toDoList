function Storage(){
}

Storage.prototype.checkStorage = function() {
	return typeof(Storage) !== "undefined"; // false if there is no local storage
};

Storage.prototype.addTask = function(id) { // id = "task1"
	if(this.checkStorage()){
		var _key = id, _value = document.getElementById(id).getElementsByTagName('input')[0].value;
		try{
			localStorage.setItem(_key, _value);
		} catch(e) {
			if( e == QUOTA_EXCEEDED_ERR){
				console.error('Error: not enough space');
			}
		}
	}
};

Storage.prototype.removeTask = function(id) {
	if(this.checkStorage()){
		if(localStorage.length != 0){
			localStorage.removeItem(id); // id is a key, "task1"
		}
	}
};

Storage.prototype.getTasks = function() {
	if(this.checkStorage()){
		if(localStorage.length != 0){
			var savedTasks = {};
			for (var i = 0; i < localStorage.length; i++) {
				var _key =  "task" + i;
				if (localStorage.getItem(_key) != null) {
					savedTasks[_key] = localStorage.getItem(_key); // in obj we get "task1" + "text user"
					console.log(savedTasks)
				};
				
			};
			return savedTasks; // returns object with todos
		}
	}
};

function ToDoList () {
	this.allUsedIDs = null;
}

ToDoList.prototype.createTaskView = function(id, value) {
		var store = new Storage();

		var newTask = document.getElementById('task').cloneNode(true);
		console.log(newTask);
		newTask.id = id; //id what we get

		document.getElementById('todo').appendChild(newTask);

		if (value == null){
			newTask.getElementsByTagName('input')[0].value = document.getElementById('taskText').value;
			document.getElementById('taskText').value = ""; // clear
		}
		else {
			newTask.getElementsByTagName('input')[0].value = value;
		}

		store.addTask(newTask.id);

		var temp = newTask.id;
		newTask.getElementsByClassName('done')[0].onclick = function () {
			console.log(temp);
			console.log(store);
			var currentTask = document.getElementById(temp);
			currentTask.parentNode.removeChild(currentTask);
			store.removeTask(temp);

		}
};

ToDoList.prototype.representingSavedTasks = function() {
	var store = new Storage();

	try{
			var tasksCollection = store.getTasks() ;
			var keys = Object.keys(tasksCollection);
			console.log(keys);
			for (var i = 0; i < keys.length; i++) {
				this.createTaskView(keys[i], tasksCollection[keys[i]]);
			};
	} catch(e){
		//console.error('there are no data in storage');
	}

};

ToDoList.prototype.attachEventsOnload = function() {
	var addBtn = document.getElementById('add');
	var task1 = document.getElementById('task1');
	var self = this;
	console.log(self);

	this.representingSavedTasks();

	var adder = function() {

		console.log(self.allUsedIDs);
		var current_id = 'task' + self.allUsedIDs++;
		self.createTaskView(current_id, null); // create new todo
	}
	addBtn.addEventListener('click', adder, false);
};

window.onload = function() { 
	var todolist = new ToDoList();
	todolist.attachEventsOnload(); //first task
}