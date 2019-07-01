import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { StockService } from '../stock.service';
import {find} from 'lodash';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: Array.from({length: 15}, () => (Math.random()*100)), label: 'Selected Stock Line Chart' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.sendData.subscribe((value: {}) => {
      this.lineChartData = [
        { data: Array.from({length: 15}, () => (Math.random()*100)), label: 'Selected Stock Line Chart' },
      ];
    });
  }

}
