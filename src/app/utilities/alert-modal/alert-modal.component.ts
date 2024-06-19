import { Component, Input, OnInit } from '@angular/core';
import { AlertModalService } from './alert-modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss',
})
export class AlertModalComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() timeout: number = 0;
  isVisible: boolean = false;

  constructor(private alertModalService: AlertModalService) {}

  ngOnInit(): void {
    this.alertModalService.modalConfig.subscribe((config) => {
      this.title = config.title;
      this.content = config.content;
      this.timeout = config.timeout;
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, this.timeout);
    });
  }
}
