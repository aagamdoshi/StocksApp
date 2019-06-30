import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
const socket: any = webSocket("ws://stocks.mnet.website");

@Injectable({
  providedIn: 'root'
})
export class StockService {
  static stocks: { name: string; price: number; status: string; }[];
  dataRecieved = new Subject();
  sendData = new Subject();
  listLiveStock: {};

  constructor() {
    socket.subscribe(stockList => {
      this.dataRecieved.next(stockList);
    });

    this.dataRecieved.subscribe((value : (string | number)[][]) => {
      this.listLiveStock = value.map(function(x) { 
        return { 
          name: x[0], 
          price: x[1],
          time : new Date(),
          status : '',
          diff : 0 
        }; 
      });
      this.sendData.next(this.listLiveStock);
    });
  }
}
