import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllUser(){

  }

  getAllCourses():Observable<any>{
    return this.http.get(environment.baseUserUrl+'/course')
  }

  getAllCategories():Observable<any>{
    return this.http.get(environment.baseUserUrl+'/category')
  }

  getAllCertificate(){

  }

  getPopularCourse(){
    return  this.http.get(environment.baseUserUrl+'/popularCourse')
   }

}
