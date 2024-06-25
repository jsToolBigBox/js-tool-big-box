const eventBox = {
    formatNumberWithCommas: function(number, decimalPlaces) {
        // 将数字转换为字符串，并按照小数点分割为整数部分和小数部分
        number = Number(number);
        let parts = number.toFixed(decimalPlaces).toString().split(".");
        let integerPart = parts[0];
        let decimalPart = parts.length > 1 ? "." + parts[1] : "";

        // 添加千位分隔符
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // 返回格式化后的数字字符串
        return integerPart + decimalPart;
    },
    isGreater0: function(number) {
        number = Number(number);
        if (isNaN(number)) {
          return false;
        }
        return number > 0;
    },
    isGreater0Integer: function(number) {
        number = Number(number);
        if (isNaN(number)) {
          return false;
        }
        return number>0 && Number.isInteger(number);
    },
    getRandomNumber: function(min, max, decimalPlaces) {
        if (decimalPlaces) {
            return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateUniqueRandomNumber: function(length) {
        let numbers = Array.from({ length: 10 }, (_, i) => i);
        // 打乱数组顺序
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        // 取数组前 length 个元素拼接成字符串
        let result = numbers.slice(0, length).join('');
        return result;
    },
    numberToChinese: function(number, upperOrlower) {
        upperOrlower = upperOrlower || 'lower';
        // 定义中文数字
        let chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        // 定义中文单位
        let chineseUnits = ['', '十', '百', '千', '万', '十', '百', '千', '亿'];
        if (upperOrlower === 'upper') {
            chineseNumbers = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            chineseUnits = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
        }
        let numberString = number.toString();
        let [integerPart, decimalPart] = numberString.split('.');
        let integerArray = integerPart.split('').map(Number);

        // 构建整数部分的中文表示
        let chineseInteger = '';
        for (let i = 0; i < integerArray.length; i++) {
            let digit = integerArray[i];
            let unit = chineseUnits[integerArray.length - i - 1];
            if (digit === 0) {
                if (i !== integerArray.length - 1 && integerArray[i + 1] !== 0) {
                    chineseInteger += chineseNumbers[digit];
                }
            } else {
                chineseInteger += chineseNumbers[digit] + unit;
            }
        }
        // 构建小数部分的中文表示
        let chineseDecimal = '';
        if (decimalPart) {
            let decimalArray = decimalPart.split('').map(Number);
            for (let i = 0; i < decimalArray.length; i++) {
                chineseDecimal += chineseNumbers[decimalArray[i]];
            }
        }
        // 拼接整数部分和小数部分的中文表示，并返回结果
        let result = chineseInteger + (decimalPart ? '点' + chineseDecimal : '');
        return result || '零';
    }
}
export default eventBox;