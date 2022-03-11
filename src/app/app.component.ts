import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './productservice';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class AppComponent {
  products: Product[];
  cols: any[];
  views: any[];
  filters: any[];
  _selectedColumns: any[];
  selectedFilter: any[];
  selectedView: any[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsWithOrdersSmall().then((data) => {
      console.log(data);
      this.products = data;
    });
    this.filters = [
      {
        filterKey: 'category',
        filterValue: ['Accessories', 'Fitness', 'Clothing'],
      },
      { filterKey: 'rating', filterValue: ['5', '4', '3'] },
    ];
    this.views = [
      { viewname: 'Default view', id: '1', filter: this.filters[0] },
    ];
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'code', header: 'Code' },
      { field: 'price', header: 'Price' },
      { field: 'rating', header: 'Review' },
    ];

    this._selectedColumns = this.cols;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }
  onFilterChange(event, value) {
    console.log(event);
    console.log(value);
  }
}
