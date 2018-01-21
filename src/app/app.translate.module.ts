import {NgModule} from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';
import {Language} from './common/language';
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

const translateOptions={
    loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
    }
}

@NgModule({
    imports:[HttpClientModule,TranslateModule.forRoot(translateOptions)],
    exports:[TranslateModule],
    providers:[TranslateService]
})

export class AppTranslationModule{
    private timer=null;
    constructor(
        private translate:TranslateService
    ){
        let lang=Language.getLanguage(translate.getBrowserCultureLang());
        translate.setDefaultLang(lang);
        this.translation();
        translate.onDefaultLangChange.subscribe(res=>{
            this.translation();
        })
    }
    translation(){

    }
}