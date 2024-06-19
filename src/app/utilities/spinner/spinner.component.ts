import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SpinnerComponent {
  isLoading = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.isLoading.subscribe((state: boolean) => {
      this.isLoading = state;
    });
  }
}
