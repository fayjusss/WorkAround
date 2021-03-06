import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  Loading,
  LoadingController, } from 'ionic-angular';
import { Job } from "../../models/job";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { AccpetBidInfoPage } from "../accpet-bid-info/accpet-bid-info";
import { MessengerProvider } from '../../providers/messenger/messenger';
import { MessengerPage } from "../messenger/messenger";


@IonicPage()
@Component({
  selector: 'page-accept-bid',
  templateUrl: 'accept-bid.html',
})
export class AcceptBidPage {
  jobDetails: Job;
  mybidList: Observable<any>;
  bidderList: Observable<any>;
  public loading: Loading;

  constructor(
    public messengerProvider: MessengerProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public afs: AngularFirestore
  ) {

  }

  ionViewDidLoad() {
    this.jobDetails = this.navParams.data;
    this.afAuth.authState.take(1).subscribe(auth => {

        this.mybidList = this.afs.collection
            ('bids', ref => ref.where('providerId','==',auth.uid).where('jobId','==',this.jobDetails.jobId))
            .valueChanges();


    })
    console.log('ionViewDidLoad AcceptBidPage');
  }

  getName(seekerID: string) {
    this.bidderList = this.afs
      .collection('users', ref => ref.where('id', '==', seekerID))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          console.log(data.name.toString());
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      });
    return this.bidderList.toString();
  }

  presentBidInfo(mybidList){
    let bidinfoModal = this.modalCtrl.create(AccpetBidInfoPage, mybidList);
    bidinfoModal.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openNewChat(jobDetails) {
    console.log(jobDetails)
    var newChatId = this.messengerProvider.generateNewId();
    this.messengerProvider.createNewChat(newChatId, jobDetails.providerId)
    .then( data => {
      this.loading.dismiss().then( () => {
        this.navCtrl.push('MessengerPage', {
          chatId: newChatId
        });
        // Closes the new-dialogue modal
        this.closeModal();
      })
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

}
