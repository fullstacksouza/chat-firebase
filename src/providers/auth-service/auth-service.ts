import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { Promise } from 'firebase';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthServiceProvider {

  

  constructor(
    public http: Http,
    public auth:AngularFireAuth
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

    
    createAuthUser(user:{email:string,password:string}):firebase.Promise<FirebaseAuthState>{
      return this.auth.createUser(user);
    }

    signinWithEmail(user:{email:string,password:string}):firebase.Promise<boolean>{
      return this.auth.login(user)
      .then((authSate:FirebaseAuthState)=>{
        return authSate!=null;
      }).catch((error:Error)=>{
        console.log(error);
      });

    }
    
    logout():Promise<void>
    {
      return this.auth.logout()
      .then(()=>{
        console.log("Logout sucess")
      }).catch((error:Error)=>{
        console.log(error)
      });
    }

    get authenticated():Promise<boolean>
    {
      return new Promise((resolve,reject)=>{
        this.auth
        .subscribe((authSate:FirebaseAuthState)=>{
          let error:Error;
          (authSate) ? resolve(true) : reject(error);
        })
      })

    }
    
}
