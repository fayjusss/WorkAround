import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import {Bid} from "../../models/bid";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the BidInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bid-info',
  templateUrl: 'bid-info.html',
})
export class BidInfoPage {
  jobDetails: Bid;
  providerList: Observable<any>;
  jobList: Observable<any>;
  jobclosedList: Observable<any>;
  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, public navParams: NavParams, public modalCtrl: ModalController,public viewCtrl: ViewController,
  public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.jobDetails = this.navParams.data;
    this.providerList = this.afs.collection('users', ref => ref.where('id', '==', this.jobDetails.providerId)).valueChanges();
    this.jobList = this.afs.collection('jobs', ref => ref.where('jobId', '==', this.jobDetails.jobId)).valueChanges();

    console.log('ionViewDidLoad BidInfoPage');
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }

  accept(){
    this.viewCtrl.dismiss();
  }

}
