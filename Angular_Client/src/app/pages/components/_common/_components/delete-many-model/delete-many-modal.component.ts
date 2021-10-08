import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-delete-many-modal',
  templateUrl: './delete-many-modal.component.html',
  styleUrls: ['./delete-many-modal.component.scss']
})
export class DeleteManyModalComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() message: string;
  @Input() loadingMsg?: string;
  @Input() submitButtonMsg: string;
  @Input() cancelButtonMsg: string;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
