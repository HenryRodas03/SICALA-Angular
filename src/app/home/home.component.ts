import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../utilities/spinner/spinner.service';
import { HomeService } from './services/home.service';
import { AlertModalService } from '../utilities/alert-modal/alert-modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  applications: any[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private homeService: HomeService,
    private alertModalService: AlertModalService
  ) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.spinnerService.open();

    this.homeService
      .getApplications()
      .subscribe({
        next: (data: any) => {
          if (data['status']) {
            this.applications = data['data'];
          } else {
            this.alertModalService.open('Estado', data['message'], 3000);
          }

          this.spinnerService.close();
        },
        error: (error) => {
          this.spinnerService.close();
          console.log('err: ', error.message);
        },
      })
      .add(() => {
        this.spinnerService.close();
      });
  }

  toggleStatus(application: any) {
    application.state = application.state === 1 ? 0 : 1;
  }
}
