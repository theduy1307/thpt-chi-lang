import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-notifications-dropdown-inner',
  templateUrl: './notifications-dropdown-inner.component.html',
  styleUrls: ['./notifications-dropdown-inner.component.scss'],
})
export class NotificationsDropdownInnerComponent implements OnInit {
  @Input() listThongBao:any = []
  extrasNotificationsDropdownStyle: 'light' | 'dark' = 'dark';
  activeTabId:
    | 'topbar_notifications_notifications'
    | 'topbar_notifications_events'
    | 'topbar_notifications_logs' = 'topbar_notifications_events';
  constructor(private layout: LayoutService, private router: Router,) {}

  ngOnInit(): void {
    this.extrasNotificationsDropdownStyle = this.layout.getProp(
      'extras.notifications.dropdown.style'
    );
  }

  setActiveTabId(tabId) {
    this.activeTabId = tabId;
  }

  getActiveCSSClasses(tabId) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active show';
  }
  routeToDetail(id:number){
    this.router.navigate([`/hoc-sinh/danh-sach-thong-bao/${id}`],{ queryParams: {} , skipLocationChange: true})
  }
  routeToList(){
    this.router.navigate([`/hoc-sinh/danh-sach-thong-bao`])
  }
}
