import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './Task.Model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  private apiurl = 'http://localhost:3000/tasks';
  getTasks() :Observable<Task[]>{
    return this.http.get<Task[]>(this.apiurl).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError(() => new Error('Error fetching tasks'));
      })
    );
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiurl, task).pipe(
      catchError(error=>{
        console.error('Error adding task:', error);
        return throwError(() => new Error('Error adding task'));
      })
    )
  }
  editTask(id :Number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiurl}/${id}`, task);
  }
  deleteTask(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }
}
