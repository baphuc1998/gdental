import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  public Treatment : any[];
  public serClass = ['ser1','ser2','ser3','ser4','ser5','ser6','ser7','ser8','ser9','ser10','ser11','ser12','ser13','ser14','ser15','ser16'];
  constructor(
    public customerService : CustomerService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscription = this.customerService.getIntroTreatment().subscribe(data => {
      this.Treatment = data;
    },error => {
      console.log(error);
    })
  }

}
