import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as _ from 'lodash';

@Component({
  selector: 'app-stars-chart',
  templateUrl: './stars-chart.component.html',
  styleUrls: ['./stars-chart.component.scss']
})
export class StarsChartComponent implements OnInit, OnChanges {
  @Input() data: any = [];

  public chart: Chart;
  private isReady: boolean = false;

  constructor() {
    this.isReady = true;
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReady && this.data && this.data.length) {
      this.updateChart();
    }
  }

  updateChart() {
    this.isReady = false;

    this.chart.removeSerie(0);
    this.chart.addSerie(<Highcharts.SeriesOptions | any> {
      name: 'Rates',
      data: this.data
    });

    setTimeout(() => {
      this.isReady = true;
    }, 2000);
  }

  renderChart() {
    this.chart = new Chart(<Highcharts.Options | any> {
      chart: {
        type: 'bar',
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0)',
      },
      title: {
        text: 'Rates'
      },
      xAxis: {
        categories: ['5', '4', '3', '2', '1'],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          enabled: false
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Rates',
        data: [107, 31, 635, 203, 2]
      }]
    });
  }

  ngOnInit() {
  }

}
