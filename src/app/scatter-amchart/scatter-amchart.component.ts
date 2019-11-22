import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DataService, RpmData } from '../data.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-scatter-amchart',
  templateUrl: './scatter-amchart.component.html',
  styleUrls: ['./scatter-amchart.component.css']
})
export class ScatterAmchartComponent implements OnInit, AfterViewInit, OnDestroy {

  testData: RpmData[];
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRpmTestData()
      .subscribe((data: RpmData[]) => {
        this.testData = data;
        this.chart.data = data;
        this.chart.dataSource.load();
      });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('scatter', am4charts.XYChart);
      chart.data = this.testData;

      const valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxisX.title.text = 'Question 1';
      valueAxisX.renderer.minGridDistance = 100;
      valueAxisX.max = 5;
      valueAxisX.min = 0;

      const valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = 'Question 2';
      valueAxisY.max = 5;
      valueAxisY.min = 0;
      valueAxisY.tooltip.disabled = true;

      const lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.valueX = 'xValue';
      lineSeries.dataFields.valueY = 'yValue';
      lineSeries.strokeOpacity = 0;

      // lineSeries.tooltipText = 'Cosa';

      const bullet = lineSeries.bullets.push(new am4charts.Bullet());

      const circle = bullet.createChild(am4core.Circle);
      circle.horizontalCenter = 'middle';
      circle.verticalCenter = 'middle';
      circle.strokeWidth = 0;
      circle.fill = chart.colors.getIndex(0);
      circle.width = 12;
      circle.height = 12;
      circle.tooltipText = 'Lleve: {valueX.value} : {valueY.value}';
      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;

    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
