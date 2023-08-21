import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { VacationTypeListModel } from '../../../common/models/vacation/vacation-type-list.model';
import { environment } from '../../../../environments/environment';
import { VacationService } from '../services/vacation.service';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { VacationCreateModel } from '../../../common/models/vacation/vacation-create,model';
import { VacationStatusStatus } from '../enums/vacation-status.enum';
import { VacationListModel } from 'src/app/common/models/vacation/vacation-list.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { EmployeeListModel } from 'src/app/common/models/employee/employee-list.model';

@Component({
  selector: 'vacation-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Output() private outer = new EventEmitter();
  @Input() vacation?: VacationListModel;
  @Input() isInfo = false;
  validateForm!: UntypedFormGroup;
  emailForHR = environment.emailForHR;
  listOfVacationType = {
    items: new Array<VacationTypeListModel>(),
    isLoading: false,
    onSearch: async (isOpen: boolean) => {
      if (isOpen && !this.listOfVacationType.items.length) {
        await this.listVacationType();
      }
    },
  };
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  VacationStatusStatus = VacationStatusStatus;
  loading = false;
  avatarUrl?: string;
  info!:EmployeeListModel;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly vacationService: VacationService,
    private readonly message: NzMessageService,
    private readonly router: Router,
    private readonly commonService: CommonService
  ) {}

  async ngOnInit() {
    this.info = await this.commonService.getEmployee();
    this.validateForm = this.fb.group({
      typeId: [this.vacation?.type?.id, [Validators.required]],
      operateTimes: [this.vacation?.operateTimes, [Validators.required]],
      reason: [this.vacation?.reason, [Validators.required]],
      carbonCopy: [],
      startDate: [this.vacation?.startDate, [Validators.required]],
      endDate: [this.vacation?.endDate, [Validators.required]],
      isOTChiefly: [true, [Validators.required]],
      cc: [this.vacation?.cc],
    });
  }

  onBack = () => {
    if (this.isInfo) {
      this.outer.emit(false);
      this.isInfo = false;
    } else {
      this.router.navigate(['index']);
    }
  };

  listVacationType = async () => {
    this.listOfVacationType.isLoading = true;
    const result = await this.vacationService.findVacationTypes();
    this.listOfVacationType.items = result;
    this.listOfVacationType.isLoading = false;
  };

  disabledStartDate = (startDate: Date): boolean => {
    if (!startDate || !this.validateForm.value.endDate) {
      return false;
    }
    return startDate.getTime() > this.validateForm.value.endDate.getTime();
  };

  disabledEndDate = (endDate: Date): boolean => {
    if (!endDate || !this.validateForm.value.startDate) {
      return false;
    }
    return endDate.getTime() <= this.validateForm.value.startDate.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {}

  createVacation = async (status: string) => {
    if (this.validateForm.valid) {
      const body = new VacationCreateModel(this.validateForm.value);
      body.status = status;
      const result = await this.vacationService.createVacation(body);
      if (result) {
        this.validateForm.reset();
        this.message.success('success');
        this.onBack();
      } else {
        this.message.error('error');
      }
    } else {
      // 表单校验-脏校验
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  };

  submitForm = async () => {
    await this.createVacation(VacationStatusStatus.Submitted);
  };

  resetForm = () => {
    this.validateForm.reset();
    this.onBack();
  };

  SaveForm = async () => {
    await this.createVacation(VacationStatusStatus.New);
  };

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.message.error('Network error');
        this.loading = false;
        break;
    }
  }
}
