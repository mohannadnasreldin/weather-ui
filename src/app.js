// Import Angular core and necessary libraries
const { Component, NgModule, platformBrowserDynamic } = window.ng.core;
const { BrowserModule } = window.ng.platformBrowser;

// Define the WeatherListComponent class
class WeatherListComponent {
  constructor() {
    this.cities = [];
    this.selectedCity = null;
    this.loadCitiesData();
  }

  loadCitiesData() {
    // Use fetch API to load the weather data
    fetch('http://localhost:4454/forecast')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.cities = data;
      })
      .catch((error) => console.error('Error fetching weather data:', error.message));
  }

  onSelectCity(cityId) {
    // Fetch city data using the fetch API
    fetch(`http://localhost:4454/cityForecast/${cityId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.selectedCity = data;
      })
      .catch((error) => console.error('Error fetching city forecast:', error.message));
  }
}

// Declare the Angular component
WeatherListComponent.ɵcmp = /*@__PURE__*/ window.ng.core.ɵɵdefineComponent({
  type: WeatherListComponent,
  selectors: [['app-weather-list']],
  decls: 3,
  vars: 1,
  template: function (rf, ctx) {
    if (rf & 1) {
      window.ng.core.ɵɵelementStart(0, 'div');
      window.ng.core.ɵɵelementStart(1, 'h1');
      window.ng.core.ɵɵtext(2, 'Weather Forecast');
      window.ng.core.ɵɵelementEnd();
      window.ng.core.ɵɵelementStart(3, 'ul');
      window.ng.core.ɵɵtemplate(4, function (rf2, city) {
        if (rf2 & 1) {
          window.ng.core.ɵɵelementStart(0, 'li');
          window.ng.core.ɵɵlistener('click', function () {
            return ctx.onSelectCity(city.id);
          });
          window.ng.core.ɵɵtext(1, '');
          window.ng.core.ɵɵelementEnd();
        }
        if (rf2 & 2) {
          window.ng.core.ɵɵadvance(1);
          window.ng.core.ɵɵtextInterpolate(city.name);
        }
      }, 2, 1, 'li', []);
      window.ng.core.ɵɵelementEnd();
      window.ng.core.ɵɵelementEnd();
    }
    if (rf & 2) {
      window.ng.core.ɵɵadvance(3);
      window.ng.core.ɵɵproperty('ngForOf', ctx.cities);
    }
  },
  encapsulation: 2,
});

// Create a simple Angular module and bootstrap the app
const AppModule = /*@__PURE__*/ NgModule({
  declarations: [WeatherListComponent],
  imports: [BrowserModule],
  bootstrap: [WeatherListComponent],
})(class {});

// Bootstrap the Angular app
platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => {
  console.error('Error bootstrapping Angular application:', err.message);
});
