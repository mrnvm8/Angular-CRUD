import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { InputFormComponent } from './input-form/input-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CRUD_Interface';

  displayedColumns: string[] = ['FirstName', 'LastName', 'Gender', 'Grade', 'action'];
  //dataSource = new MatTableDataSource<any>();
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //Inject the api service from service folder
  constructor(private dialog : MatDialog, private api: ApiService){}


  //of type void
  ngOnInit(): void{
    this.getAllStudents();
  }

  openDialog() {
    this.dialog.open(InputFormComponent, {
     width:'30%'
    })
    .afterClosed()
    .subscribe(val => {
      //This Add comes from the dialog when it is closes it will pass a parameter
        if (val === "Add"){
          this.getAllStudents();
        }
    });
  }

  //For getting all Student
  getAllStudents(){
    this.api.HttpGetMethod()
    .subscribe({   // this is an observer
      //next for when get data from db
      next: (response) => {
        //loading return data to dataSource
        this.dataSource = new MatTableDataSource(response);
        //paginator
        this.dataSource.paginator = this.paginator;
      },
      //when an error is encountered while getting data from db
      error: (err) => {
        alert("Error while getting Students");
        console.log(err.message);
      }
    });
  }

  //method for updating student
  updateStudent(element: any){
    //Wanting to open the Student dialog form
    this.dialog.open(InputFormComponent, {
      width: '30%',
      data : element  // passing the row i click on the table
    }).afterClosed()
    .subscribe(val => {
      //This update comes from the dialog when it is closes it will pass a parameter
        if (val === "Updated"){
          this.getAllStudents();
        }
    });
  }

  deletingStudent(id : number) {
    this.api.HttpDeleteMethod(id)
    .subscribe({
      next: () => {
        alert("Record Deleted successfully")
        this.getAllStudents();
      },
      error: (err) => {
        alert("Error in Deleting Student");
        console.log(err.message);
      }
    });
  }
}
