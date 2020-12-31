// import { OnDestroy, OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { Observable } from 'rxjs'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

// import { SubSink } from 'subsink'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
// export class CurrentWeatherComponent implements OnInit, OnDestroy {
export class CurrentWeatherComponent {
  // @Input() current: ICurrentWeather | undefined
  // current: ICurrentWeather | undefined
  current$: Observable<ICurrentWeather>
  // private subscriptions = new SubSink()

  constructor(private weatherService: WeatherService) {
    this.current$ = weatherService.currentWeather$
    // this.current = {
    //   city: 'Bethesda',
    //   country: 'US',
    //   date: 0,
    //   image: 'assets/img/sunny.svg',
    //   temperature: 72,
    //   description: 'sunny',
    // } as ICurrentWeather
  }

  // ngOnInit(): void {
  //   // this.weatherService
  //   //   .getCurrentWeather('Budapest', 'HU')
  //   //   .subscribe((data) => (this.current = data))
  //   // this.weatherService.currentWeather$.subscribe((data) => (this.current = data))
  //   // this.subscriptions.add(
  //   //   this.weatherService.currentWeather$.subscribe((data) => (this.current = data))
  //   // )
  // }

  // ngOnDestroy(): void {
  //   // this.subscriptions.unsubscribe()
  // }

  getOrdinal(date: number): string {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }
}
