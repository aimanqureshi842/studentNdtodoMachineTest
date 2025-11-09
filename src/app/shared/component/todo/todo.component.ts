import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../../models/todos';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild("todoEle") todoEle!: ElementRef
  isInEditMode: boolean = false;
  Edit_Id!:string
  todosArr: Array<Itodo> = [
    {
      todoItem: "Javascript",
      todoId: "123"
    },
    {
      todoItem: "Saas",
      todoId: "124"
    }
  ]
  constructor(private _matSnackbar: MatSnackBar) { }

  ngOnInit(): void {
  }
  Uuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };


  onTodoAdd() {
    if (this.todoEle.nativeElement.value) {
      let todoObj = {
        todoItem: this.todoEle.nativeElement.value,
        todoId: this.Uuid()
      }
      // console.log(todoObj)
      this.todosArr.push(todoObj);
      this.todoEle.nativeElement.value = ''
      this._matSnackbar.open(`TodoItem" ${todoObj.todoItem}" added successfully!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    } else {
      alert('add todoItem first!!')
    }
  }
  onTodoRemove(todoObj: Itodo) {
    let getConfirm = confirm(`Are you sure you want to delete this todoItem "${todoObj.todoItem}"`)
    if (getConfirm) {
      let getIndex = this.todosArr.findIndex(todo => todo.todoId === todoObj.todoId);
      this.todosArr.splice(getIndex, 1)
      this._matSnackbar.open(`Todo Item "${todoObj.todoItem}" removed successfully`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }


  }
  onTodoEdit(todo: Itodo) {
    this.isInEditMode = true
    this.Edit_Id = todo.todoId;
    // console.log(Edit_Id)
    localStorage.setItem("Edit_Id", this.Edit_Id)
    //  console.log( localStorage.getItem("Edit_Id"))
    this.todoEle.nativeElement.value = todo.todoItem;
  }
  onTodoUpdate() {
    this.isInEditMode = false;
    this.Edit_Id=''
    let Update_Id = localStorage.getItem("Edit_Id");
    console.log(this.todoEle.nativeElement.value, Update_Id)
    localStorage.removeItem("Edit_Id")
    if (Update_Id) {
      let updateObj = {
        todoItem: this.todoEle.nativeElement.value,
        todoId: Update_Id
      }
      let getIndex = this.todosArr.findIndex(todo => todo.todoId === Update_Id)
      this.todosArr[getIndex] = updateObj;
      this.todoEle.nativeElement.value = ''
      this._matSnackbar.open(`TodoItem "${updateObj.todoItem}" updated successfully!`,'Close',{
        duration:3000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })

    }
  }
  onEditCancel() {
    this.isInEditMode = false;
    this.todoEle.nativeElement.value = ''
    this.Edit_Id=''

  }
}
