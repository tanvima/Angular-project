import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPopularCourse(){
   return  this.http.get(environment.baseUserUrl+'/popularCourse')
  }

  getAllCourse(): Observable<any>{
    return this.http.get(environment.baseUserUrl+'/course')
  }

  getAllCategory(): Observable<any>{
    return this.http.get(environment.baseUserUrl+'/category')
  }

  getCourseByCat(id:number):Observable<any>{
    return this.http.get(environment.baseUserUrl+'/course/'+id)
  }

  getCourseById(id:number):Observable<any>{
    return this.http.get(environment.baseUserUrl+'/courseid/'+id)
  }
  getVideoList(courseid:number): Observable<any>{
    return this.http.get(environment.baseUserUrl+'/video/'+courseid)
  }

  getString():Observable<any>{
    return this.http.get(environment.baseUserUrl+'/getstring');
  }
}


