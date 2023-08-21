import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  template: `
    <nz-select
      [ngModel]="selectedValues"
      nzMode="multiple"
      (ngModelChange)="onSelectionChange($event)"
    >
      <nz-option *ngFor="let option of options" [nzValue]="option.value">
        {{ option.label }}
      </nz-option>
    </nz-select>
    <div class="select-all-container">
      <label nz-checkbox [(ngModel)]="allSelected" (click)="onSelectAll()"
        >{{ allSelected ? '取消' : '全' }}选</label
      >
    </div>
  `,
  styleUrls: ['./custom-select.component.css'],
})
export class CustomSelectComponent implements OnInit {
  @Input() options: any[] = []; // 选项列表
  @Output() selectionChange = new EventEmitter<any[]>(); // 当选择发生改变时输出新的选择值

  selectedValues: any[] = []; // 已选择的选项列表
  allSelected = false; // 是否已全选

  constructor() {}

  ngOnInit(): void {}

  /**
   * 当选择发生改变时触发此函数
   * @param values
   */
  onSelectionChange(values: any[]): void {
    this.selectedValues = values;
    this.emitSelectionChange();
  }

  /**
   * 当全选状态发生改变时触发此函数
   */
  onSelectAll(): void {
    if (this.allSelected) {
      this.selectedValues = [];
    } else {
      this.selectedValues = [...this.options.map((option) => option.value)];
    }
    this.allSelected = !this.allSelected;
    this.emitSelectionChange();
  }

  /**
   * 当单个选项发生改变时触发此函数
   * @param optionValue
   * @param isChecked
   */
  onOptionSelect(optionValue: any, isChecked: boolean): void {
    if (isChecked && !this.selectedValues.includes(optionValue)) {
      this.selectedValues.push(optionValue);
    }
    if (!isChecked && this.selectedValues.includes(optionValue)) {
      const index = this.selectedValues.findIndex(
        (value) => value === optionValue
      );
      this.selectedValues.splice(index, 1);
    }
    this.allSelected = this.selectedValues.length === this.options.length;
    this.emitSelectionChange();
  }

  /**
   * 发出选择改变事件
   */
  private emitSelectionChange(): void {
    this.selectionChange.emit(this.selectedValues);
  }
}
