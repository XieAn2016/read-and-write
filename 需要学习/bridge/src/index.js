
import { isAndroid, isIphone } from './utils/sniffer'
import {
	showDialog,
	showToast,
	getLocation,
	showPic,
	startApp,
	showAttachment,
	callPhone,
	sendMessage,
	getNetworkType,
	selectPic,
	selectAttachment,
	selectUser,
  selectDept,
	setTitle,
	setRight,
	setLeft,
	actionSheet,
	closeWebview,
	checkIn,
    getMacAddress,
    getLocationByMap
} from './methods'


let readyCbs= []
// let errorCb = () => {}

// reveal the td object to the global environment
window.td = (() => {

	return {
		ready(cb) {
			if(typeof cb !== 'function') {
				throw new Error(`td.ready() only accept functions, instead receiving a ${typeof cb}.`)
			}
			if(!window.td.bridgeReady) {
				readyCbs.push(cb)
			} else {
				cb()
			}

		},
		error(/*cb*/) {
			//errorCb =cb
		}
	}

})()


//iphone bridge setup function definition
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
//android bridge setup function definition
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function() {
                callback(WebViewJavascriptBridge)
            },
            false
        )
    }
}



let td = {}
let setupBridge

if(isAndroid()) {
	setupBridge = connectWebViewJavascriptBridge

	//init
	setupBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
            //console.log('JS got a message', message)
            var data = {
                'Javascript Responds': '测试中文!'
            }
            //console.log('JS responding with', data)
            responseCallback(data)
        })

        //register all the callbacks
        td = {
            confirm: showDialog(bridge),
            toast: showToast(bridge),
            getLocation: getLocation(bridge),
            previewImage: showPic(bridge),
            launchApp: startApp(bridge),
            previewFile: showAttachment(bridge),
            call: callPhone(bridge),
            sendMessage: sendMessage(bridge),
            getNetworkType: getNetworkType(bridge),
            chooseImage: selectPic(bridge),
            selectFile: selectAttachment(bridge),
            selectUser: selectUser(bridge),
            selectDept: selectDept(bridge),
            setTitle: setTitle(bridge),
            setRight: setRight(bridge),
			setLeft: setLeft(bridge),
            actionSheet: actionSheet(bridge),
			closeWebview: closeWebview(bridge),
			checkIn: checkIn(bridge),
            getMacAddress: getMacAddress(bridge),
            getLocationByMap: getLocationByMap(bridge)
        }

        window.td = {
            ...window.td,
            ...td,
            bridgeReady: true
        }

        for(let i=0; i<readyCbs.length; i++) {
			readyCbs[i]()
		}

    })

}
if(isIphone()) {
	setupBridge = setupWebViewJavascriptBridge
	setupBridge(function(bridge) {

		//register all the callbacks
        td = {
            confirm: showDialog(bridge),
            toast: showToast(bridge),
            getLocation: getLocation(bridge),
            previewImage: showPic(bridge),
            launchApp: startApp(bridge),
            previewFile: showAttachment(bridge),
            call: callPhone(bridge),
            sendMessage: sendMessage(bridge),
            getNetworkType: getNetworkType(bridge),
            chooseImage: selectPic(bridge),
            selectFile: selectAttachment(bridge),
            selectUser: selectUser(bridge),
            selectDept: selectDept(bridge),
            setTitle: setTitle(bridge),
            setRight: setRight(bridge),
            setLeft: setLeft(bridge),
            actionSheet: actionSheet(bridge),
			closeWebview: closeWebview(bridge),
			checkIn: checkIn(bridge),
            getMacAddress: getMacAddress(bridge),
            getLocationByMap: getLocationByMap(bridge)
        }

        window.td = {
            ...window.td,
            ...td,
            bridgeReady: true
        }

		for(let i=0; i<readyCbs.length; i++) {
			readyCbs[i]()
		}

	})

}
