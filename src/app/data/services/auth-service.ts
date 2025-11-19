import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth)

  logIn(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  signUp(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  logOut(){
    return signOut(this.auth)
  }

  getCurent():Observable<User | null>{
    return user(this.auth)
  }

  getStatus():Observable<User | null>{
    return authState(this.auth)
  }
}
