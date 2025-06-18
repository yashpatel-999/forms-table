import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../Task.Model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [FormsModule,CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
 title = 'curdoperations';
  tasks: Task[]=[];
  taskForm: Task={
    taskName: "",
    assignee: "",
    status: "Not Started",
  }

  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.LoadTasks();
  }
  LoadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addOrUpdateTask() {
    if(this.taskForm.id) {
      this.taskService.editTask(this.taskForm.id, this.taskForm).subscribe((updatedTask) => {
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.reset();
        }
      })
    }
    else{
      this.taskService.addTask(this.taskForm).subscribe((newTask)=>this.tasks.push(newTask));
      this.reset();
    }
  }
  editTask(task: Task) {
    this.taskForm = { ...task };
  }
  reset(){
    this.taskForm = {
      taskName: "",
      assignee: "",
      status: "Not Started",
    };
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

}
