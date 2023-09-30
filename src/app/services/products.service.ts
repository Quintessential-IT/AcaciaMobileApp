import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShopParams } from '../core/models/shopParams';
import { Pagination } from '../core/models/pagination';
import { Product } from '../core/models/product';
import { Type } from '../core/models/type'
import { Category } from '../core/models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.categoryId > 0) params = params.append('categoryId', shopParams.categoryId);
    if(shopParams.typeId > 0) params = params.append('typeId', shopParams.typeId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if(shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params: params})
  }

  getProduct(id: number)
  {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  } 

  getCategories(){
    return this.http.get<Category[]>(this.baseUrl + 'products/categories')
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl + 'products/types')
  }
}
