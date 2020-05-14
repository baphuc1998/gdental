import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

const corsHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:5005/'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public API = environment.urlApi;
  public apiBOT = "https://gbotver6.herokuapp.com/webhooks/rest/webhook";
  public load = true;

  constructor(public http: HttpClient) { }

  createSchedule(name: string,email : string,phone: string,date: Date,time: Time,message: string): Observable<any> {

    const json = JSON.stringify({
      name : name,
      email : email,
      phone : phone,
      date : date,
      time : time,
      message : message
    });
    return this.http.post<any>(`${this.API}/api/schedule/`,json, httpOptions);
  }

  registerSchedule(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.API}/api/schedule/`,formData);
  }

  getScheduleByTime():Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/?ordering=date,time`, httpOptions);
  }

  getFreeTimeList(date):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/freetime/?date=${date}`, httpOptions);
  }

  getAllService():Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/public/treatment/`, httpOptions);
  }

  getIntroTreatment():Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/intro/treatment/`, httpOptions);
  }

  sendMessage(message):Observable<any[]>{
    const random = Math.floor(Math.random() * 1001);
    const json = JSON.stringify({
      sender : "cus"+random,
      message : message,
    });
    return this.http.post<any[]>(`${this.apiBOT}`, json,corsHeaders);
  }



}
