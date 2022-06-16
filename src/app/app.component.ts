import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guid } from "guid-typescript";
import { Todo } from "src/models/todo.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[];
  localItem: string;
  constructor() {
    this.localItem = localStorage.getItem("todos");
    if (this.localItem == null) {
      this.todos = [];
    }
    else {
      this.todos = JSON.parse(this.localItem);
    }
  }


  onSubmit(form: NgForm) {
    let todo = new Todo(Guid.create(), form.value.title, false);
    if(form.value.title!=null){
      this.todos.push(todo);
      form.resetForm();
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
   else{
    console.log("required")
   }
   
  }
  onComplete(id: Guid) {
    let todo = this.todos.filter(x => x.id === id)[0];
    todo.isComplete = true;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  onDelete(id: Guid) {
    let todo = this.todos.filter(x => x.id === id)[0];
    let index = this.todos.indexOf(todo, 0);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
