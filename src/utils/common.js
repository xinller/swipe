/** 
 * 日期转换 
 * @param date date对象
 * @param format 日期格式
 * @return 例如  2016-7-16 16:24:58 
 **/
export function formatDate(date, format) {
    let paddNum = function(num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    };
    //指定格式字符
    let cfg = {
        yyyy: date.getFullYear(), //年 : 4位
        yy: date.getFullYear().toString().substring(2), //年 : 2位
        M: date.getMonth() + 1, //月 : 如果1位的时候不补0
        MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
        d: date.getDate(), //日 : 如果1位的时候不补0
        dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
        hh: paddNum(date.getHours()), //时 : 如果1位的时候补0
        mm: paddNum(date.getMinutes()), //分 : 如果1位的时候补0
        ss: paddNum(date.getSeconds()), //秒 : 如果1位的时候补0
        ms: paddNum(date.getMilliseconds()) //毫秒 : 如果1位的时候补0
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function(m) { return cfg[m]; });
}

/** 身份证认证
 * 
 * */
// 校验码校验
const checkCode = (val) => {
        console.log('val', val);
        var p = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        // var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        // var code = val.substring(17);
        if (p.test(val)) {
            console.log((val));
            // var sum = 0;
            // for (var i = 0; i < 17; i++) {
            //     sum += val[i] * factor[i];
            // }
            // if (parity[sum % 11] == code.toUpperCase()) {
            //     return true;
            // }
            return true
        }
        return false;
    }
    // 出生日期验证
const checkDate = (val) => {
    console.log('val', val);
    var pattern = /^(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
        var year = val.substring(0, 4);
        var month = val.substring(4, 6);
        var date = val.substring(6, 8);
        var date2 = new Date(year + "-" + month + "-" + date);
        if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
            return true;
        }
    }
    return false;
}

const checkProv = (val) => {
    var pattern = /^[1-9][0-9]/;
    var provs = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门"
    };
    if (pattern.test(val)) {
        if (provs[val]) {
            return true;
        }
    }
    return false;
}

export function checkID(val) {
    console.log('val', val);
    if (checkCode(val)) {
        var date = val.substring(6, 14)
        console.log('date', date);
        if (checkDate(date)) {
            if (checkProv(val.substring(0, 2))) {
                return true
            }
        }
    }
    return false
}


function timestampToTime(length_t) {
    var t = ''
        //天数
    var days = Math.floor(length_t / (60 * 60 * 24))
        //取模（余数）
    var modulo = length_t % (60 * 60 * 24)
        //小时数
    var hours = Math.floor(modulo / (60 * 60))
    modulo = modulo % (60 * 60)
        //分钟
    var minutes = Math.floor(modulo / 60)
        //秒
    var seconds = Math.floor(modulo % 60)
        //输出到页面
    t = days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
    if (days == 0) {
        t = +hours + '时' + minutes + '分' + seconds + '秒'
    }
    return t
}

export function format_down_time(end_time) {
    var ctime = new Date().getTime() / 1000
    var etime = new Date(end_time.replace(/-/g, '/')).getTime() / 1000
    var length = etime - ctime
    if (length > 0) {
        var a = timestampToTime(length)
        return a
    } else {
        return ''
    }
}


export function formatBrowse(item) {
    switch (String(item)) {
        case '0':
            return '主'
        case '1':
            return '比'
        case '2':
            return '评'
        case '3':
            return '聊'
        case '4':
            return '藏'
        case '5':
            return '藏'
        case '6':
            return '购'
        case '7':
            return '视'
        case '8':
            return '橱'
        case '9':
            return '次'
        case '10':
            return '问'
    }
}