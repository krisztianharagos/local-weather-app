import { Component, OnInit } from '@angular/core'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather | undefined
  constructor(private weatherService: WeatherService) {
    // this.current = {
    //   city: 'Bethesda',
    //   country: 'US',
    //   date: 0,
    //   image: 'assets/img/sunny.svg',
    //   temperature: 72,
    //   description: 'sunny',
    // } as ICurrentWeather
  }

  ngOnInit(): void {
    this.weatherService
      .getCurrentWeather('Budapest', 'HU')
      .subscribe((data) => (this.current = data))
  }
}
