import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FreightService } from '../../app/shared/services/freight.service';

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
  allFreightItems: any = [];
  scannedFreightItems: any = [];
  listScannedItems: any = [];
  missedScannedFreightItems: any = [];
  status: string = "scanned";
  totalFreightItems: number = 0;
  totalMissedScanned: number = 0;
  totalScanned: number = 0;
  statusScanned

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private viewCtrl: ViewController,
     private freightApiService: FreightService
    ) {

      //list all freight
      this.allFreightItems = this.navParams.get('allFreightList')

      this.scannedFreightItems = this.navParams.get('scannedList');

      this.missedScannedFreightItems = this.navParams.get('missedScanList')

      //total missed scans
      this.totalMissedScanned = this.missedScannedFreightItems.length;

      //total scanned freight
      this.totalScanned = this.scannedFreightItems.length

      //total freight list
      this.totalFreightItems = this.allFreightItems.length;


  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {

  }

}
