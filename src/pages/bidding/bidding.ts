import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Job} from "../../models/job";

/**
 * Generated class for the BiddingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
})
export class BiddingPage {

  jobDetails: Job
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.jobDetails = this.navParams.data;
  }

  closeModal() {
      this.viewCtrl.dismiss();
  }



}