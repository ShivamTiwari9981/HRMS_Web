import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  imports: [MatIcon,RouterModule,MatTooltipModule]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() icon = 'person';
  @Input() breadcrumbs: Array<{ label: string; icon?: string; url?: string }> = [];
  @Input() showClose = true;
  @Input() closeTooltip = 'Go back';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
