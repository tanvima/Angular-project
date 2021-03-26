import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { AuthenticationService } from 'src/app/utilities/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = ("^((\\+91-?)|0)?[0-9]{10}$")
  isOTP = false;
  forgotPass = false
  forgotPassOTP = false
  currentIndex = 0
  otpmsg!: any
  errMsg: string = "";
  resetPass = false
  getOTP = false
  email = ""
  allUser!: any
  errMsgLogin: String = "";
  errMsgEmail: String = '';
  username = ''
  requestAdmin=false
  noOfAttempts=0
  user:any
  errMsgPassword=''
  errMsgLoginReg=''
  hide = true;
  constructor(private authservice: AuthenticationService, private router: Router, private us: UserService,
    public dialogRef: MatDialogRef<LoginComponent>) { }

  // loginForm!: FormGroup;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegx)]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegx)]),
    prime: new FormControl(''),

  });

  otpForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(6)]),

  });

  getEmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegx)])

  });

  forgotOTPForm = new FormGroup({
    otp: new FormControl('')
  });

  resetPassForm = new FormGroup({
    password: new FormControl('')
  });

  ngOnInit(): void {
    console.log("INIT")
    this.noOfAttempts=0
    this.us.getAllUser().subscribe(
      (data: any) => {
        this.allUser = data
      }
    )
  }
  loginUser() {
    this.user=this.allUser.find((user: any) => user.username == this.loginForm.value.username)
    console.log(this.user)
    if (this.user!=null) {
      if(this.user.status == 'unblock' && (this.user.noOfAttempts<=3 && this.noOfAttempts<3)) {
        console.log("helllo ",this.noOfAttempts)
        this.authservice.authneticate(this.loginForm.value.username, this.loginForm.value.password)
                .subscribe(
                  (data: any) => {
                    this.dialogRef.close();
                    this.us.clearNoOfAttempts(this.loginForm.value.username).subscribe((data) => {
                      console.log(data);
                    })

                    this.authservice.updateUserRole(data.roles[0])
                    this.authservice.updateCartSizeData()
                    // this.router.navigate(['/app'])
                    // if (data.roles[0] === 'ROLE_user') {
                    //   this.router.navigate(['/home'])
                    // }
                    if (data.roles[0] === 'ROLE_admin') {
                      // alert("admin")
                      console.log("adminq11232");
                      
                      this.router.navigate([{outlets: {admin: 'adminhome'}}])
                      
                    }
                    if (data.roles[0] === 'ROLE_user') {
                      // alert("user")
                      this.router.navigate(['/home'])
                    }
                  }, (err: any) => {
                    this.us.updateNoOfAttempts(this.loginForm.value.username).subscribe((data) => {
                      this.errMsgPassword="Invalid password"
                      this.noOfAttempts=data.msg
                      console.log("Number of attempts " ,this.noOfAttempts)
                     // this.loginForm.reset()
                      if(data.msg ==3){
                        console.log("Block")
                        this.us.blockUser((this.loginForm.value.username)).subscribe((data)=>{
                          this.user.staus='block'
                        })
                      }
                    })
                  })
      } else {
            this.requestAdmin=true;

          }
    } else {
      this.errMsgLogin = "Username does not exist"
      console.log(this.errMsgLogin)
    }
  }

  registerUser() {
    if (this.registrationForm.valid && this.errMsgLoginReg == '' && this.errMsgEmail == '') {
      let user = this.registrationForm.value
      this.username = this.registrationForm.value.username
      if (user.prime) {
        this.us.addUser(user, "prime").subscribe((data) => {
          this.isOTP = true
          this.us.sendOTP(this.registrationForm.value.email).subscribe((data) => {
            this.otpmsg = data.msg;
            console.log(this.otpmsg);

          })
        })
      } else {
        this.us.addUser(user, "regular").subscribe((data) => {
          this.isOTP = true
          this.us.sendOTP(this.registrationForm.value.email).subscribe((data) => {
            this.otpmsg = data.msg;
            console.log(this.otpmsg);
          })
        })
      }
    }
  }

  verifyOTP() {

    if (this.otpForm.value.otp === this.otpmsg) {
      console.log("Succesfull OTP")
      console.log(this.username)
      this.us.activateAccount(this.username).subscribe((data) => {
        console.log("Congrats!!!")
        this.ngOnInit()
      })
      this.registrationForm.reset()
      this.otpForm.reset()
      this.isOTP = false
      this.ngOnInit()
      this.currentIndex = 0
    } else {
      this.errMsg = "Wrong OTP"
      console.log("wrong otp")
    }

  }

  openForgotPass() {
    this.forgotPass = true
  }

  generateOTP() {

    this.forgotPassOTP = !this.forgotPassOTP
    this.getOTP = !this.getOTP
    this.us.sendOTP(this.getEmailForm.value.email).subscribe((data) => {
      this.otpmsg = data.msg;
      this.email = this.getEmailForm.value.email
      console.log(this.otpmsg);
      this.getEmailForm.reset()

    })
  }

  verifyForgotOTP() {
    if (this.forgotOTPForm.value.otp === this.otpmsg) {
      console.log("Succesfull OTP")
      this.resetPass = !this.resetPass
      this.getOTP = !this.getOTP
      this.forgotOTPForm.reset()
      this.isOTP = false
      this.currentIndex = 0
    } else {
      this.errMsg = "Wrong OTP"
      console.log(this.errMsg)
    }
  }

  resetPassword() {
    console.log(this.resetPassForm.value);
    //Call api to change password
    this.us.resetPassword(this.email, (this.resetPassForm.value)).subscribe(
      (data: any) => {
        this.forgotPassOTP = !this.forgotPassOTP
        this.forgotPass = !this.forgotPass
        this.resetPass = false
        this.getOTP = false

      }
    )

  }


  checkUsername() {
    if (this.allUser.find((user: any) => user.username == this.registrationForm.value.username)) {
      this.errMsgLoginReg = "Username exists"
      console.log(this.errMsgLoginReg)
    }
    else {
      this.errMsgLoginReg = ''
      console.log(this.errMsgLoginReg)
    }
  }

  checkEmail() {
    if (this.allUser.find((user: any) => user.email == this.registrationForm.value.email)) {

      this.errMsgEmail = "Email Exists"
      console.log(this.errMsgEmail)
    }
    else {
      this.errMsgEmail = ""
      console.log(this.errMsgEmail)
    }
  }

  requestAdminfun(){
   this.us.requestAdmin(this.user.username).subscribe((data)=>{
     console.log("Admin request sent")
     this.dialogRef.close();
   })
    
  }
}
