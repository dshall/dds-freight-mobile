import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scanedItem: any[] = [];
  options: BarcodeScannerOptions;

  constructor(
     public navCtrl: NavController,
     private barcodeScanner: BarcodeScanner) {

  }

  scanBarcode() {
    this.options = {
      prompt: "Scan Packages",
      showTorchButton: true
    }
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
