import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/atoms/button/button.component';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePickerComponent } from './components/molecules/inputs/date-picker/date-picker.component';
import { CheckboxComponent } from './components/molecules/inputs/checkbox/checkbox.component';
import { MaterialCoreModule } from './core/material/material-core.module';
import { FormsModule } from '@angular/forms';
import { FormularioBaseComponent } from './components/molecules/forms/formulario-base/formulario-base.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { UploadFilesComponent } from './components/molecules/upload-files/upload-files.component';
import { TextFileComponent } from './components/molecules/inputs/text-file/text-file.component';
import { ViewFilesComponent } from './components/molecules/view-files/view-files.component';
import { OutsideDirective } from './directives/outside.directive';
import { DialogComponent } from './components/organims/dialogForm/dialog/dialog.component';
import { ModalContainerComponent } from './components/organims/modal/modal-container/modal-container.component';
import { AlertComponent } from './components/organims/alertForm/alert/alert.component';
import { MultilineArrayComponent } from './components/organims/tool-multiline-string/multiline-array/multiline-array.component';
import { TextModelComponent } from './components/molecules/inputs/text-model/text-model.component';
import { AvatarComponent } from './components/atoms/avatar/avatar.component';
import { TreeMenuComponent } from './components/organims/tree-menu/tree-menu.component';
import { TextAreaModelComponent } from './components/molecules/inputs/text-area-model/text-area-model.component';
import { TreeRxComponent } from './components/organims/tree-reactive/tree-rx/tree-rx.component';
import { MenuMlComponent } from './components/organims/menu-multilevel/menu-ml.component';
import { SelectModelComponent } from './components/molecules/inputs/select-model/select-model.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { LoaderComponent } from './components/organims/loader/loader.component';
import { TableUiComponent } from './components/molecules/tables/table-ui/table-ui.component';
import { ButtonSelectComponent } from './components/atoms/button-select/button-select.component';
import { CommonModule } from '@angular/common';
import { TreeGenericComponent } from './components/organims/tree-generic/tree-generic.component';
import { HelipopperModule } from '@ngneat/helipopper';
import { OverlayModule } from '@angular/cdk/overlay';
import { ItemPanelComponent } from './components/molecules/inputs/select-model/item-panel/item-panel.component';
import { EditorCodeComponent } from './components/molecules/inputs/editor-code/editor-code.component';
import { CodeEditorModule } from '@ngstack/code-editor';
import { FilterPanelComponent } from './components/organims/filter-panel/filter-panel.component';
import { TextDateComponent } from './components/molecules/inputs/text-date/text-date.component';
import { KeyfocusDirective } from './directives/keyfocus.directive';
@NgModule({
  declarations: [
    KeyfocusDirective,
    ButtonComponent,
    DatePickerComponent,
    CheckboxComponent,
    FormularioBaseComponent,
    UploadFilesComponent,
    TextFileComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    ViewFilesComponent,
    OutsideDirective,
    DialogComponent,
    ModalContainerComponent,
    AlertComponent,
    MultilineArrayComponent,
    TextModelComponent,
    AvatarComponent,
    TreeMenuComponent,
    TextAreaModelComponent,
    TreeRxComponent,
    MenuMlComponent,
    SelectModelComponent,
    FilterPipe,
    LoaderComponent,
    TableUiComponent,
    ButtonSelectComponent,
    TreeGenericComponent,
    ItemPanelComponent,
    EditorCodeComponent,
    FilterPanelComponent,
    TextDateComponent,

  ],
  exports: [
    KeyfocusDirective,
    ButtonComponent,
    DatePickerComponent,
    CheckboxComponent,
    FormularioBaseComponent,
    UploadFilesComponent,
    TextFileComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    ViewFilesComponent,
    OutsideDirective,
    DialogComponent,
    MultilineArrayComponent,
    TextModelComponent,
    AvatarComponent,
    TreeMenuComponent,
    TextAreaModelComponent,
    TreeRxComponent,
    MenuMlComponent,
    SelectModelComponent,
    FilterPipe,
    LoaderComponent,
    TableUiComponent,
    ButtonSelectComponent,
    TreeGenericComponent,
    HelipopperModule,
    ItemPanelComponent,
    EditorCodeComponent,
    FilterPanelComponent,
    TextDateComponent
  ],
  imports: [
    MatRippleModule,
    MaterialCoreModule,
    CommonModule,
    FormsModule,
    HelipopperModule,
    OverlayModule,
    CodeEditorModule.forRoot()
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class SharedModule { }