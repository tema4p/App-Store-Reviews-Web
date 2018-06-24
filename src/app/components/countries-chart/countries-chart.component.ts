import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-countries-chart',
  templateUrl: './countries-chart.component.html',
  styleUrls: ['./countries-chart.component.scss']
})
export class CountriesChartComponent implements OnInit, OnChanges {
  @Input() data: any = [];

  public chart: Chart;

  constructor() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart.ref) {
      this.chart.ref.series[0].update({data: this.data}, true);
    }
  }

  renderChart() {
    this.chart = new Chart(<Highcharts.Options | any> {
      chart: {
        height: 200,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        type: 'pie'
      },
      title: {
        text: 'Reviews By Countries'
      },
      tooltip: {
        pointFormat: '{point.fullName}: <b>{point.percentage:.0f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.fullName}</b>: {point.percentage:.0f} %',
          }
        }
      },
      series: [{
        name: 'Reviews',
        colorByPoint: true,
        data: this.data
      }],
    });
  }

  ngOnInit() {
  }

}
