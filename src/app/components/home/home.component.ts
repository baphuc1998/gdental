import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from './../../services/customer.service';
import Swal from 'sweetalert2';
import { FacebookService, InitParams } from 'ngx-facebook';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public attachment: File;
  private d = new Date();
  private today = this.d.getFullYear()+'-'+this.parseMonth(this.d.getMonth())+'-'+this.d.getDate();
  private publishkey = 'pub-c-6bfb7caa-4d1d-4fa6-94bb-7477d332e368';
  private subscribekey = 'sub-c-68048820-90a6-11e9-90d9-8a9dabba299e';


  constructor(
    public customerService: CustomerService,
    private facebookService: FacebookService,
    public pubnub: PubNubAngular,
  ) { 
  }

  ngOnInit() {
    // this.initFacebookService();
    this.pubnubInit();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2', appId : '311488643162598' };
    this.facebookService.init(initParams);
  }

  parseMonth(month){
    month = month + 1;
    if(month > 9){
      return month;
    }else{
      return "0"+month
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRegister(name, email, phone, date, time, message) {
    const sdt = parseInt(phone);
    this.sendNotification();
    
    if(name == "" || phone == "" || date == ""){
      Swal.fire({
        title: 'Error!',
        text: 'Vui lòng điền đầy đủ thông tin!',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      return;
    }

    if(isNaN(sdt) || phone.length != 10){
      Swal.fire({
        title: 'Error!',
        text: 'Số điện thoại không hợp lệ! (sđt phải là 10 chữ số. Vd: 0123456789...)',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      return;
    }

    if(date < this.today){
      Swal.fire({
        title: 'Error!',
        text: 'Ngày không hợp lệ!',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      return;
    }

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

    // Swal.fire({
    //   title: 'Success',
    //   text: 'Đặt lịch thành công. Nhân viên tư vấn sẽ liên hệ với bạn sớm nhất có thể',
    //   icon: 'success',
    // });
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

  public listFreeTime: any[] = ['8:00', '9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00','17:00','18:00'];
  public listTime = [
    {"time": "8:00", "number": 0}, {"time": "9:00", "number": 0}, {"time": "10:00", "number": 0}, {"time": "11:00", "number": 0}, {"time": "13:00", "number": 0}, {"time": "14:00", "number": 0}, {"time": "15:00", "number": 0}, {"time": "16:00", "number": 0}, {"time": "17:00", "number": 0}, {"time": "18:00", "number": 0}
  ]

  onFileSelected(files: FileList) {
    if (files.length > 0) {
      this.attachment = files.item(0);
    }
  }

  onPickDate(date) {
    this.subscription = this.customerService.getFreeTimeList(date).subscribe(data => {
      // const data2 = String(data);
      this.listFreeTime = data;
    }, error => {
      console.log(error);
    });
  }

  pubnubInit() {

    this.pubnub.init({
      publishKey: this.publishkey,
      subscribeKey: this.subscribekey,
      ssl: true,
      uuid: "customer"
    });

    // this.pubnub.addListener({
    //   message: (message) => {
    //     console.log(message);
    //     this.msg = message.message.content;
    //     console.log(this.msg);
    //   }
    // });

    this.pubnub.subscribe({
      channels: ['pubnub_onboarding_channel'],
      withPresence: true,
      triggerEvents: ['message', 'presence', 'status']
    });
  }

  sendNotification() {
    this.pubnub.publish({
      message: "10",
      channel: 'pubnub_onboarding_channel'
    });
  }

}
