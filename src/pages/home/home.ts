import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { FreightPage } from '../freight/freight';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scannedFreightItem: any[] = [];
  scannedItemsTotal: number = 0;
  options: BarcodeScannerOptions;


  constructor(
     public navCtrl: NavController,
     private modalCtrl: ModalController,
     private barcodeScanner: BarcodeScanner,
     public _platform: Platform) {

  }

  viewFreightItemsModal() {
    let scannedItemsModal = this.modalCtrl.create(FreightPage, {
        scannedItems: this.scannedFreightItem
    });
    scannedItemsModal.present();
  }
  scan(){
    let count = 1
    count = this.scannedItemsTotal++
    if(this.scannedFreightItem != null){
          this.scannedFreightItem.push(count)
    console.log('Scanned Items',count)
    }

  }
  scanBarcode() {
    this.options = {
      prompt: "Scan Packages",
      showTorchButton: true
    }

    if(this._platform.is('cordova')){
      this.barcodeScanner.scan(this.options).then(barcodeData => {
      if(barcodeData != null){
      this.scannedFreightItem.push(barcodeData);
      console.log('ArrayItems',this.scannedFreightItem)
      this.scannedItemsTotal = this.scannedFreightItem.length;
      console.log('Barcode data list:', this.scannedItemsTotal);
      }
     }).catch(err => {
         console.log('Error', err);
     });
    } else {
      return alert('You are using windows browser')
    }

  }
}
