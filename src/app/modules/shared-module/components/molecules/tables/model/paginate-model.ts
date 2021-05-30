import { PageModel } from "./page-model";
    export interface PaginateModel {
      total:number,
      itemsToPage:number,
      rowNum:number,
      currentPage:number,
      perPage:number,
      pages:Array<PageModel>
    }
