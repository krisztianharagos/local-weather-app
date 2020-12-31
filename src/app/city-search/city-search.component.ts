import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime, filter, tap } from 'rxjs/operators'

import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent {
  search = new FormControl('', [Validators.minLength(2)])
  constructor(private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        filter(() => !this.search.invalid),
        tap((searchValue) => this.doSearch(searchValue))
      )
      .subscribe()
  }
  // @Output() searchEvent = new EventEmitter<string>()

  // ngOnInit(): void {
  //   // this.search.valueChanges.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
  //   //   if (!this.search.invalid) {
  //   //     // this.searchEvent.emit(searchValue)
  //   //     const userInput = searchValue.split(',').map((s) => s.trim())
  //   //     // this.weatherService
  //   //     //   .getCurrentWeather(
  //   //     //     userInput[0],
  //   //     //     userInput.length > 1 ? userInput[1] : undefined
  //   //     //   )
  //   //     //   .subscribe((data) => console.log(data))
  //   //     this.weatherService.updateCurrentWeather(
  //   //       userInput[0],
  //   //       userInput.length > 1 ? userInput[1] : undefined
  //   //     )
  //   //   }
  //   // })
  // }

  doSearch(searchValue: string): void {
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined

    this.weatherService.updateCurrentWeather(searchText, country)
  }

  getErrorMessage(): string {
    return this.search.hasError('minlength')
      ? 'Type more than one character to search'
      : ''
  }
}
