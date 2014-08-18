window.onload = function() { 
	var todolist = new ToDoList();
	todolist.attachEventsOnload();


	function ToDoList () {
		this.allUsedIDs = 1;
	}

	ToDoList.prototype.attachEventsOnload = function() {
		var addBtn = document.getElementById('add');
		var task1 = document.getElementById('task1');
		addBtn.addEventListener('click', adder, false);

		var adder = function () {
			var newTask = document.createElement('div');
			newTask.innerHTML = '<div class="col-lg-6 col-md-offset-3"><div class="input-group"><input type="text" class="form-control"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right" role="menu"><li><a href="#">Action</a></li><li class="divider"></li><li><a href="#" class="btn-info">Done</a></li><li><a href="#" class="btn-warning">Edit</a></li></ul></div><!-- /btn-group --></div><!-- /input-group --></div><!-- /.col-lg-6 -->';
			this.allUsedIDs++;
			newTask.id = 'task' + this.allUsedIDs;
			newTask.className = 'row task-divider';

			var parent = document.getElementById('todo');
			parent.appendChild(newTask);
		}

	};
}

