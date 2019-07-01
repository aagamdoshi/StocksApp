import { Component, OnInit } from '@angular/core';
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
