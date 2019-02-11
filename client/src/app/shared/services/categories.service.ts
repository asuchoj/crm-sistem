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

  create(name: string, img?: File): Observable<Category>{
    const fd = new FormData();

    if(img){
      fd.append('image', img, img.name);
      fd.append('name', name);
    }

    return this.http.post<Category>('/api/category', fd).pipe(
      tap(t => console.log(t))
    )
  }

  update(id: string, name: string, img?: File): Observable<Category>{

    const fd = new FormData();

    if(img){
      fd.append('image', img, img.name);
    }

    fd.append('name', name);

    console.log(fd);

    return this.http.patch<Category>(`/api/category/${id}`, fd).pipe(
      tap(t => console.log(t))
    )
  }
}
