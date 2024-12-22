import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temperature-unit-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center">
      <label for="unit" class="mr-2">Unit:</label>
      <select id="unit" class="p-2 border rounded" (change)="onUnitChange($event)">
        <option value="Celsius">Celsius</option>
        <option value="Fahrenheit">Fahrenheit</option>
      </select>
    </div>
  `,
})
export class TemperatureUnitToggleComponent {
  @Output() unitChangeEvent = new EventEmitter<'Celsius' | 'Fahrenheit'>();

  onUnitChange(event: any) {
    this.unitChangeEvent.emit(event.target.value);
  }
}
