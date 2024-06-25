const downFileFn = function(blob, fileName) {
    const a = document.createElement('a');
    document.body.appendChild(a)
    a.style.display = 'none'
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url);
}
const ajaxBox = {
    sendJSONP: function(url, callbackName, callback) {
        const script = document.createElement('script');
        // 设置script元素的src属性，拼接callback参数
        script.src = `${url}?callback=${callbackName}`;
        // 将script元素添加到页面中
        document.body.appendChild(script);
        // 定义全局的回调函数，用于接收JSONP响应
        window[callbackName] = function(data) {
            // 执行传入的回调函数，并将JSONP响应作为参数传递
            callback(data);
            // 执行完毕后移除script元素
            document.body.removeChild(script);
            // 删除全局的回调函数
            delete window[callbackName];
        };
    },
    downFile: function(blob, fileName) {
        downFileFn(blob, fileName);
    },
    downFileFetch: function(fillAddress, fileName, method, headers, params) {
        let options = {
            method: method || 'GET',
        }
        if (headers) {
            options['headers'] = headers;
        }
        if ((method === 'post' || method === 'POST') && params) {
            options['body'] = JSON.stringify(params)
        }
        fetch(fillAddress, options).then(res => res.blob()).then((blob) => {
            downFileFn(blob, fileName);
        });
    }
}
export default ajaxBox;