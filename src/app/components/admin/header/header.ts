import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../data/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private auth = inject(AuthService)
  loggedIn : boolean = false
  getStatus(){
    this.auth.getStatus().subscribe((user) => {
      if(user){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }
  logOut(){
    this.auth.logOut()
    alert("logged out")
  }

  ngOnInit() {
    this.getStatus()
  }
}
