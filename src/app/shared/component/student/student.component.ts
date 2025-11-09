import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from '../../models/students';
import { MatSnackBar } from '@angular/material/snack-bar';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  isInEditMode: boolean = false;
  Edit_Id!: string
  @ViewChild('name') name!: ElementRef
  @ViewChild('surname') surname!: ElementRef
  @ViewChild('age') age!: ElementRef
  @ViewChild('email') email!: ElementRef
  @ViewChild('contact') contact!: ElementRef

  studentsArray: Array<Istudent> = [
    {
      studentName: 'Aiman',
      surName: 'Q',
      age: 23,
      email: 'aiman456@gmail.com',
      contact: 5432256677,
      stdId: 'hydvskidh'
    },
    {
      studentName: 'Javeriya',
      surName: 'Q',
      age: 27,
      email: 'javeriya454@gmail.com',
      contact: 76542994798,
      stdId: 'sdj8ehhdk'

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
  onStdAdd() {
    if (this.name.nativeElement.value, this.surname.nativeElement.value, this.age.nativeElement.value, this.email.nativeElement.value, this.contact.nativeElement.value) {
      let stdObj = {
        studentName: this.name.nativeElement.value,
        surName: this.surname.nativeElement.value,
        age: +this.age.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: + this.contact.nativeElement.value,
        stdId: this.Uuid()
      }
      this.studentsArray.push(stdObj);
      this.name.nativeElement.value=this.surname.nativeElement.value= this.age.nativeElement.value= this.email.nativeElement.value= this.contact.nativeElement.value = ''
      this._matSnackbar.open(`Student "${stdObj.studentName} ${stdObj.surName}" added successfully!`, "Close", {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }else{
      alert('Fill up the student form first!!')
    }
  }
  onStdRemove(stdObj: Istudent) {
    let getConfirm = confirm(`Are you sure you want to delete this student "${stdObj.studentName} ${stdObj.surName}"`)
    if (getConfirm) {
      let finIndex = this.studentsArray.findIndex(std => std.stdId === stdObj.stdId)
      this.studentsArray.splice(finIndex, 1)
    }
    this._matSnackbar.open(`Student "${stdObj.studentName} ${stdObj.surName}" removed successfully`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })

  }
  onStdEdit(std: Istudent) {
    this.isInEditMode = true
    this.Edit_Id = std.stdId;
    localStorage.setItem("Edit_Id", this.Edit_Id);
    this.name.nativeElement.value = std.studentName,
      this.surname.nativeElement.value = std.surName,
      this.age.nativeElement.value = std.age,
      this.email.nativeElement.value = std.email,
      this.contact.nativeElement.value = std.contact
  }
  onStdUpdate() {
    this.isInEditMode = false;
    this.Edit_Id=''
    let Update_Id = localStorage.getItem("Edit_Id")
    localStorage.removeItem("Edit_Id")
    if (this.name.nativeElement.value, this.surname.nativeElement.value, this.age.nativeElement.value, this.email.nativeElement.value, this.contact.nativeElement.value, Update_Id) {
      let updatedObj = {
        studentName: this.name.nativeElement.value,
        surName: this.surname.nativeElement.value,
        age: +this.age.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: + this.contact.nativeElement.value,
        stdId: Update_Id
      }

      let findInd = this.studentsArray.findIndex(std => std.stdId === Update_Id);
      this.studentsArray[findInd] = updatedObj;
      this.name.nativeElement.value=this.surname.nativeElement.value= this.age.nativeElement.value= this.email.nativeElement.value= this.contact.nativeElement.value = ''

      this._matSnackbar.open(`Student "${updatedObj.studentName} ${updatedObj.surName}" updated successfully!`, "Close", {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
  }
  onEditCancel() {
    this.isInEditMode = false;
      this.name.nativeElement.value=this.surname.nativeElement.value= this.age.nativeElement.value= this.email.nativeElement.value= this.contact.nativeElement.value = ''
      this.Edit_Id=''

  }
}
