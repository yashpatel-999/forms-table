import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '',
        component: LoginComponent,
    },
    { path: 'home',
        component:  TaskComponent, 
        canActivate: [AuthGuard]
    },
];
