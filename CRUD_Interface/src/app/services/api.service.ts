import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //This service is going to do http calls
  //so it needs http client. then inject http client into the constructor
  //Remember to include HttpClientModule in the app.component
  constructor(private http: HttpClient) { }

  //A method for saving a student data to database
  //using http client post method
  //posting data of type any on this server
  HttpPostMethod(data: any){
    return this.http.post<any>("http://localhost:3000/api/Student/create/", data);
  }

  //A method for get students data from database
  //using http client get method
  //get data of type any on the server
  HttpGetMethod(){
    return this.http.get<any>("http://localhost:3000/api/Student/");
  }

  //A method for Updating a student data from database
  //using http client put method
  //put data of type any on the server
  HttpPutMethod(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/api/Student/update/"+id, data);
  }

  //A method for deleting a student data from database
  //using http client put method
  //put data of type any on the server
  HttpDeleteMethod(id: number){
    return this.http.delete<any>("http://localhost:3000/api/Student/delete/"+id);
  }

}
