import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-stars-chart',
  templateUrl: './stars-chart.component.html',
  styleUrls: ['./stars-chart.component.scss']
})
export class StarsChartComponent implements OnInit, OnChanges {
  @Input()
  data: any = [];

  chart: Chart;
  constructor() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('renderChart', this.data  );
    this.updateChart();
  }

  updateChart() {
    this.chart.removeSerie(0);
    this.chart.addSerie(<Highcharts.SeriesOptions | any> {
      name: 'Rates',
      data: this.data
    });
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
