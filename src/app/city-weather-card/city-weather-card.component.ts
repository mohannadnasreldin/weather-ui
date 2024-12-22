import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-weather-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      (click)="onCityClick()" 
      class="cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg rounded-lg bg-white p-6"
    >
      <h2 class="text-2xl font-semibold text-center text-blue-500 mb-4">{{ city?.city || 'Unknown City' }}</h2>
      <p class="text-center text-gray-600">
        Temperature: 
        {{ city?.forecast?.[city.forecast.length - 1]?.['temperature' + unit] ?? 'N/A' }}°{{ unit }}
        </p>
    </div>
  `,
  styleUrls: ['./city-weather-card.component.css']
})
export class CityWeatherCardComponent {
  @Input() city: any;
  @Input() unit: 'Celsius' | 'Fahrenheit' = 'Celsius';
  @Input() selectedDate: string = '';
  @Output() cityClick = new EventEmitter();

  onCityClick() {
    this.cityClick.emit(this.city);
  }
}
