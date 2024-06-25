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
    }
}
export default dataBox;