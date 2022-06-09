import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  grades =[ 8 , 9 , 10 , 11 , 12]
  //Creating a Form studentForm of type FromGroup
  studentForm !: FormGroup;
  actionBtn : string = "Add Student"
  FormTile: string = "Add New Student Form"
  //First Inject the formBuilder into the constructor
  //then initialize the form in the ngOnInit
  //=> constructor(private formBuilder: FormBuilder) { }
  //Now for saving the data to the server => database
  //I need to inject the service api of Api that was created in services folder
  //To close the dialog after submission, I need to inject MatDialogRef
  constructor(private formBuilder: FormBuilder, private api : ApiService,
    private dialogRef : MatDialogRef<InputFormComponent>, @Inject(MAT_DIALOG_DATA) public dataToUpdate:any) { }
    
    ngOnInit(): void {
      //Initializing Form and group form
      this.studentForm = this.formBuilder.group({
        FirstName : ['', Validators.required],
        LastName : ['', Validators.required],
        Gender : ['', Validators.required],
        Grade : ['', Validators.required],
      })

      //if dataToUpdate have information
      //set the information to the table
      if(this.dataToUpdate){
        this.actionBtn = "Update"
        this.FormTile ="Update Student Form"
        this.studentForm.controls['FirstName'].setValue(this.dataToUpdate.FirstName);
        this.studentForm.controls['LastName'].setValue(this.dataToUpdate.LastName);
        this.studentForm.controls['Gender'].setValue(this.dataToUpdate.Gender);
        this.studentForm.controls['Grade'].setValue(this.dataToUpdate.Grade);
      }
    }
    //Creating the binding method form StudentForm and the Form in the dialog
    AddStudent(){
      //if the dataToUpdate doesn't have data to update
      //the function is for save data else its for update
      if(!this.dataToUpdate){
        //check if the form is valid
        if(this.studentForm.valid){
          //True => then push the Data to the server and subscribe
          this.api.HttpPostMethod(this.studentForm.value)
          .subscribe({   // this is an observer
            //next for when it successfully saved
            next: (response) => {
              alert("Student Added successfully");
              //Format the form after submission
              this.studentForm.reset();
              //Close the form
              this.dialogRef.close("Add");
            },
            //when an error is encountered while saving
            error: (err) => {
              alert("Error Inserting student");
              console.log(err.message);
            }
          });
        } // end inner if-statement
      }
      else
      {
        //method for update
        this.UpdateStudentFunction();
      } //end else
    } // end method

    UpdateStudentFunction(){
      //check if the form is valid
      if(this.studentForm.valid){
        //True => then push the Data to the server and subscribe
        this.api.HttpPutMethod(this.studentForm.value, this.dataToUpdate.Student_Id)
        .subscribe({   // this is an observer
          //next for when it successfully Updated
          next: (response) => {
            alert("Student was successfully Updated");
            //Format the form after submission
            this.studentForm.reset();
            //Close the form
            this.dialogRef.close("Updated");
          },
          //when an error is encountered while saving
          error: (err) => {
            alert("Error while updating student");
            console.log(err.message);
          }
        });
      }
    }
  }
