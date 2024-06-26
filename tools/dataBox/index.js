const dataBox = {
    luck: function(data, num) {
        num = num || 1;
        if (data.length < num) {
            return 0;
        }
        let allData = data;
        const dataLength = data.length;
        let luckData = [];
        for (let i=0;i<num;i++) {
            const lcukIndex = Math.floor(Math.random() * (dataLength-i));
            luckData.push(allData[lcukIndex]);
            allData.splice(lcukIndex, 1);
        }
        return luckData;
    },
    copyText: function(text, callback, errorCallback) {
        navigator.clipboard.writeText(text)
        .then(() => {
          callback && callback();
        })
        .catch(err => {
          errorCallback && errorCallback();
        });
    },
    uniqueArray: function(arr) {
        return arr.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    },
    getDataType: function(value) {
        return Object.prototype.toString.call(value);
    },
    sortArrayNum: function(arr, type) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换元素
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return type ? arr.reverse() : arr;
    },
    sortByNumber: function(arr, attr, sortType) {
        if (Object.prototype.toString.call(arr[0][attr]) === '[object Number]') {
            let sortArr = arr.sort((a, b) => a[attr] - b[attr]);
            return sortType ? sortArr.reverse() : sortArr;
        }
        return arr;
    },
    sortByletter: function(arr, attr, sortType) {
        let sortArr = arr.sort((a, b) => a[attr].localeCompare(b[attr], 'zh-Hans-CN'));
        return sortType ? sortArr.reverse() : sortArr;
    },
    sortByTime: function(arr, attr, sortType) {
        const newDate = new Date(arr[0][attr]);
        if (Object.prototype.toString.call(newDate) === '[object Date]') {
            let sortArr = arr.sort((a, b) => new Date(a[attr]) - new Date(b[attr]));
            return sortType ? sortArr.reverse() : sortArr;
        }
        return arr;
    }
}
export default dataBox;