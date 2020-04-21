import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from './../../services/customer.service';
import Swal from 'sweetalert2';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public attachment: File;

  constructor(
    public customerService: CustomerService,
    private facebookService: FacebookService
  ) { 
  }

  ngOnInit() {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2' };
    this.facebookService.init(initParams);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRegister(name, email, phone, date, time, message) {
    // //attachment
    let formData = new FormData();
    if (this.attachment != null) {
      formData.append('attachment', this.attachment, this.attachment.name);
    }

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('message', message);

    this.subscription = this.customerService.registerSchedule(formData).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Đặt lịch thành công. Nhân viên tư vấn sẽ liên hệ với bạn sớm nhất có thể',
        icon: 'success',
      });
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'Có lỗi xảy ra vui lòng thử lại sau!',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  public listFreeTime: any[] = ['8:00', '9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  onFileSelected(files: FileList) {
    if (files.length > 0) {
      this.attachment = files.item(0);
    }
  }

  onPickDate(date) {
    console.log(date);
    this.subscription = this.customerService.getFreeTimeList(date).subscribe(data => {
      // const data2 = String(data);
      this.listFreeTime = data;
    }, error => {
      console.log(error);
    });
  }

}
