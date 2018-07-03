import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.services';
import { Observable } from 'rxjs';


@Injectable()

export class FreightService {
  constructor(private apiService:ApiService){}

  getFreight(id: string): Observable<any>{
    return this.apiService.get('/OutstandingJobs/' + id);
  }

  getFreightList(id: string): Observable<any>{
   return  this.apiService.get('/OutstandingJobs/'+id);
  }

  updateFreightStatus(id: string): Observable<any>{
   return this.apiService.update('/OutstandingJobs/' + id);
  }


  // getFreight(id: string, ticketNo: any): Observable<any>{
  //   return this.apiService.get('/OutstandingJobs?CourierId=' + id + '&TicketNo=' + ticketNo);
  // }

  // getFreightList(id: string): Observable<any>{
  //  return  this.apiService.get('/OutstandingJobs?CourierId='+id);
  // }

  // updateFreightStatus(id: string): Observable<any>{
  //  return this.apiService.update('/OutstandingJobs?Ticket=' + id);
  // }
}
