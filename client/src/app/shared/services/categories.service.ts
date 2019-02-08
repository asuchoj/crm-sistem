import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import {Category} from "../interfaces/interfaces";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {

  constructor(private http: HttpClient){}

  fetch(): Observable<Category[]>{
    return this.http.get<Category[]>('/api/category')
  }

  getById(id: string): Observable<Category>{
    return this.http.get<Category>(`/api/category/${id}`).pipe(tap(t => console.log(t)))
  }
}
