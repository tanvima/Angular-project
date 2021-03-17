import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginStatus = new BehaviorSubject<boolean>(false)
  username = new BehaviorSubject<any>(sessionStorage.getItem('username'))
  userrole= new BehaviorSubject<any>(sessionStorage.getItem('userrole'))
  userid= new BehaviorSubject<any>(sessionStorage.getItem('userid'))
  usertype= new BehaviorSubject<any>(sessionStorage.getItem('usertype'))

  constructor(private http: HttpClient) { }

  authneticate(username:string,password:string){
    return this.http.post("http://localhost:8080/auth/authenticate",{username,password})
    .pipe(
      map((userdata:any)=>{
        sessionStorage.setItem('username',userdata.username)
        sessionStorage.setItem('userrole',userdata.roles[0])
        sessionStorage.setItem('userid',userdata.id)
        sessionStorage.setItem('usertype',userdata.type)
        sessionStorage.setItem('token','Bearer '+userdata.token)

        this.loginStatus.next(true)
        this.username.next(sessionStorage.getItem('username'))
        this.userrole.next(sessionStorage.getItem('userrole'))
        this.userid.next(sessionStorage.getItem('userid'))
        this.usertype.next(sessionStorage.getItem('usertype'))

        return userdata
      }))
    
      }

      isLoggedIn(){
        let user = sessionStorage.getItem('username')
        return !(user===null)
      }
    
      logout(){
        this.loginStatus.next(false)
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("userrole")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("userid")
        sessionStorage.removeItem("usertype")
    
        this.username.next(null)
        this.userrole.next(null)
        this.loginStatus.next(false)
        this.userid.next(null)
        this.usertype.next(null)
        
      }
}
