var hourStr1 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;//yyyy-MM-dd
var hourStr2 = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/;//yyyy-MM-dd HH:mm:ss
var hourStr3 = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/;//HH:mm:ss
if(hourStr1.test(vVal)){
    dateFormat = "yyyy-MM-dd";
}
if(hourStr2.test(vVal)){
    dateFormat = "yyyy-MM-dd HH:mm:ss";
}
if(hourStr3.test(vVal)){
    dateFormat = "HH:mm:ss";
}