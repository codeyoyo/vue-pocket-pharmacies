import local_storage from "./localstorage";
import cookie from "./cookie";

/** 本地数据操作类封装 */
export default {
    setData(name,value){
        if(local_storage.hasStorage){
            local_storage.set(name,value);
        }else{
            cookie.setCookie(name,value);
        }
    },
    getData(name){
        let str='';
        if(local_storage.hasStorage){
            str =local_storage.get(name)
        }else{
            str = cookie.getCookie(name);
        }
        return str;
    },
    delData(name){
        if(local_storage.hasStorage){
            local_storage.remove(name);
        }else{
            cookie.deleteCookie(name);
        }
    }
};