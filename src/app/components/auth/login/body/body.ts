import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../data/services/auth-service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-body',
  imports: [FormsModule],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  private auth = inject(AuthService)

  email : string = '';
  password : string = '';

  onSignin(){
    this.auth.logIn(this.email, this.password).then((UserCredential) =>{
      console.log("Log in succesfull", UserCredential.user)
      alert("Log in succesfull")
      localStorage.setItem('token', JSON.stringify(UserCredential.user))
    }).catch((error) => {
        console.error('Login failed:', error.message);
        alert("Something went wrong: " + error.message)
      });
  }
  getStatus(){
    this.auth.getStatus().subscribe((user) => {
      if(user){
        alert("User is logged in: " + user.email)
      } else {
        alert("No user is logged in.")
      }
    })
  }
}
