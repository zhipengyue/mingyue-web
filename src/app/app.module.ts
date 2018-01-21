import { BrowserModule} from '@angular/platform-browser';
import { HttpModule,Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import {PagesModule} from './pages/pages.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateService } from '@ngx-translate/core';
const ROUTES: Routes = [
	{
    path:'',
    pathMatch:'full',
		redirectTo:'/auth/login'
  },
  {
    path:'**',
    pathMatch:'full',
		redirectTo:'/auth/login'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    // NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
