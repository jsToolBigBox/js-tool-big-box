const dateTime = function(time) {
    // 如果不传入time,那么就是当前的时间
    return time ? new Date(time) : new Date();
}
const getYear = function(time) {
    const date = dateTime(time);
    return date.getFullYear();
}
const getMonth = function(time) {
    const date = dateTime(time);
    return (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
}
const getDate = function(time) {
    const date = dateTime(time);
    return (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
}
const getHour = function(time) {
    const date = dateTime(time);
    return (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
}
const getMinutes = function(time) {
    const date = dateTime(time);
    return (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
}
const getSeconds = function(time) {
    const date = dateTime(time);
    return (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
}
const isLeapYear = function(time) {
    const year = getYear(time);
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
const daysInMonth = function(time, month) {
    const days = [31, (isLeapYear(time) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month];
}
const getLastSundayOfMonth = function(year, month) {
    const lastDay = new Date(year, month + 1, 0); // 获取该月的最后一天
    const lastSunday = lastDay.getDate() - lastDay.getDay(); // 该月最后一个周日的日期
    return new Date(year, month, lastSunday);
}
const getSecondSundayOfMonth = function(year, month) {
    const firstDay = new Date(year, month, 1);
    const firstSunday = firstDay.getDate() + (7 - firstDay.getDay()) % 7;
    return new Date(year, month, firstSunday + 7);
}
const getFirstSundayOfMonth = function(year, month) {
    const firstDay = new Date(year, month, 1);
    const firstSunday = firstDay.getDate() + (7 - firstDay.getDay()) % 7;
    return new Date(year, month, firstSunday);
}
const isDaylightSavingTimeSydney = function(date) {
    // 检查是否在夏令时范围内（10月的第一个周日至4月的第一个周日）
    const year = date.getFullYear();
    const octoberFirstSunday = getFirstSundayOfMonth(year, 9); // 10月
    const aprilFirstSunday = getFirstSundayOfMonth(year, 3); // 4月
    return date >= octoberFirstSunday && date < aprilFirstSunday;
}
const isDaylightSavingTime = function(date) {
    // 检查是否在夏令时范围内（3月的最后一个周日到10月的最后一个周日）
    const year = date.getFullYear();
    const marchLastSunday = getLastSundayOfMonth(year, 2); // 3月
    const octoberLastSunday = getLastSundayOfMonth(year, 9); // 10月
    return date >= marchLastSunday && date < octoberLastSunday;
}
const isDaylightSavingTimeNew = function(date) {
    // 检查是否在夏令时范围内（3月的第二个周日至11月的第一个周日）
    const year = date.getFullYear();
    const marchSecondSunday = getSecondSundayOfMonth(year, 2); // 3月
    const novemberFirstSunday = getFirstSundayOfMonth(year, 10); // 11月
    return date >= marchSecondSunday && date < novemberFirstSunday;
}

const timeBox = {
    getMyYear: function(time, unit) {
        unit = unit || '';
        const year = getYear(time);
        return year + String(unit);
    },
    getMyMonth: function(time, unit) {
        unit = unit || '';
        const month = getMonth(time);
        return month + String(unit);
    },
    getMyDate: function(time, unit) {
        unit = unit || '';
        const date = getDate(time);
        return date + String(unit);
    },
    getMyHour: function(time, unit) {
        unit = unit || '';
        const hour = getHour(time);
        return hour + String(unit);
    },
    getMyMinutes: function(time, unit) {
        unit = unit || '';
        const minutes = getMinutes(time);
        return minutes + String(unit);
    },
    getMySeconds: function(time, unit) {
        unit = unit || '';
        const seconds = getSeconds(time);
        return seconds + String(unit);
    },
    getFullDateTime: function(time, showType, char) {
        const timeChar = char || '-';
        const year = getYear(time);
        const month = getMonth(time);
        const date = getDate(time);
        const hour = getHour(time);
        const minutes = getMinutes(time);
        const seconds = getSeconds(time);
        if (showType === 'YYYY-MM-DD') {
            return `${year}${timeChar}${month}${timeChar}${date}`;
        }
        if (showType === 'YYYY-MM-DD hh:mm') {
            return `${year}${timeChar}${month}${timeChar}${date} ${hour}:${minutes}`;
        }
        if (showType === 'YYYY-MM-DD hh:mm:ss') {
            return `${year}${timeChar}${month}${timeChar}${date} ${hour}:${minutes}:${seconds}`;
        }
    },
    getLeapYear: function(time) {
        const isLear = isLeapYear(time);
        return isLear;
    },
    getDistanceNow: function(time, unitObj) {
        const distanceUnitObj = {
            beforeUnit: '以前',
            afterUnit: '之后',
            yearUnit: '年',
            monthUnit: '月',
            dateUnit: '天',
            hourUnit: '小时',
            minutesUnit: '分钟',
            secondUnit: '秒钟'
        }
        if (unitObj) {
            for (let i in unitObj) {
                distanceUnitObj[i] = unitObj[i];
            }
        }
        const datetimeCompare = new Date(time);
        const datetimeCompareStamp = datetimeCompare.getTime();
        const now = new Date();
        const nowStamp = now.getTime();
        if (datetimeCompareStamp - nowStamp > 0) { // 未来
            const yearCompare = getYear(time);
            const yearNow = getYear(null);
            const distanceYear = Number(yearCompare) - Number(yearNow);

            const monthCompare = Number(getMonth(time));
            const monthNow = Number(getMonth(null));
            const distanceMonth = distanceYear*12 + (monthCompare - monthNow);
            
            const distanceDate = Math.ceil((datetimeCompareStamp - nowStamp) / (1000*60*60*24));
            
            const distanceHour = Math.ceil((datetimeCompareStamp - nowStamp) / (1000*60*60));
            
            const distanceMinutes = Math.ceil((datetimeCompareStamp - nowStamp) / (1000*60));
            
            const distanceSeconds = Math.ceil((datetimeCompareStamp - nowStamp) / 1000);

            ///////////////---fullDistanceShow---///////////////////////////////
            let fullDistanceShow = '';
            let fullDistanceYear = distanceYear;
            let fullDistanceMonth = Number(getMonth(time)) - Number(getMonth(null));
            if (fullDistanceMonth <= 0) {
                fullDistanceYear = distanceYear - 1;
                fullDistanceMonth += 12;
            }
            let fullDistanceDate = Number(getDate(time)) - Number(getDate(null));
            if (fullDistanceDate < 0) {
                fullDistanceMonth--;
                fullDistanceDate += daysInMonth(null, Number(getMonth(null))-1);
            }
            let fullDistanceHour = Number(getHour(time)) - Number(getHour(null));
            if (fullDistanceHour < 0) {
                fullDistanceDate--;
                fullDistanceHour += 24;
            }
            let fullDistanceMintus = Number(getMinutes(time)) - Number(getMinutes(null));
            if (fullDistanceMintus < 0) {
                fullDistanceHour--;
                fullDistanceMintus += 60;
            }
            let fullDistanceSeconds = Number(getSeconds(time)) - Number(getSeconds(null)); 
            if (fullDistanceSeconds < 0) {
                fullDistanceMintus--;
                fullDistanceSeconds += 60;
            }
            // console.log('-----年----', fullDistanceYear);
            // console.log('-----月----', fullDistanceMonth);
            // console.log('-----日----', fullDistanceDate);
            // console.log('-----时----', fullDistanceHour);
            // console.log('-----分----', fullDistanceMintus);
            // console.log('-----秒----', fullDistanceSeconds);

            if (fullDistanceYear > 0) {
                fullDistanceShow += `${fullDistanceYear}${distanceUnitObj.yearUnit}`;
            }
            if (fullDistanceMonth > 0) {
                fullDistanceShow += `${fullDistanceMonth}${distanceUnitObj.monthUnit}`;
            }
            if (fullDistanceDate > 0) {
                fullDistanceShow += `${fullDistanceDate}${distanceUnitObj.dateUnit}`;
            }
            if (fullDistanceHour > 0) {
                fullDistanceShow += `${fullDistanceHour}${distanceUnitObj.hourUnit}`;
            }
            if (fullDistanceMintus > 0) {
                fullDistanceShow += `${fullDistanceMintus}${distanceUnitObj.minutesUnit}`;
            }
            if (fullDistanceSeconds > 0) {
                fullDistanceShow += `${fullDistanceSeconds}${distanceUnitObj.secondUnit}`;
            }

            return {
                year: distanceYear + distanceUnitObj.yearUnit + distanceUnitObj.afterUnit,
                month: distanceMonth + distanceUnitObj.monthUnit + distanceUnitObj.afterUnit,
                date: distanceDate + distanceUnitObj.dateUnit + distanceUnitObj.afterUnit,
                hour: distanceHour + distanceUnitObj.hourUnit + distanceUnitObj.afterUnit,
                minutes: distanceMinutes + distanceUnitObj.minutesUnit + distanceUnitObj.afterUnit,
                seconds: distanceSeconds + distanceUnitObj.secondUnit + distanceUnitObj.afterUnit,
                fullDateTime: `${fullDistanceShow}${distanceUnitObj.afterUnit}`
            };
        }
        // 以前
        const yearCompare = getYear(time);
        const yearNow = getYear(null);
        const distanceYear = Number(yearNow) - Number(yearCompare);

        const monthCompare = Number(getMonth(time));
        const monthNow = Number(getMonth(null));
        const distanceMonth = distanceYear*12 + (monthNow - monthCompare);
        
        const distanceDate = Math.ceil((nowStamp - datetimeCompareStamp) / (1000*60*60*24));
        
        const distanceHour = Math.ceil((nowStamp - datetimeCompareStamp) / (1000*60*60));
        
        const distanceMinutes = Math.ceil((nowStamp - datetimeCompareStamp) / (1000*60));
        
        const distanceSeconds = Math.ceil((nowStamp - datetimeCompareStamp) / 1000);

        ///////////////---fullDistanceShow---///////////////////////////////
        let fullDistanceShow = '';
        let fullDistanceYear = distanceYear;
        let fullDistanceMonth = Number(getMonth(null)) - Number(getMonth(time));
        if (fullDistanceMonth < 0) {
            fullDistanceYear = distanceYear - 1;
            fullDistanceMonth += 12;
        }
        let fullDistanceDate = Number(getDate(null)) - Number(getDate(time));
        if (fullDistanceDate < 0) {
            fullDistanceMonth--;
            fullDistanceDate += daysInMonth(null, Number(getMonth(null))-1);
        }
        let fullDistanceHour = Number(getHour(null)) - Number(getHour(time));
        if (fullDistanceHour < 0) {
            fullDistanceDate--;
            fullDistanceHour += 24;
        }
        let fullDistanceMintus = Number(getMinutes(null)) - Number(getMinutes(time));
        if (fullDistanceMintus < 0) {
            fullDistanceHour--;
            fullDistanceMintus += 60;
        }
        let fullDistanceSeconds = Number(getSeconds(null)) - Number(getSeconds(time)); 
        if (fullDistanceSeconds < 0) {
            fullDistanceMintus--;
            fullDistanceSeconds += 60;
        }
        // console.log('-----年----', fullDistanceYear);
        // console.log('-----月----', fullDistanceMonth);
        // console.log('-----日----', fullDistanceDate);
        // console.log('-----时----', fullDistanceHour);
        // console.log('-----分----', fullDistanceMintus);
        // console.log('-----秒----', fullDistanceSeconds);

        if (fullDistanceYear > 0) {
            fullDistanceShow += `${fullDistanceYear}${distanceUnitObj.yearUnit}`;
        }
        if (fullDistanceMonth > 0) {
            fullDistanceShow += `${fullDistanceMonth}${distanceUnitObj.monthUnit}`;
        }
        if (fullDistanceDate > 0) {
            fullDistanceShow += `${fullDistanceDate}${distanceUnitObj.dateUnit}`;
        }
        if (fullDistanceHour > 0) {
            fullDistanceShow += `${fullDistanceHour}${distanceUnitObj.hourUnit}`;
        }
        if (fullDistanceMintus > 0) {
            fullDistanceShow += `${fullDistanceMintus}${distanceUnitObj.minutesUnit}`;
        }
        if (fullDistanceSeconds > 0) {
            fullDistanceShow += `${fullDistanceSeconds}${distanceUnitObj.secondUnit}`;
        }

        return {
            year: distanceYear + distanceUnitObj.yearUnit + distanceUnitObj.beforeUnit,
            month: distanceMonth + distanceUnitObj.monthUnit + distanceUnitObj.beforeUnit,
            date: distanceDate + distanceUnitObj.dateUnit + distanceUnitObj.beforeUnit,
            hour: distanceHour + distanceUnitObj.hourUnit + distanceUnitObj.beforeUnit,
            minutes: distanceMinutes + distanceUnitObj.minutesUnit + distanceUnitObj.beforeUnit,
            seconds: distanceSeconds + distanceUnitObj.secondUnit + distanceUnitObj.beforeUnit,
            fullDateTime: `${fullDistanceShow}${distanceUnitObj.beforeUnit}`
        };
    },
    getDaysInMonth: function(time, month) {
        const days = daysInMonth(time, month);
        return days;
    },
    getAnimalOfBorn: function(time) {
        const year = getYear(time);
        const defaultYear = 1900;
        const remainYear = (year - defaultYear) % 12;
        const animals = ['rat|鼠', 'ox|牛', 'tiger|虎', 'hare|兔', 'dragon|龙', 'snake|蛇', 'horse|马', 'sheep|羊', 'monkey|猴', 'rooster|鸡', 'dog|狗', 'boar|猪'];
        return animals[remainYear];
    },
    getHoliday: function(time) {
        const year = getYear(time);
        if (year < 2024) {
            return null;
        }
        if (year === 2024) {
            return [
                {
                    name: '元旦',
                    days: '01-01'
                },
                {
                    name: '春节',
                    days: '02-10|02-11|02-12|02-13|02-14|02-15|02-16|02-17'
                },
                {
                    name: '清明',
                    days: '04-04|04-05|04-06'
                },
                {
                    name: '劳动节',
                    days: '05-01|05-02|05-03|05-04|05-05'
                },
                {
                    name: '端午节',
                    days: '06-08|06-09|06-10'
                },
                {
                    name: '中秋节',
                    days: '09-15|09-16|09-17'
                },
                {
                    name: '国庆节',
                    days: '10-01|10-02|10-03|10-04|10-05|10-06|10-07'
                },
            ]
        }
    },
    getWorldTime: function() {
        const now = new Date();
        // 获取 UTC 时间
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        // 创建北京时间，UTC+8小时
        const beijingTime = new Date(utc + (3600000 * 8));
        const beijingTimeData = {
          hour: getHour(beijingTime),
          min: getMinutes(beijingTime),
          sec: getSeconds(beijingTime),
        }
        // 伦敦时间
        // 检查是否为夏令时
        const londonOffset = isDaylightSavingTime(now) ? 1 : 0;
        const londonTime = new Date(utc + (3600000 * londonOffset));
        const londonTimeData = {
          hour: getHour(londonTime),
          min: getMinutes(londonTime),
          sec: getSeconds(londonTime),
        }
        // 纽约时间
        // 检查是否为夏令时
        const newYorkOffset = isDaylightSavingTimeNew(now) ? -4 : -5;
        const newYorkTime = new Date(utc + (3600000 * newYorkOffset));
        const newYorkTimeData = {
          hour: getHour(newYorkTime),
          min: getMinutes(newYorkTime),
          sec: getSeconds(newYorkTime),
        }
        // 东京时间
        const tokyoTime = new Date(utc + (3600000 * 9));
        const tokyoTimeData = {
          hour: getHour(tokyoTime),
          min: getMinutes(tokyoTime),
          sec: getSeconds(tokyoTime),
        }
        // 创建巴黎时间，UTC+1 或 UTC+2
        // 检查是否为夏令时
        const parisOffset = isDaylightSavingTime(now) ? 2 : 1;
        const parisTime = new Date(utc + (3600000 * parisOffset));
        const parisTimeData = {
          hour: getHour(parisTime),
          min: getMinutes(parisTime),
          sec: getSeconds(parisTime),
        }
        // 悉尼澳大利亚时间
        // 检查是否为夏令时
        const sydneyOffset = isDaylightSavingTimeSydney(now) ? 11 : 10;
        const sydneyTime = new Date(utc + (3600000 * sydneyOffset));
        const sydneyTimeData = {
          hour: getHour(sydneyTime),
          min: getMinutes(sydneyTime),
          sec: getSeconds(sydneyTime),
        }
        // 创建雅加达时间，UTC+7
        const jakartaTime = new Date(utc + (3600000 * 7));
        const jakartaTimeData = {
          hour: getHour(jakartaTime),
          min: getMinutes(jakartaTime),
          sec: getSeconds(jakartaTime),
        }
        return {
          beijing: beijingTimeData,
          london: londonTimeData,
          newYork: newYorkTimeData,
          tokyo: tokyoTimeData,
          paris: parisTimeData,
          sydney: sydneyTimeData,
          jakarta: jakartaTimeData
        }
    }
}
export default timeBox;