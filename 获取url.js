const getQueryParams = () => {
    var qs = location.search.length > 0 ? location.search.substr(1) : '',
        args = {},
        items = qs.length > 0 ? qs.split('&') : [],
        item = null, name = null, value = null, i = 0, len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }
    return { ...args }
}

let urlParams = getQueryParams()



function getQueryParams() {
    var qs = location.search.length > 0 ? location.search.substr(1) : '',
        args = {},
        items = qs.length > 0 ? qs.split('&') : [],
        item = null, name = null, value = null, i = 0, len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }
    return args 
}