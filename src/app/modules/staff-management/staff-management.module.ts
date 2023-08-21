import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { InsertComponent } from './insert/insert.component';
import { StaffManagementRoutingModule } from './staff-management-routing.module';
import { InfoComponent } from './info/info.component';
import { GenderPipe } from 'src/app/common/pipes/gender.pipe';
import { UndefinedPipe } from 'src/app/common/pipes/undefined.pipe';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { OrganizationalStructureComponent } from './components/organizational-structure/organizational-structure.component';
import { OrganizationalCardComponent } from './components/organizational-card/organizational-card.component';
import { OrganizationalTreeComponent } from './components/organizational-tree/organizational-tree.component';
import { PersonalDataControlComponent } from './components/personal-data-control/personal-data-control.component';
import { CommonUiModule } from 'src/app/common-ui/common-ui.module';
import { VacationManagementModule } from '../vacation-management/vacation-management.module';

@NgModule({
    declarations: [
        ListComponent,
        InsertComponent,
        InfoComponent,
        GenderPipe,
        UndefinedPipe,
        PersonalDataComponent,
        AccountSettingComponent,
        OrganizationalStructureComponent,
        OrganizationalCardComponent,
        OrganizationalTreeComponent,
        PersonalDataControlComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        StaffManagementRoutingModule,
        VacationManagementModule,
        CommonUiModule,
    ]
})
export class StaffManagementModule { }
