import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as signalR from "@aspnet/signalr";

import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private data$: Subject<Category[]> = new Subject();

  private hubConnection!: signalR.HubConnection;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44368/notify')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  addTransferCategoryDataListener = () => {
    this.hubConnection.on('transfercategorydata', (data) => {
      this.setData(data);
    });
  }

  getData(): Observable<Category[]> {
    return this.data$.asObservable();
  }

  setData(data: Category[]) {
    this.data$.next(data);
  }

  constructor(private http: HttpClient) { }
}
