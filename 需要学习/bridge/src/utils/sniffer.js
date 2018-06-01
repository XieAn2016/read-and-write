
//test for android
export const isAndroid = () => {
	const ua = navigator.userAgent.toLowerCase()
    const isA = ua.indexOf('android') > -1
    if (isA) {
        return true
    }
    return false
}

//test for iphone or ipad
export const isIphone = () => {
	// const ua = navigator.userAgent.toLowerCase()
    //const isIph = ua.indexOf('iphone') > -1
    const isIph = (/iphone|ipad/gi).test(navigator.appVersion)
    if (isIph) {
        return true
    }
    return false
}