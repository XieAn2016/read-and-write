
import {
	SHOW_DIALOG,
	SHOW_TOAST,
	GET_LOCATION,
	SHOW_PIC,
	START_APP,
	SHOW_ATTACHMENT,
	CALL_PHONE,
	SEND_MESSAGE,
	GET_NETWORK_TYPE,
	SELECT_PIC,
	SELECT_ATTACHMENT,
	SELECT_USER,
	SELECT_DEPT,
	SET_TITLE,
	SET_RIGHT,
	SET_LEFT,
	ACTION_SHEET,
	CLOSE_WEBVIEW,
	CHECK_IN,
    GET_MAC_ADDRESS,
    GET_LOCATION_BY_MAP
} from './constants'

/*
 * name: showDiag
 * params: message|String, onSuccess|Function, onFail|Function
 */
export const showDialog = bridge => argObj => {
	const {
		title,
		message,
		buttonLabels,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SHOW_DIALOG, {title, msg: message, buttons: buttonLabels}, (responseData) => {
			responseData = JSON.parse(responseData)

      if(responseData.status === '1') {
        onSuccess(responseData.data)
      } else if(responseData.status === '0') {
        onFail(responseData.message)
      }
    })
	} catch(e) {
		onFail(e.message)
	}
}

export const showToast = bridge => argObj => {
	const {
		text,
		duration,
		delay,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SHOW_TOAST, {text, duration, delay}, (responseData) => {

    })
	} catch(e) {
		onFail(e.message)
	}
}

export const getLocation = bridge => argObj => {
	const {
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(GET_LOCATION, {}, (responseData) => {
			responseData = JSON.parse(responseData)

      if(responseData.status === '1') {
          onSuccess(responseData.data)
      } else if(responseData.status === '0') {
          onFail(responseData.message)
      }
    })
	} catch(e) {
		onFail(e.message)
	}
}

export const showPic = bridge => argObj => {
	const {
		urls,
        current,
        allowDownload = true,
		onSuccess,
		onFail
	} = argObj

	const index = urls.indexOf(current)

	try {
		bridge.callHandler(SHOW_PIC, {urls, index, allowDownload}, (responseData) => {

        })
	} catch(e) {
		onFail(e.message)
	}
}

export const startApp = bridge => argObj => {
	const {
		app,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(START_APP, {app}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const showAttachment = bridge => argObj => {
	const {
		url,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SHOW_ATTACHMENT, {url}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const callPhone = bridge => argObj => {
	const {
		phoneNum,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(CALL_PHONE, {phoneNum}, (responseData) => {

        })
	} catch(e) {
		onFail(e.message)
	}
}

export const sendMessage = bridge => argObj => {
	const {
		phoneNums,
		content,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SEND_MESSAGE, {phoneNums, content}, (responseData) => {

        })
	} catch(e) {
		onFail(e.message)
	}
}

export const getNetworkType = bridge => argObj => {
	const {
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(GET_NETWORK_TYPE, {}, (responseData) => {
			responseData = JSON.parse(responseData)

			//data can be : wifi, 2g, 3g, 4g, none, unknow
            onSuccess(responseData.data)
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const selectPic = bridge => argObj => {
	const {
		module,
		max = 9,
		fromCamera = false,
		multiple = true,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SELECT_PIC, {module,multiple, max, fromCamera}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                //把\t换回单引号，注：单引号bridge里面跑不过，换成了\t
                responseData.data.forEach(item => {
                    const { link } = item
                    const newLink = link.replace(/\t/g, '\'')
                    item.link = newLink
                })


                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }

        })
	} catch(e) {
		onFail(e.message)
	}
}

export const selectAttachment = bridge => argObj => {
	const {
		module,
		multiple = true,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SELECT_ATTACHMENT, {module,multiple}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                //把\t换回单引号，注：单引号bridge里面跑不过，换成了\t
                responseData.data.forEach(item => {
                    const { link } = item
                    const newLink = link.replace(/\t/g, '\'')
                    item.link = newLink
                })

                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const selectUser = bridge => argObj => {
	const {
		users = [],
        multiple = true,
        usableUids = '',
        checkedAll = true,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SELECT_USER, {ids: users.join(),multiple,usableUids:usableUids,checkedAll:checkedAll}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const selectDept = bridge => argObj => {
	const {
		depts = [],
		multiple = true,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SELECT_DEPT, {ids: depts.join(),multiple}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const setTitle = bridge => argObj => {
	const {
		title,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SET_TITLE, {title}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const setRight = bridge => argObj => {
	const {
		show,
		control,
		text,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SET_RIGHT, {show, control, text}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const setLeft = bridge => argObj => {
	const {
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(SET_LEFT, {}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const actionSheet = bridge => argObj => {
	const {
		title,
		cancelButton,
		otherButtons,
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(ACTION_SHEET, {title, cancelButton, otherButtons}, (responseData) => {
			responseData = JSON.parse(responseData)

            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
	} catch(e) {
		onFail(e.message)
	}
}

export const closeWebview = bridge => argObj => {
	try {
		bridge.callHandler(CLOSE_WEBVIEW, {}, (responseData) => {

    })
	} catch(e) {
    // alert(e.message)
	}
}


export const checkIn = bridge => argObj => {
	const {
		locales = [],
		onSuccess,
		onFail
	} = argObj

	try {
		bridge.callHandler(CHECK_IN, {locales}, (responseData) => {
			responseData = JSON.parse(responseData)
      if(responseData.status === '1') {
          onSuccess(responseData.data)
      } else if(responseData.status === '0') {
          onFail(responseData.message)
      }
    })
	} catch(e) {
		onFail(e.message)
	}
}


export const getMacAddress = bridge => argObj => {
    const {
        onSuccess,
        onFail
    } = argObj

    try {
        bridge.callHandler(GET_MAC_ADDRESS, {}, (responseData) => {
            responseData = JSON.parse(responseData)
            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
    } catch(e) {
        onFail(e.message)
    }
}

export const getLocationByMap = bridge => argObj => {
    const {
        onSuccess,
        onFail
    } = argObj

    try {
        bridge.callHandler(GET_LOCATION_BY_MAP, {}, (responseData) => {
            responseData = JSON.parse(responseData)
            if(responseData.status === '1') {
                onSuccess(responseData.data)
            } else if(responseData.status === '0') {
                onFail(responseData.message)
            }
        })
    } catch(e) {
        onFail(e.message)
    }
}
