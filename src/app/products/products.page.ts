import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { ShopParams } from '../core/models/shopParams';
import { Type } from '../core/models/type';
import { Product } from '../core/models/product';
import { Category } from '../core/models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  menuItemIndex = 0;

  @ViewChild('search') searchTerm?: ElementRef;
  errors: string[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  types: Type[] = [];
  shopParams: ShopParams = new ShopParams();
  JsonFormData = new FormData();
  ExcelFormData = new FormData();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
    { name: 'Quantity: Low to high', value: 'quantityAsc' },
    { name: 'Quantity: High to Low', value: 'quantityDesc' },
    { name: 'Threshold Value: Low to high', value: 'thresholdAsc' },
    { name: 'Threshold Value: High to Low', value: 'thresholdDesc' },
  ];
  totalCount = 0;

  // View mode options
  oneColumn: boolean = false;
  grid: boolean = true;
  list: boolean = false;

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getTypes();
  }

  getProducts() {
    this.productService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  getCategories() {
    this.productService.getCategories().subscribe({
      next: (response) => (this.categories = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  getTypes() {
    this.productService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  // Function to switch between view modes
  // switchViewMode(mode: 'grid' | 'list' | 'oneColumn') {
  //   this.oneColumn = mode === 'oneColumn';
  //   this.grid = mode === 'grid';
  //   this.list = mode === 'list';
  // }

  onCategorySelected(event: any) {
    this.shopParams.categoryId = event.target.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(event: any) {
    this.shopParams.typeId = event.target.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(event: any) {
    this.shopParams.search = event.detail.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  showOneColumn() {
    this.oneColumn = true;
    this.grid = false;
    this.list = false;
    console.log('One Column View');
  }
  
  showGrid() {
    this.oneColumn = false;
    this.grid = true;
    this.list = false;
  }
  
  showList() {
    this.oneColumn = false;
    this.grid = false;
    this.list = true;
  }
}
