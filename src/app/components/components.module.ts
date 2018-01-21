import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSearchComponent } from './multi-search/multi-search.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../app.translate.module';
import { ZpyInputComponent } from './zpy-input/zpy-input.component'
import { RequestService } from '../services/request.service';
import { ZpyTableComponent } from './zpy-table/zpy-table.component';
import { ZpyTreeComponent } from './zpy-tree/zpy-tree.component';
// import { ZpyEditComponent } from './zpy-edit/zpy-edit.component'
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule
  ],
  providers:[RequestService],
  declarations: [MultiSearchComponent, ZpyInputComponent, ZpyTableComponent, ZpyTreeComponent],
  exports:[MultiSearchComponent,ZpyTableComponent,ZpyTreeComponent]
})
export class ComponentsModule { }
