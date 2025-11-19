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

  onSignup(){
    this.auth.signUp(this.email, this.password).then((UserCredential) =>{
      console.log("Account Created!", UserCredential.user)
    }).catch((error) => {
        console.error('Login failed:', error.message);
      });
  }
}
