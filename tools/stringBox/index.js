const stringBox = {
    compareVersions: function(version1, version2) {
        var parts1 = version1.split(".");
        var parts2 = version2.split(".");
        // 比较各个子版本号
        for (var i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            // 如果某一个版本号的子版本号不存在，则默认为0
            var num1 = parseInt(parts1[i] || 0);
            var num2 = parseInt(parts2[i] || 0);
            // 如果两个子版本号不相等，则返回比较结果
            if (num1 !== num2) {
                return num1 > num2 ? 1 : -1;
            }
        }
        // 如果所有子版本号都相等，则返回0，表示版本号相等
        return 0;
    },
    hyphenToCamelCase: function(str, type) {
        type = type || 'small';
        var parts = str.split("-");
        // 遍历数组，将每个单词的首字母大写，并拼接起来
        for (var i = 1; i < parts.length; i++) {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
        }
        // 将数组中的元素连接起来，形成新的字符串
        var camelCaseStr = parts.join("");
        // 返回转换后的字符串
        if (type === 'small') {
          return camelCaseStr;
        } else {
          let bigCamelCaseStr = camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1);
          return bigCamelCaseStr;
        }
    },
    reverseString: function(str) {
        let arr = str.split('');
        // 反转数组，使用reverse()方法
        arr.reverse();
        // 将数组转换回字符串，使用join()方法
        let reversedStr = arr.join('');
        // 返回反转后的字符串
        return reversedStr;
    },
    byteLength: function(str) {
        const utf8Bytes = new TextEncoder().encode(str);
        return utf8Bytes.length;
    },
    generateUUID: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        // 返回格式化后的 UUID
        return (
            s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        );
    },
    maskString: function(str, startLen, endLen, maskType, num) {
        // 确保字符串足够长以进行处理
        if (str.length <= startLen + endLen) {
            return str;
        }
        const start = str.slice(0, startLen);
        const end = str.slice(-endLen);
        let maskStr = '';
        for (let i=0;i<num;i++) {
            maskStr += maskType;
        }
        return `${start}${maskStr}${end}`;
    },
    getInfoByIdCard: function(certNo) {
        let birthday = null;
        let gender = null;
        let age = -1;

        if (certNo.length != 15 && certNo.length != 18)
            return false;

        let str = certNo.length === 15 ? certNo : certNo.substring(0, 17);
        let regNum = /^\d+$/;
        if (!regNum.test(str))
            return false;
        let regLast = /[0-9Xx]/;
        let numLast = certNo.substring(17, 18);
        if (certNo.length === 18 && !regLast.test(numLast))
            return false;

        let zoneArr = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91];
        if (zoneArr.indexOf(parseInt(certNo.substring(0, 2))) == -1)
            return false;

        let year = certNo.length === 15 ? `19${certNo.substring(6, 8)}` : certNo.substring(6, 10);
        let month = certNo.length === 15 ? certNo.substring(8, 10) : certNo.substring(10, 12);
        let day = certNo.length === 15 ? certNo.substring(10, 12) : certNo.substring(12, 14);
        let dayNum = parseInt(day);
        let monthNum = parseInt(month);
        let yearNum = parseInt(year);

        let currentYear = new Date().getFullYear();
        if (yearNum < 1900 || yearNum > currentYear)
            return false;
        if (monthNum > 12 || monthNum < 1)
            return false;

        if ((monthNum === 1 || monthNum === 3 || monthNum === 5 || monthNum === 7 || monthNum === 8 || monthNum === 10 || monthNum === 12) && dayNum > 31)
            return false;

        if ((monthNum === 4 || monthNum === 6 || monthNum === 9 || monthNum === 11) && dayNum > 30)
            return false;

        if (monthNum === 2) {
            let leapYear = null;
            // 闰年
            if (yearNum % 4 === 0 && yearNum % 100 !== 0 && yearNum % 400 === 0)
                leapYear = dayNum > 29 ? false : true;
            else {// 平年
                leapYear = dayNum > 28 ? false : true;
            }
            if (!leapYear) {
                return false;
            }
        }

        birthday = `${year}-${month}-${day}`;
        age = currentYear - year;
        if (certNo.length === 18) {
        gender = certNo.substring(16, 17) % 2 === 0 ? '女' : '男';
        } else {
        gender = certNo.substring(13, 14) % 2 === 0 ? '女' : '男';
        }

        // 校验 校验码
        const powerList = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const paritybitList = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        let num = 0;
        let certArr = certNo.split('').map(Number).slice(0, 17);

        for (let i = 0; i < certArr.length; i++) {
            num += (certArr[i] * powerList[i]);
        }

        if (certNo[17] != paritybitList[num % 11]) {
            if (num%11 === 2) { 
                if(certNo[17] != 'x' && certNo[17] != 'X')
                return false;
            } else {
                return false;
            }
        }

        return {
            birthday,
            gender,
            age
        };
    },
    transformLetter: function(str, type) {
        if (type === 1) {
            const newStr = str.toLowerCase();
            return newStr;
        }
        if (type === 2) {
            const newStr = str.toUpperCase();
            return newStr;
        }
        if (type === 3) {
            const newLowerStr = str.toLowerCase();
            const newStr = `${newLowerStr[0].toUpperCase()}${newLowerStr.slice(1)}` 
            return newStr;
        }
        if (type === 4) {
            const newArr = str.split(' ');
            let newStr = '';
            for (let i=0;i<newArr.length;i++) {
                let everyLowerStr = newArr[i].toLowerCase();
                let everyStr = `${everyLowerStr[0].toUpperCase()}${everyLowerStr.slice(1)}`;
                let nullLetter = '';
                if (i < newArr.length-1) {
                    nullLetter = ' ';
                }
                newStr += `${everyStr}${nullLetter}`;
            }
            return newStr;
        }
    }
}
export default stringBox;