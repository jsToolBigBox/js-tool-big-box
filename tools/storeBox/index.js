const storeBox = {
    getUrlParam: function(key) {
        const url = window.location.href;
        if (url.indexOf('?') === -1) {
            return null;
        }
        const params = url.split('?')[1];
        const paramsArr = params.split('&');
        for (let i=0;i<paramsArr.length;i++) {
            let paramItem = paramsArr[i];
            if (key === paramItem.split('=')[0]) {
            return paramItem.split('=')[1];
            break;
            }
        }
    },
    getLocalstorage(key) {
        const storageValueString = window.localStorage.getItem(key);
        if (!storageValueString) {
            return null;
        }
        const storageValue = JSON.parse(storageValueString);
        if (!storageValue.isExpires) {
            return storageValue.value;
        }
        const expiresTime = storageValue.expires;
        if (expiresTime < new Date().getTime()) {
            window.localStorage.removeItem(key);
            return null;
        }
        return storageValue.value;
    },
    setLocalstorage(key, value, expiresTime) {
        expiresTime = expiresTime || 0;
        let setObj = {
            value,
            expires: new Date().getTime() + expiresTime,
            isExpires: expiresTime ? true : false
        }
        window.localStorage.setItem(key, JSON.stringify(setObj));
    },
    deleteCookie(key) {
        const expiresTime = new Date().getTime() - 1000*60*60;
        document.cookie = `${key}=; expires=${expiresTime}`;
    },
    getCookie(key, domain, path) {
        const cookieString = document.cookie;
        const cookieArr = cookieString.split(';');
        for (let i=0;i<cookieArr.length;i++) {
            let cookieItem = cookieArr[i].trim();
            if (key === cookieItem.split('=')[0]) {
                return cookieItem.split('=')[1];
                break;
            }
        }
    },
    setCookie(key, value, expiresTime, domain, path) {
        let date = new Date();
        let newExpiresTime = '';
        if (expiresTime) {
            date.setTime(date.getTime() + expiresTime);
            newExpiresTime = ` expires=${date.toGMTString()};`;
        }
        domain = domain ? ` domain=${domain};` : '';
        path = path ? ` path=${path};` : '';
        const newCookie = `${key}=${value};${newExpiresTime}${domain}${path}`;
        document.cookie = newCookie;
    },
}
export default storeBox;