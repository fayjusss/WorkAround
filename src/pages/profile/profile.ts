import { Component } from '@angular/core';
import { App, IonicPage, NavController} from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  userProfile: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public app: App,
    public navCtrl: NavController,
    public authProvider: AuthData) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(auth => {
        this.userProfile = this.afs.collection
            ('users', ref => ref.where('id', '==', auth.uid))
            .valueChanges();
        console.log(this.userProfile);
    })
  }

  logoutUser(){
      this.authProvider.logoutUser().then( () => {
          this.app.getRootNav().setRoot('LoginPage');
      });
  }


  updateprofile(): void {
    this.navCtrl.push('ProfileupdatePage');
  }

}
