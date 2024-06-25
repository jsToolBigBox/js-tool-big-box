const browserBox = {
    isMobileBrowser: function() {
        if (
            window.navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
        )
        ) {
            return true; // 移动端
        } else {
            return false; // PC端
        }
    },
    isElementInViewport: function(element) {
        const eleDom = document.querySelector(element);
        const rect = eleDom.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    getScrollInfo: function(lastScrollTop) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let documentHeight = document.documentElement.scrollHeight;
        let scrollDirection = '';
        // 判断滚动方向
        if (scrollTop > lastScrollTop){
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }
        // 判断距离顶部的距离
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        // 判断距离底部的距离
        let scrollBottom = scrollTop + windowHeight - documentHeight;

        return {
            scrollDirection,   // 滚动方向
            lastScrollTop,     // 距离顶部的距离
            scrollBottom,      // 距离底部的距离
        }
    },
    fullScreen: function(fullSwitch) {
        if (fullSwitch) {
            let element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    },
    getBrowserInfo: function() {
        const info = {
            name: 'other',
            version: '0',
            ua: navigator.userAgent,
        }
        const browserData = [["WeiXin", /micromessenger\/([^\s]+)/], ["QQ", /qq\/([^\s]+)/], ["QQBrowser", /(?:qqbrowser|qqlivebrowser)\/([^\s]+)/], ["QIHU", /qihu|360se/], ["LieBao", /(?:lbbrowser|liebaofast)\/?([\d\.]+)?/], ["Sogou", /(?:metasr|sogou[\w]*)[ \/]([\d\.]+)/], ["Opera", /(?:opera|opr|oupeng)\/([\d\.]+)/], ["BaiduBrowser", /(?:bidubrowser|baidubrowser)[\/ ]?([\d\.\w]+)/], ["BaiduBox", /baiduboxapp|baiduboxpad/], ["UC", /(?:ucweb|ucbrowser)\/?([\d\.]+)/], ["Maxthon", /maxthon\/([\d\.]+)/], ["Samsung", /samsungbrowser\/([\d\.]+)/], ["Dolphin", /aphone|apad/], ["2345", /2345/], ["Miui", /miuibrowser\/([\d\.]+)/], ["OppoBrowser", /oppobrowser\/([\d\.]+)/], ["MeiZu", /mz-/], ["Weibo", /weibo/], ["Youku", /youku/], ["NewsApp", /newsapp/], ["AliApp", /aliapp/], ["Firefox", /firefox\/([\d\.\w]+)/], ["Edge", /edg\/([\d\.]+)/], ["Chrome", /chrome\/([\d\.]+)/], ["IE", /msie[ ](\d+\.\d+)/], ["Safari", /safari\/([\d\.]+)/]];
        const uaLower = navigator.userAgent.toLowerCase();
        let rName = null;

        for (let i=0;i<browserData.length;i++) {
            if (rName = uaLower.match(browserData[i][1])) {
                info['name'] = browserData[i][0];
                info['version'] = rName[1] || '0';
                break;
            }
        }
        return info;
    }
}
export default browserBox;