import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityWeatherCardComponent } from '../city-weather-card/city-weather-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TemperatureUnitToggleComponent } from '../temperature-unit-toggle/temperature-unit-toggle.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CityWeatherCardComponent,
    SearchBarComponent,
    DatePickerComponent,
    TemperatureUnitToggleComponent,
  ],
  template: `
    <div class="container mx-auto p-8 bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen">
      <h1 class="text-5xl font-extrabold text-center text-white mb-8">
        Weather Forecast
      </h1>

      <!-- Search and Filter Section -->
      <div class="flex justify-center space-x-6 mb-6">
        <app-search-bar (searchEvent)="onSearch($event)"></app-search-bar>
        <app-date-picker [(ngModel)]="selectedDate"></app-date-picker>
        <app-temperature-unit-toggle (unitChangeEvent)="onUnitToggle($event)"></app-temperature-unit-toggle>
      </div>

      <!-- City Weather Cards Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
        <app-city-weather-card
          *ngFor="let city of filteredCities"
          [city]="city"
          [unit]="selectedUnit"
          [selectedDate]="selectedDate"
          (cityClick)="onCityClick(city)"
        ></app-city-weather-card>
      </div>

      <!-- Forecast Section -->
      <div
        #forecastSection
        *ngIf="selectedCity"
        class="mt-8 bg-white p-6 rounded-xl shadow-xl transition-all duration-500 transform hover:scale-105"
      >
        <h3 class="text-3xl font-semibold text-center text-blue-700 mb-6">
          {{ selectedCity.city }} - Forecast
        </h3>

        <div *ngIf="!hasForecasts()" class="text-center text-red-500">
          No forecasts available for this city.
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          *ngIf="hasForecasts()"
        >
          <div
            *ngFor="let forecast of getFilteredForecasts()"
            class="bg-blue-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h4 class="text-xl font-semibold text-blue-500 mb-2">
              {{ forecast.date }}
            </h4>
            <p class="text-gray-700">
              Temperature: {{ getTemperature(forecast) }}°{{ selectedUnit }}
            </p>
            <p class="text-gray-700">Humidity: {{ forecast.humidity }}%</p>
          </div>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div *ngIf="isLoading" class="flex justify-center mt-6">
        <div
          class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"
        ></div>
      </div>
    </div>
  `,
})
export class WeatherListComponent implements OnInit, OnChanges {
  @ViewChild('forecastSection') forecastSection!: ElementRef;

  cities: any[] = [];
  filteredCities: any[] = [];
  selectedCity: any = null;
  selectedUnit: 'Celsius' | 'Fahrenheit' = 'Celsius';
  selectedDate: string = '';
  isLoading: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCitiesData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] || changes['selectedUnit']) {
      this.updateCityForecasts();
    }
  }

  loadCitiesData(): void {
    this.isLoading = true;

    fetch('http://localhost:4454/forecast')
      .then((response) => response.json())
      .then((data) => {
        this.cities = data;
        this.filteredCities = [...this.cities];
        this.updateCityForecasts();
      })
      .catch((error) => console.error('Error fetching weather data:', error))
      .finally(() => (this.isLoading = false));
  }

  onCityClick(city: any): void {
    this.selectedCity = city;
    this.scrollToForecast();
  }

  updateCityForecasts(): void {
    this.filteredCities.forEach((city) => {
      city.forecast?.forEach((forecast: any) => {
        forecast.temperature =
          this.selectedUnit === 'Celsius'
            ? forecast.temperatureCelsius
            : forecast.temperatureFahrenheit;
      });
    });
    this.cdr.detectChanges();
  }

  onSearch(cityName: string): void {
    this.filteredCities =
      cityName.trim() === ''
        ? [...this.cities]
        : this.cities.filter((city) =>
            city.city.toLowerCase().includes(cityName.toLowerCase())
          );
    this.updateCityForecasts();
  }

  onUnitToggle(unit: 'Celsius' | 'Fahrenheit'): void {
    this.selectedUnit = unit;
    this.updateCityForecasts();
  }

  hasForecasts(): boolean {
    return (
      this.selectedCity &&
      this.selectedCity.forecast &&
      this.selectedCity.forecast.length > 0
    );
  }

  getFilteredForecasts(): any[] {
    return this.selectedCity.forecast?.filter((forecast: any) =>
      this.selectedDate ? forecast.date === this.selectedDate : true
    );
  }

  getTemperature(forecast: any): string {
    return forecast.temperature || 'N/A';
  }

  scrollToForecast(): void {
    if (this.forecastSection) {
      this.forecastSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
