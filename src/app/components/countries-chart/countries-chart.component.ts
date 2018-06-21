import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Chart } from 'angular-highcharts';
import COUNTRIES from '../../models/countries.model';

@Component({
  selector: 'app-countries-chart',
  templateUrl: './countries-chart.component.html',
  styleUrls: ['./countries-chart.component.scss']
})
export class CountriesChartComponent implements OnInit, OnChanges {
  @Input()
  data: any = [];

  chart: Chart;
  constructor() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

  updateChart() {
    this.chart.removeSerie(0);
    this.chart.addSerie(<Highcharts.SeriesOptions | any> {
      name: 'Reviews',
      colorByPoint: true,
      data: this.data
    });
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
        pointFormat: '{point.fullName}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.fullName}</b>: {point.percentage:.1f} %',
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
