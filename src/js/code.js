function Storage(){
}

Storage.prototype.checkStorage = function() {
	return typeof(Storage) !== "undefined"; // false if there is no local storage
};

Storage.prototype.selectTasks = function() { // selects and parsing 'tasks ' from local storage
	if(this.checkStorage()){
		// Retrieve the object from storage
		var retrievedTasks = localStorage.getItem('tasks');

		if((typeof retrievedTasks == 'undefined') || (retrievedTasks == null) || isNaN(retrievedTasks)){
			retrievedTasks = {}; // if storage is empty, there are new tasks
		}
		else{
			retrievedTasks = JSON.parse(retrievedTasks); // parsing
		}

		return retrievedTasks; //returns parsed object
	}
};

Storage.prototype.addTask = function(id) { // id = "task1"
		var retrievedTasks = this.selectTasks();

		retrievedTasks[id] = document.getElementById(id).getElementsByTagName('input')[0].value; // its new key-value of it
		
		try{
			localStorage.setItem('tasks', JSON.stringify(retrievedTasks)); // new tasks : json obj
		} catch(e) {
			if( e == QUOTA_EXCEEDED_ERR){
				console.error('Error: not enough space');
			}
		}
};

Storage.prototype.removeTask = function(id) {
		var retrievedTasks = this.selectTasks();

		delete retrievedTasks[id];// removing from json
		
		try{
			localStorage.setItem('tasks', JSON.stringify(retrievedTasks)); // new tasks : json obj
		} catch(e) {
			if( e == QUOTA_EXCEEDED_ERR){
				console.error('Error: not enough space');
			}
		}
};


function ToDoList () {
	this.allUsedIDs = parseInt(localStorage.getItem('savedNumber'));
	console.log('counts of numbers' + this.allUsedIDs);
	if((typeof this.allUsedIDs == 'undefined') || (this.allUsedIDs == null) || isNaN(this.allUsedIDs)){
		this.allUsedIDs = 0;
		try{
			localStorage.setItem('savedNumber', 0);
		} catch(e) {
			if( e == QUOTA_EXCEEDED_ERR){
				console.error('Error: not enough space');
			}
		}
	}

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
			var tasksCollection = store.selectTasks() ;
			var keys = Object.keys(tasksCollection);
			console.log(keys);
			for (var i = 0; i < keys.length; i++) {
				this.createTaskView(keys[i], tasksCollection[keys[i]]);
			};
	} catch(e){
		console.error('there are no data in storage');
	}

};

ToDoList.prototype.attachEventsOnload = function() {
	var addBtn = document.getElementById('add');
	//document.getElementById('task').style.display = 'none';
	var self = this;
	console.log(self);

	this.representingSavedTasks();

	if(document.getElementsByClassName('task').length > 1){
		document.getElementById('task').style.display = 'none';
	}

	var adder = function() {

		console.log(self.allUsedIDs);
		var current_id = 'task' + self.allUsedIDs++;
		self.createTaskView(current_id, null); // create new todo
		localStorage.setItem('savedNumber', self.allUsedIDs); //
	}
	addBtn.addEventListener('click', adder, false);
};

window.onload = function() { 
	var todolist = new ToDoList();
	todolist.attachEventsOnload(); //first task
}