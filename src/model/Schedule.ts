import { Client } from './Client';
import { Worker } from './Worker';
import { Service } from './Service';

export class Schedule {
  public client: Client
  public worker: Worker
  public service: Service
  public date: Date
  public totalValue: number

  constructor(
    client: Client,
    worker: Worker,
    service: Service,
    date: Date,
    totalValue: number
  ) {
    this.client = client;
    this.worker = worker;
    this.service = service;
    this.date = date;
    this.totalValue = totalValue
  }
}

export default Schedule;