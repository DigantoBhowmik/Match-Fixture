import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FixtureService } from '../services/fixture/fixture.service';
import {
  FixtureDto
} from "../services/fixture/fixture.model";
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit{
  // public forecasts: WeatherForecast[] = [];
  fixtures: FixtureDto[] = [];

  constructor(http: HttpClient, private fixtureService: FixtureService)
    // @Inject('BASE_URL') baseUrl: string) 
     {
    // http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
    //   this.forecasts = result;
    // }, error => console.error(error));
  }
  ngOnInit(): void {
    this.getFixtures();
  }
  getFixtures(){
    this.fixtureService.genarateFixture().subscribe(result => {
      this.fixtures = result;
    })
  }
}

// interface WeatherForecast {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

