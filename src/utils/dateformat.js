/**
 * 日期格式化工具函数
 *
 * @param {Date | Number} date     -- 日期对象
 * @param {String} format   -- 格式化模型，比如：YYYY-MM-DD hh:mm:ss
 * @example
 * dateformat(273499200000, "YYYY-MM-DD hh:mm:ss")
 */
export function dateformat(date, format = 'YYYY-MM-DD hh:mm:ss') {
    let result = format;
    const targetDate = new Date(Number(date));
    const currentDate = {
        'M+': targetDate.getMonth() + 1,
        'D+': targetDate.getDate(),
        'h+': targetDate.getHours(),
        'm+': targetDate.getMinutes(),
        's+': targetDate.getSeconds(),
        'q+': Math.floor((targetDate.getMonth() + 3) / 3),
        'S+': targetDate.getMilliseconds()
    };
    if (/(y+)/i.test(result)) {
        result = result.replace(
            RegExp.$1,
            (targetDate.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    for (const k in currentDate) {
        if (new RegExp('(' + k + ')').test(result)) {
            result = result.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ?
                currentDate[k] :
                ('00' + currentDate[k]).substr(
                    ('' + currentDate[k]).length
                )
            );
        }
    }
    return result;
}
export function getHMS(time) {
    const hour = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600)
    const min = parseInt(time % 3600 / 60) < 10 ? '0' + parseInt(time % 3600 / 60) : parseInt(time % 3600 / 60)
    return hour + ':' + min
}
/**
 * 开始结束时间的校验
 * @param {String} openStartTime 开始时间 --时间组件返回dateString时间类型值
 * @param {String} openEndTime   结束时间 --时间组件返回dateString时间类型值
 * @param {String} isStart 比较类型
 * start--用开始时间和结束时间比较 返回ture时(开始时间不能大于结束时间)
 * end--用结束时间和开始时间比较 返回ture时(结束时间不能小于开始时间)
 * @finish 最终返回true flase
 */
export function endTimeVerification(openStartTime, openEndTime, isStart = 'start') {
    const timestamp = Date.parse(new Date());
    const start = timestampToTime(timestamp, openStartTime)
    const date1 = new Date(start);
    const time1 = date1.getTime();
    const end = timestampToTime(timestamp, openEndTime)
    const date2 = new Date(end);
    const time2 = date2.getTime();
    if (isStart = 'start') {
        if (time1 > time2) {
            return true
        }
        return false
    } else {
        if (time2 < time1) {
            return true
        }
        return false
    }

}

export function timestampToTime(timestamp, time) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + time + ':00';
}