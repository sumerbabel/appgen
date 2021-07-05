import { PageModel } from './page-model';
export class Pagination {
  _page:number;
  _total: number;
  _itemsToPage: number;
  _rowNum: number;
  _currentPage: number;
  _perPage: number;
  _pages: Array<PageModel>;
  _order_by: string;
  _order_direction: string;

  constructor(
    page:number,
    total: number,
    itemsToPage: number,
    rowNum: number,
    perPage: number,
    currentPage: number,
    pages: Array<PageModel>,
    order_by?: string,
    order_direction?: string,
  ) {
    this._page =page
    this._total = total;
    this._rowNum = rowNum;
    this._currentPage = currentPage;
    this._perPage = perPage;
    this._pages = pages;
    this._order_by =order_by
    this.order_direction=order_direction
    this.itemsToPage=itemsToPage
  }

  public  setPaginationAndDataToResponse(data: any) {
    let lastPage = data['last_page'];
    let total = data['total'];
    let itemsToPage = data['to'];
    let rowNum = data['from'];
    let perPage = data['per_page'];
    let currentPage = data['current_page'];
    let page =currentPage;
    let pages = data['links'].map((item) => {
      let url: string = item.url;
      let page = url !== null ? url.split('=')[1] : '';
      let label = item.label;
      if (label == 'Next &raquo;') {
        label = 'Siguiente >';
      }
      if (label == '&laquo; Previous') {
        label = '< Anterior';
        if (url == '') {
          page = lastPage;
        }
      }
      return { page: page, active: item.active, label: label };
    });

     this.page =page
     this.total=total
     this.itemsToPage=itemsToPage
     this.rowNum= rowNum
     this.perPage=perPage
     this.currentPage =currentPage
     this.pages = pages
  }

  set total(total: number) {
    this._total = total;
  }
  set itemsToPage(itemsToPage: number) {
    this._itemsToPage = itemsToPage;
  }
  set rowNum(rowNum: number) {
    this._rowNum = rowNum;
  }
  set currentPage(currentPage: number) {
    this._currentPage = currentPage;
  }
  set perPage(perPage: number) {
    this._perPage = perPage;
  }
  set pages(pages: Array<PageModel>) {
    this._pages = pages;
  }

  set order_by(order_by: string) {
    this._order_by = order_by;
  }
  set order_direction(order_direction: string) {
    this._order_direction = order_direction;
  }


  setInitialPage() {
    this._page=1;
  }

  set page(page: number) {
    this._page= page;
  }

  get  page() {
    return this._page
  }


  get order_by(): string {
    return this._order_by;
  }
  get order_direction(): string {
    return this._order_direction;
  }

  get total(): number {
    return this._total;
  }
  get itemsToPage(): number {
    return this._itemsToPage;
  }
  get rowNum(): number {
    return this._rowNum;
  }
  get currentPage(): number {
    return this._currentPage;
  }
  get perPage(): number {
    return this._perPage;
  }
  get pages(): Array<PageModel> {
    return this._pages;
  }

getObjQueryString(){
  return {
    page:this.page,
    per_page:this.perPage ,
    order_by:this.order_by,
    order_direction:this.order_direction
  }
}

}
