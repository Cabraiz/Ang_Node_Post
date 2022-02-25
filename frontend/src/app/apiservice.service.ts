import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //conexao backend
  apiUrl = 'http://192.168.0.8:3000/user';

  //get todos os dados
  getAllData():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);  
  }

  //criar dados
  createData(data:any):Observable<any>
  {
    console.log(data, 'createapi=>');

    return this._http.post(`${this.apiUrl}`,data);
  }

  //deletar dados
  deleteData(id:any):Observable<any>{
    let ids = id;
    return this._http.delete(`${this.apiUrl}/${ids}`);
  }

  //atualizar dados
  updateData(data:any,id:any):Observable<any>{
    let ids = id;
    return this._http.put(`${this.apiUrl}/${ids}`, data)
  }

  getSingleData(id:any):Observable<any>{
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`);
  }

}
