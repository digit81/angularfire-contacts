import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.user$ = this.afAuth.authState;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider, 'google');
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider, 'github');
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider, 'facebook');
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider, 'twitter');
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider, providerName: string) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        // this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user, providerName);
      })
      .catch((error) => this.handleError(error) );
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        // this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user, 'anonymous'); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }


  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user, 'email'); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user, 'email'); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      // .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }





  // login() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider )
  //     .then( _ => this.router.navigate([`/company-list`]))
  //     .catch( error => console.log('auth error', error) );
  // }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([`/home`]);
  }



  // Sets user data to firestore after succesful login
  private updateUserData(user: User, providerName: string) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      providerName: providerName
    };
    return userRef.set(data);
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    // this.notify.update(error.message, 'error');
  }
}
