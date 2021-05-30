import { TemplateRef } from '@angular/core';

export interface ColumnModel {
    key: string;
    title: string;
    actionColum?:boolean;
    columnTemplate?: TemplateRef<any>;
    width?: string;
}
