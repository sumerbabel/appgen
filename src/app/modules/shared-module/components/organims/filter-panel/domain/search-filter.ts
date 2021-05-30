export class SearchFilter {
  filter: any;
  constructor() {}

  clearFilters() {
    for (var key in this.filter) {
      this.filter[key]['value'] = null;
    }
  }

  existsFilter(): boolean {
    let result = false;
    if (this.filter) {
      for (let value of Object.values(this.filter)) {
        if (value['value'] != null && value['value'] != undefined) {
          result = true;
        }
      }
    }

    return result;
  }

  getObjQueryString() {
    let obj = {};
    for (var key in this.filter) {
      obj[this.filter[key]['key']] = this.filter[key]['value'];
    }
    return obj;
  }

  countFilters(): number {
    let result = 0;
    if (this.filter) {
      for (let value of Object.values(this.filter)) {
        if (value['value'] != null && value['value'] != undefined) {
          result++;
        }
      }
    }
    return result;
  }

  public static setFilterToSearchFilter(
    searchFilter: SearchFilter,
    filter: any
  ) {
    if (searchFilter.existsFilter()) {
      for (var key in searchFilter.filter) {
        filter[key] = searchFilter.filter[key];
      }
    } else {
      searchFilter.filter = filter;
    }
    return searchFilter;
  }
}
