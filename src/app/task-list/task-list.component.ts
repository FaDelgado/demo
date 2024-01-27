import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface TaskList {
  nombre: string,
  checked: boolean
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  public taskForm: FormGroup;

  public taskList: TaskList[] = [];

  constructor(private fb: FormBuilder){
    this.taskForm = this.fb.group({
      task: ['', Validators.required]
    })
    const lsTaskList = localStorage.getItem('taskList');
    this.taskList = lsTaskList ? JSON.parse(lsTaskList) : [];
    
  }

  agregar() {
      if (this.taskForm.invalid) return this.taskForm.get('task')?.markAsDirty();
      this.taskList.push({nombre: this.taskForm.get('task')?.value, checked: false});
      this.taskForm.reset();
      this.saveLS();
  }

  remover(index: number) {
    this.taskList = this.taskList.filter( (task, i) => i !== index && task);
    this.saveLS();
  }

  checked(index: number){
    this.taskList[index].checked = !this.taskList[index].checked; 
    this.saveLS();
  }

  saveLS = () => localStorage.setItem('taskList', JSON.stringify(this.taskList));
}
