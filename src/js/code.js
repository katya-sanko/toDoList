function Storage(){
}

Storage.prototype.checkStorage = function() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
};


Storage.prototype.addTask = function(id) { // id = "task1"
	if(this.checkStorage() != false){
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
	if(this.checkStorage() != false){
		if(localStorage.length != 0){
			localStorage.removeItem(id); // id is a key, "task1"
		}
	}
};

Storage.prototype.getTasks = function() {
	if(this.checkStorage() != false){
		if(localStorage.length != 0){
			var savedTasks = {};
			for (var i = 0; i < localStorage.length; i++) {
				var _key =  i + 1;
				_key = "task" + _key;
				if (localStorage.getItem(_key) != null) {
					savedTasks[_key] = localStorage.getItem(_key); // in obj we get "task1" + "text user"
					console.log(savedTasks)
				};
				
			};
			return savedTasks; // returns massiv with todos
		}
	}
};



function ToDoList () {
	this.allUsedIDs = null;
}

ToDoList.prototype.createTaskView = function(id, value) {
		var store = new Storage();

		var newTask = document.createElement('div');
		newTask.innerHTML = '<div class="col-lg-6 col-md-offset-3"><div class="input-group"><input type="text" class="form-control"><div class="input-group-btn"><button type="button" class="btn btn-default done"><span class="glyphicon glyphicon-remove"></span></button></div><!-- /btn-group --></div><!-- /input-group --></div><!-- /.col-lg-6 -->';
		newTask.id = id; //id what we get
		newTask.className = 'row task task-divider';

		var parent = document.getElementById('todo');
		parent.appendChild(newTask);

		if (value == null){
			var taskText = document.getElementById('taskText').value;
			newTask.getElementsByTagName('input')[0].value = taskText;
			document.getElementById('taskText').value = ""; // clear
		}
		else {
			newTask.getElementsByTagName('input')[0].value = value;
			console.log('in restoring');
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
	var tasksCollection = store.getTasks();
	var keys = Object.keys(tasksCollection);
	console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		this.createTaskView(keys[i], tasksCollection[keys[i]]);
	};
};

ToDoList.prototype.attachEventsOnload = function() {
	var addBtn = document.getElementById('add');
	var task1 = document.getElementById('task1');
	var self = this;
	console.log(self);

	this.representingSavedTasks();

	var adder = function () {

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
