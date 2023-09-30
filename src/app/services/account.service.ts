
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of, take } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User, User_Address } from '../core/models/user';
import { User_Role } from '../core/models/User_Role';
import { Pagination } from '../core/models/pagination';
import { ReviewParams } from '../core/models/ReviewParams';
import { ProductReview } from '../core/models/ProductReview';
import { Faq } from '../core/models/Faq';
import { specParams } from '../core/models/specParams';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1); 
  currentUser$ = this.currentUserSource.asObservable();
  

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string | null){
    if(token === null){
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(this.baseUrl + 'account', {headers}).pipe(
      map(user => {
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          return user;
        }else{
          return null
        }
      })
    )
  }


  login(values: any){
    console.log(this.currentUserSource);
    return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  register(file:FormData){
    return this.http.post<User>(this.baseUrl + 'account/register', file).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
  }

  GetUserAddress(): Observable<User_Address> {
    return this.http.get<User_Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: any){
    return this.http.put<User_Address>(this.baseUrl + 'account/address', address);
  }

  resetPassword(password: any){
    return this.http.put(this.baseUrl + 'account/reset-password', password);
  }

  updateUser(userDetails: any){
    return this.http.put(this.baseUrl + 'account/update-user', userDetails);
  }

  getUserRoles(){
    return this.http.get<User_Role[]>(this.baseUrl + 'account/roles');
  }

  deleteUser(){
    return this.http.delete(this.baseUrl + 'account/delete-user');
  }

  resetForgottenPassword(resetVM: any){
    return this.http.post<any>(this.baseUrl + 'account/reset-forgot-password', resetVM);
  }

  sendForgotPasswordRequest(email: any){
    return this.http.post<string>(this.baseUrl + 'account/forgot-password?email=' + email, email);
  }

  resendForgotPasswordRequest(userId: any){
    return this.http.post<string>(this.baseUrl + 'account/resend-forgot-password-OTP?userId=' + userId, userId);
  }

  getFaqs(specParams: specParams){
    let params = new HttpParams();
    params = params.append('sort', specParams.sort);
    params = params.append('pageIndex', specParams.pageNumber);
    params = params.append('pageSize', specParams.pageSize);
    if(specParams.search) params = params.append('search', specParams.search);

    return this.http.get<Pagination<Faq[]>>(this.baseUrl + 'faq', {params: params})
  }



  getReviews(specParams: ReviewParams){
    let params = new HttpParams();
    if(specParams.productId > 0) params = params.append('productId', specParams.productId);
    params = params.append('sort', specParams.sort);
    params = params.append('pageIndex', specParams.pageNumber);
    params = params.append('pageSize', specParams.pageSize);
    if(specParams.search) params = params.append('search', specParams.search);

    return this.http.get<Pagination<ProductReview[]>>(this.baseUrl + 'ProductReview/Reviews', {params: params})
  }

  getReview(id: number){
    return this.http.get<ProductReview>(this.baseUrl + 'ProductReview/' + id);
  }

  updateReview(review: any){
    return this.http.put<ProductReview>(this.baseUrl + 'ProductReview/' + review.id, review);
  }

  deleteReview(id: number){
    return this.http.delete(this.baseUrl + 'ProductReview/' + id);
  }

  flagReview(id: number){
    return this.http.post(this.baseUrl + 'ProductReview/Flag' + id, id);
  }

  unFlagReview(id: number){
    return this.http.post(this.baseUrl + 'ProductReview/unFlag/' + id, id);
  }
}
