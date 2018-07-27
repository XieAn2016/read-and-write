//shallow Clone

/* 
1. Object.assign()
*/

/* 
2. simple function
*/
function shallowClone1(params) {
    const obj = {};
    for (const key in params) {
        if (object.hasOwnProperty(key)) {
            obj[key] = params[key];
        }
    }
    return obj;
}



//deep Clone

/* 
1. JSON.parse(JSON.stringify())

    1.他无法实现对函数 、RegExp等特殊对象的克隆
    2.会抛弃对象的constructor,所有的构造函数会指向Object
    3.对象有循环引用,会报错
*/
















