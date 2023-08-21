import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-personal-data-control',
  templateUrl: './personal-data-control.component.html',
  styleUrls: ['./personal-data-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonalDataControlComponent),
      multi: true
    }
  ]
})
export class PersonalDataControlComponent implements OnInit,ControlValueAccessor  {
  value?: string;

  constructor() { }
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  onChange: any = () => {};
  onTouched: any = () => {};

}
