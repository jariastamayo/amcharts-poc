import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Item {
  name: string;
  value: number;
  abs: number;
}

export interface SalePair {
  GrLivArea: number,
  SalePrice: number
}

export interface RpmData {
  scatterPlotID: number,
  xValue: number,
  yValue: number,
  isSelfDot: boolean,
  isPeerDot: boolean,
  fiscalYear: number,
  legend: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private testDataUrl = 'assets/test-data.json';

  constructor(private http: HttpClient) { }

  private generateRandomValue(start: number, end: number) {
    return Math.ceil(Math.random() * (end - start) + start);
  }

  getRpmTestData() {
    return this.http.get<RpmData[]>(this.testDataUrl);
  }
}
