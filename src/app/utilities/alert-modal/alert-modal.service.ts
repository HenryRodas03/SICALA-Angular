import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ModalConfig {
  title: string;
  content: string;
  timeout: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  private modalConfigSubject = new BehaviorSubject<ModalConfig>({
    title: '',
    content: '',
    timeout: 0,
  });
  modalConfig = this.modalConfigSubject.asObservable();

  constructor() {}

  open(title: string, content: string, timeout: number) {
    this.modalConfigSubject.next({ title, content, timeout });
  }
}
