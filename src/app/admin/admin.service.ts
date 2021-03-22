import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 constructor(private http:HttpClient) { }
  addCategory(category:any):Observable<any>{
    console.log(category)
    return  this.http.post('http://localhost:8080/elearning/category',category)
  }
  getCategoryList():Observable<any>{
     return  this.http.get('http://localhost:8080/elearning/category')
  }
  deleteCategory(id:number):Observable<any>{
    return  this.http.delete('http://localhost:8080/elearning/category/'+id)
  }
  getCategory(id: number): Observable<Object> {  
        return this.http.get('http://localhost:8080/elearning/category/'+id);  
  }  
  updateCategory(id: number, category:any): Observable<Object> {  
      return this.http.put('http://localhost:8080/elearning/category/'+ id, category)
  }   
  getCategoryById(id:number):Observable<any>{
    return  this.http.get('http://localhost:8080/elearning/category/'+id);
  }


  getCourseBYId(id:number):Observable<any>{
    return  this.http.get('http://localhost:8080/elearning/courseid/'+id);
  }

  getCourseList():Observable<any>{
     return  this.http.get('http://localhost:8080/elearning/course')
  }
  addCourse(id:any,course:any):Observable<any>{
     console.log(id)
     console.log(course)
    return  this.http.post('http://localhost:8080/elearning/course/'+id,course)
  }
  deleteCourse(id:number):Observable<any>{
    return  this.http.delete('http://localhost:8080/elearning/course/'+id)
  }
  updateCourse(id: number, course:any): Observable<Object> {  
    return this.http.put('http://localhost:8080/elearning/course/'+ id, course)
  }
  
  

  getVideoList():Observable<any>{
    return  this.http.get('http://localhost:8080/elearning/video')
 }
  addVideo(id:any,video:any):Observable<any>{
    console.log(id)
    console.log("VIDEO=="+video)
   return  this.http.post('http://localhost:8080/elearning/video/'+id,video)
 }
 deleteVideo(id:number):Observable<any>{
   return  this.http.delete('http://localhost:8080/elearning/video/'+id)
 }
 updateVideo(id: number, video:any): Observable<Object> {  
   return this.http.put('http://localhost:8080/elearning/video/'+ id, video)
 } 
 getVideoById(id:number):Observable<any>{
  return  this.http.get('http://localhost:8080/elearning/video/'+id);
} 

getCourseByCatId(cId:any):Observable<any>{
  return  this.http.get('http://localhost:8080/elearning/display/'+cId);
}

getVideoByCourseId(cId:any):Observable<any>{
  console.log(cId)
  return  this.http.get('http://localhost:8080/elearning/videolist/'+cId);
}
getAllBlockUser():Observable<any>{
  return this.http.get('http://localhost:8080/elearning/blockuser/');
}


}