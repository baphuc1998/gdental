import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-cost',
  templateUrl: './service-cost.component.html',
  styleUrls: ['./service-cost.component.css']
})
export class ServiceCostComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  public Treatment : any[];

  constructor(
    public customerService : CustomerService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscription = this.customerService.getAllService().subscribe(data =>{
      this.Treatment = data;
      console.log(this.Treatment);
      
    },error =>{

    })
  }

}
