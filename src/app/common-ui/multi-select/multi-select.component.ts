import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { isUndefined } from 'lodash-es';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() selectOptions!: any[];  // 传入要渲染的下拉列表数据
  @Input() placeholder: string = '请选择';  // 设置 select 的占位符文本
  @Output() onChange = new EventEmitter();  // 触发值改变事件

  selectedValues: any[] = [];
  isVisible = false;
  isShowSelectAll = false;

  constructor() {}

  writeValue(obj: any[]): void {
    console.log('writeValue')
    this.selectedValues = obj || [];
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange')
    this.onChange.subscribe((selectedValues) => fn(selectedValues));
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched')
    // not implemented
  }

  onSelectedValuesChanged(selectedValues: any[]) {
    console.log('onSelectedValuesChanged')
    this.selectedValues = selectedValues || [];

    if (this.selectedValues.indexOf('selectAll') !== -1) {
      // 当选中全选选项时
      this.selectedValues = this.selectOptions.map(item => item.value);  // 将所以选项value添加到已选择的数组中
      this.onChange.emit(this.selectedValues);
    } else {
      if (selectedValues.length === this.selectOptions.length) {
        // 当所有选项都被选中时，显示Select All
        this.isShowSelectAll = true;
      } else {
        this.isShowSelectAll = false;
        this.onChange.emit(this.selectedValues);
      }
    }
  }

  openDropdown(selectCmp: NzSelectComponent) {
    console.log('openDropdown')
    this.isVisible = true;

    if (this.selectOptions) {
      const selectAllOption = { label: 'Select All', value: 'selectAll' };
      let optionsWithSelectAll = [...this.selectOptions];

      if (!isUndefined(this.selectOptions[0].value)) {
        // 如果选项有数值，则首先添加select_all作为字符串
        console.log(this.selectOptions[0].value)
        if(this.selectOptions[0].value != 'selectAll'){
          optionsWithSelectAll.unshift(selectAllOption);

        }
      } else {
        // 在非数字选项列表的情况下，只需推入一个对象
        optionsWithSelectAll = [selectAllOption];
      }

      this.selectOptions = optionsWithSelectAll;

      if (
        Array.isArray(this.selectedValues) &&
        this.selectedValues.indexOf('selectAll') !== -1 &&
        this.selectedValues.length !== this.selectOptions.length
      ) {
        // 当已选择的值包括“全选”，但未选择所有其他选项时，
        // 请将所有选项添加到已选择数组中，并触发更改。
        this.selectedValues = this.selectOptions.map((item) => item.value);
        this.onChange.emit(this.selectedValues);
        // selectCmp.nzListControl.reset(); // 重置弹出层搜索内容
      } else if (this.selectedValues.length === this.selectOptions.length) {
        // 当所有选项都被选中时，显示Select All
        this.isShowSelectAll = true;
      } else {
        this.isShowSelectAll = false;
      }
    }
  }
}