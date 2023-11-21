import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataService } from './services/chart-data.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexXAxis, ApexFill, ApexTooltip, ApexStroke, ApexLegend, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;

  constructor(private chartService: ChartDataService) { }

  chartOptions?: Partial<ChartOptions>;
  capacities1: number[] = [];
  capacities2: number[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.chartService.getChartData().subscribe({
      next: (res: any) => {
        console.log(res);
        const caps1 = this.getCapacities(res[0].Capacities);
        const cats = this.getCategories(res[0].Capacities);
        const caps2 = this.getCapacities(res[1].Capacities);
        this.capacities1 = caps1;
        this.categories = cats;
        this.capacities2 = caps2;
        this.initialiseChartOptions();
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }

  getCapacities(arr: any[]): number[] {
    const caps: number[] = [];
    arr.forEach(element => {
      caps.push(element.CountryAvg);
    });
    return caps;
  }

  initialiseChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: "India",
          data: this.capacities1
        },
        {
          name: "Pakistan",
          data: this.capacities2
        }
      ],
      chart: {
        type: 'bar',
        height: 400
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.categories
      },
      yaxis: {
        title: {
          text: "Country Average"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "CountryAvg: " + val;
          }
        }
      }
    };
  }


  getCategories(arr: any[]): string[] {
    const categories: string[] = [];
    arr.forEach(element => {
      categories.push(element.CapacityName);
    });
    return categories;
  }

}
