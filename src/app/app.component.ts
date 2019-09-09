import { Component, OnInit, AfterContentInit } from '@angular/core';
import { StockService } from './stock.service';
import { uniqBy, union, filter, find } from 'lodash';
import { NbSearchService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { ChartComponent } from './chart/chart.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StocksApp | Lighting fast updates';
  arrayData: {};
  newArrayData : {};
  value = '';
  constructor(private stockService: StockService,
    private searchService: NbSearchService,
    private windowService: NbWindowService) {
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      })
  }
  ngOnInit() {
    this.arrayData = [
      {name : 'Google',price : 100.032},
      {name : 'Facebook',price : 1200.032},
      {name : 'Yahoo',price : 1001.035},
      {name : 'Microsoft',price : 10.053},
      {name : 'Amazon',price : 230.032},
      {name : 'PayPal',price : 1020.032},
      {name : 'Air Asia',price : 10.032},
      {name : 'Spice Jet',price : 100.032},
      {name : 'Indigo',price : 1020.032},  
      {name : 'Exxon',price : 1009.032}
    ];
    this.newArrayData = [
      {name : 'Google',price : 100.032},
      {name : 'Facebook',price : 100.032},
      {name : 'Yahoo',price : 1001.035},
      {name : 'Microsoft',price : 11.053},
      {name : 'Amazon',price : 23.0322},
      {name : 'PayPal',price : 1020.0232},
      {name : 'Air Asia',price : 0.1032},
      {name : 'Spice Jet',price : 1500.1032},
      {name : 'Indigo',price : 14020.0352},  
      {name : 'Exxon',price : 109.0032}
    ];
    let filledStatus = this.computeStock(this.arrayData, this.newArrayData);
    this.arrayData = (uniqBy(union(filledStatus, this.arrayData), 'name'));
    

    //This would work if Websockets are live
    this.stockService.sendData.subscribe((value: {}) => {
      let filledStatus = this.computeStock(this.arrayData, value);
      this.arrayData = (uniqBy(union(filledStatus, this.arrayData), 'name'));
      
    });
  }

  public computeStock(previous, current) {
    let c = filter(current, function (o) {
      find(previous, function (p) {
        if (p.name == o.name) {
          if (p.price > o.price) {
            o.status = "danger";
            o.diff = p.price - o.price;
          }
          else if (p.price < o.price) {
            o.status = "success";
            o.diff = o.price - p.price;
          }
          o.time = new Date();
          return o;
        }
      });
      return current;
    });
    return c;
  }
  openWindow(data) {
    this.windowService.open(ChartComponent, { title: 'Line-Chart for : ' + data.name });
  }

}
