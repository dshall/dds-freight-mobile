import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FreightPage } from './freight';
import { FreightService } from '../../app/shared/services/freight.service';

@NgModule({
  declarations: [
    FreightPage,
  ],
  imports: [
    IonicPageModule.forChild(FreightPage),
  ],
  providers: [
    FreightService
  ]
})
export class FreightPageModule {}
