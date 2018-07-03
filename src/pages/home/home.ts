import { Component } from '@angular/core';
import { NavController, ModalController, ToastController, Platform } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { FreightPage } from '../freight/freight';
import { FreightService } from '../../app/shared/services/freight.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allFreightList: any = [];
  freightList:any = [];
  scannedFreightItems: any = [];
  missedScannedFreightItems: any = [];
  totalMissed: number;
  fountItem: any = '';
  scannedItemsTotal: number = 0;
  scannedFreightItem: any = '';
  matchFound: boolean = false;
  options: BarcodeScannerOptions;
  scannedBarcode: any;
  constructor(
     public navCtrl: NavController,
     private modalCtrl: ModalController,
     private toastCtrl: ToastController,
     private barcodeScanner: BarcodeScanner,
     public _platform: Platform,
     private freightApiService: FreightService
    ) {
     //get all freight from api
      this.listAllFreight()
    }
 //call to api to get a list of freight
  listAllFreight() {
    this.freightApiService.getFreightList('6412')
    .subscribe(freight => {
      this.allFreightList = freight;
      // this.freightList = this.allFreightList;
      console.log('All Orders', this.allFreightList)
    });
   }

  viewFreightItemsModal() {
    let scannedItemsModal = this.modalCtrl.create(FreightPage, {
        scannedList: this.scannedFreightItems,
        missedScanList: this.missedScannedFreightItems,
        allFreightList: this.allFreightList
    });
    scannedItemsModal.present();
  }

  findByTicketNo(element, index, array){
    for(let i = 0; i < array.length; i++){
      let objPropertyIndex = array[i][index];
        if(objPropertyIndex === element){
          return array[i]
        }
    }
    this.matchFound = false;
    // let toastSuccessOption = this.toastCtrl.create({
    //   message: 'This job is not in the system',
    //   duration: 1500,
    //   position: 'top'
    // });

    // toastSuccessOption.present();

    return false
 }

 missScannedList(element, index, array) {
   for(let i = 0; i < array.length; i++){
      let objPropertyIndex = array[i][index];
        if(objPropertyIndex === element){
          let  arrayObj = array[i];
          let missScans: any[] =  array.pop(arrayObj);
          console.log('Lookup and Pop', missScans)
          return missScans;
        }
   }
   return false
 }


  scanBarcode() {

    this.options = {
      orientation: 'portrait',
      prompt: "Scan Packages",
      showTorchButton: true,
      disableSuccessBeep: false,
    }

      this.barcodeScanner.scan(this.options).then(barcodeData => {

        this.scannedFreightItem = this.findByTicketNo(barcodeData.text, 'TicketNo', this.allFreightList);
        let scanAlreadyExist = this.scannedFreightItems.includes(this.scannedFreightItem);
        console.log('Ticket No',this.scannedFreightItem.TicketNo)
        if(this.scannedFreightItems !== null && !scanAlreadyExist) {
        if(this.scannedFreightItem !== undefined) {



          //set div to true to display results
          this.matchFound = true;
          //add the scanned Freight item to an array of items
          this.scannedFreightItems.push(this.scannedFreightItem);
         //missed Scanned
          this.missedScannedFreightItems =  this.missScannedList(barcodeData.text, 'TicketNo', this.allFreightList);

          if(this.missedScannedFreightItems.length !== 0){
            Object.keys(this.missedScannedFreightItems).forEach(key => {
              let ticket = this.missedScannedFreightItems[key].TicketNo;

              console.log('Missed Scanned Ticket', ticket)
            })
          }

        if(this.scannedFreightItems.length != 0) {
            this.scannedItemsTotal = this.scannedFreightItems.length;
         }

          let toastSuccessOption = this.toastCtrl.create({
            message: 'Found Ticket',
            duration: 1500,
            position: 'top'
          });

          toastSuccessOption.present();

          } else {
                this.matchFound = false;
                this.matchFound = true;
                let toastSuccessOption = this.toastCtrl.create({
                  message: 'Could Not Find Ticket in Our System',
                  duration: 1500,
                  position: 'top'
                });

                toastSuccessOption.present();
            }
        }
        else {
          let toastSuccessOption = this.toastCtrl.create({
            message: 'Ticket' + '\xa0' + this.scannedFreightItem.TicketNo + '\xa0' + 'Already Scanned',
            duration: 3000,
            position: 'top'
          });

          toastSuccessOption.present();

        }

      }).catch(error => {
        let toastScannedOption = this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'top'
        });
        toastScannedOption.present();

        console.log('Error Scanning', error);
    });
  }

  ionViewDidLoaded(){

  }
}
