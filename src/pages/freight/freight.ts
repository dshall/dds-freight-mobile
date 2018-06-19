import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FreightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-freight',
  templateUrl: 'freight.html',
})
export class FreightPage {
  scannedFreightitems: any[] = [];
  status: string = "scanned";

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private viewCtrl: ViewController
    ) {
      this.scannedFreightitems = this.navParams.get('scannedItems')
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FreightPage');
  }

}
