
function ToDoList () {
	this.allUsedIDs = null;
}

ToDoList.prototype.attachEventsOnload = function() {
	var addBtn = document.getElementById('add');
	var task1 = document.getElementById('task1');
	var self = this;
	console.log(self);


	var adder = function () {

		console.log(self.allUsedIDs);

		var newTask = document.createElement('div');
		newTask.innerHTML = '<div class="col-lg-6 col-md-offset-3"><div class="input-group"><input type="text" class="form-control"><div class="input-group-btn"><button type="button" class="btn btn-default done"><span class="glyphicon glyphicon-remove"></span></button></div><!-- /btn-group --></div><!-- /input-group --></div><!-- /.col-lg-6 -->';
		self.allUsedIDs++;
		newTask.id = 'task' + self.allUsedIDs;
		newTask.className = 'row task-divider';

		var parent = document.getElementById('todo');
		parent.appendChild(newTask);

		var taskText = document.getElementById('taskText').value;
		newTask.getElementsByTagName('input')[0].value = taskText;
		document.getElementById('taskText').value = ""; // clear

		var temp = newTask.id;

		newTask.getElementsByClassName('done')[0].onclick = function () {
			console.log(temp);
			var currentTask = document.getElementById(temp);
			currentTask.parentNode.removeChild(currentTask);
		}
	}
	addBtn.addEventListener('click', adder, false);

};

window.onload = function() { 
	var todolist = new ToDoList();
	todolist.attachEventsOnload(); //first task
}
