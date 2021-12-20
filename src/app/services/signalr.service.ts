import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as signalR from "@aspnet/signalr";

// import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private data$: Subject<string> = new Subject();

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
    this.hubConnection.on('ReceiveMessage', (data) => {
      this.setData(data);
      console.log("Get data: " + data);

    });
  }

  getData(): Observable<string> {
    return this.data$.asObservable();
  }

  setData(data: string) {
    this.data$.next(data);
  }

  constructor(private http: HttpClient) { }
}
