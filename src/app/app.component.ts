import { Component } from '@angular/core';
import { WeatherListComponent } from './weather-list/weather-list.component';

@Component({
  selector: 'app-root',
  imports: [WeatherListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-ui';
}
