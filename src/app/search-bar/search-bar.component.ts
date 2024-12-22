import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input 
      type="text" 
      placeholder="Search for a city..." 
      class="p-2 border rounded" 
      (input)="onSearchChange($event)" />
  `,
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(event: any) {
    this.searchEvent.emit(event.target.value);
  }
}
