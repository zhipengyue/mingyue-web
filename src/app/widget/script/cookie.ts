// import { escape,unescape } from "querystring";
import {} from ''
declare function escape(s:string): string;
declare function unescape(s:string): string;
export class cookie{
    static setCookie(name,value,time)//time 单位小时
    {
        var msec = time*1000*60*60; //获取毫秒
        var exp = new Date();
        exp.setTime(exp.getTime() + msec*1);
        var _value=escape(value);
        var _ex=exp['toGMTString']();
        document.cookie = name + "="+_value+ ";expires=" + _ex;
    }
    static getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
        if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
        }
        else{
        return null;
        }
    }
    static delCookie(name)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(name);
        if(cval!=null){
          document.cookie= name + "="+cval+";expires="+exp['toGMTString']();
        }
    } 
    static clear(){
        localStorage.clear();
    }
}