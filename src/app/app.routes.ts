import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ServiceCostComponent } from './components/service-cost/service-cost.component';
import { BaseSiteComponent } from './components/base-site/base-site.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseSiteComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'service',
                component: ServiceComponent,
            },
            {
                path: 'gallery',
                component: GalleryComponent,
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
            },
            {
                path: 'servicecost',
                component: ServiceCostComponent,
            },
        ]
    },
    {
        path: 'chatbot',
        component: ChatboxComponent,
    },
];