import {local} from '../widget/script/localStorage';
import {keys}from './key';

export class Language{
    private static _language;
    static getLanguage(defaultLang='cn-ZH'){
        if(!this._language){
            let language=local.get(keys.languageChanged);
            if(language){
                this._language=language;
            }else{
                if(defaultLang!='cn-ZH'&&defaultLang!='en-US'){
                    defaultLang='cn-ZH';
                }
                this._language=defaultLang;
            }
            return this._language;
        }else{
            return this._language;
        }
    }
    static set language(val){
        local.set(keys.languageChanged,val);
        this._language=val;
    }
}