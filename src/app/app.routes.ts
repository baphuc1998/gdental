import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const routes: Routes = [
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
];