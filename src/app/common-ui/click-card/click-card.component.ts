import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { EmployeeListModel } from '../../common/models/employee/employee-list.model';
import { MenuComponent } from '../../modules/menu/menu.component';
@Component({
  selector: 'f-click-card',
  templateUrl: './click-card.component.html',
  styleUrls: ['./click-card.component.css']
})
export class ClickCardComponent implements OnInit {
  @Input() employee?: EmployeeListModel;
  @ViewChild(MenuComponent, { static: false }) menuComponent!: MenuComponent;
  @Input() isCardVisible = false;
  @Output() isCardVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isToggleCard = false;
  @Input() onInfo!: Function;
  @Input() logout!: Function;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() { }

  toggleCard = () => {
    this.isToggleCard = true;
    this.isCardVisible = !this.isCardVisible;
    this.isCardVisibleChange.emit(this.isCardVisible);
  }

  onCardClick = (event: MouseEvent) => {
    // 阻止事件冒泡，避免点击卡片内部时隐藏卡片
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick = (event: MouseEvent) => {
    if (this.isToggleCard) {
      this.isToggleCard = false;
      return;
    }
    if (
      this.isCardVisible &&
      !this.elRef.nativeElement.contains(event.target)
    ) {
      this.isCardVisible = false;
      this.isCardVisibleChange.emit(this.isCardVisible);
    }
  }

}
