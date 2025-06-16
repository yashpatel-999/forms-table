import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from './Task.Model';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'curdoperations';
  tasks: Task[]=[];
  taskForm: Task={
    taskName: "",
    assignee: "",
    status: "Not Started",
  }

  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.taskService.getTasks(this.tasks).subscribe((data) => {
      this.tasks = data;
    });
  }
  addOrUpdateTask() {
    this.taskService.addTask(this.taskForm).subscribe((newTask)=>this.tasks.push(newTask));
    
  }


}