import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
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
    signOut(this.auth)
    localStorage.clear()
  }

  getCurent(): string | null {
    const auth = getAuth()
    const user = auth.currentUser
    if(user !== null){
      return user.email
    }else{
    return null}
  }

  getStatus():Observable<User | null>{
    return authState(this.auth)
  }
}
