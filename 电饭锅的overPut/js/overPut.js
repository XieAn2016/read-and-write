//@charset "UTF-8";

$(function() {
	checkUrl();
	vm.getGameHouse(5, 'open');
});

/*var commonIp = 'http://yangba.syoogame.com';
var cdnHost = 'http://yangbaimg.syoogame.com';
var cdnJsHost = 'http://yangbaimg.syoogame.com/assets';*/

var commonIp = 'http://test-or.yangba.tv';
var cdnHost = 'http://test-or.img.yangba.tv';
var cdnJsHost = 'http://test-or.img.yangba.tv/assets';

var sign = '';
var timeCont = 1;

function checkUrl() {
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	sign = encodeURIComponent(getQueryString('sign'));
	sign = sign == 'null' ? '' : '?sign=' + sign;
}

var vm = {
	getHouseUrl: '/spread/getJsonpProgramList',
	gameHouseData: [],
	liveHouseData: [],
	getGameHouse: function(houseNum, status) {
		status = status == 'open' ? 'T' : 'F';
		$.ajax({
			url: commonIp + vm.getHouseUrl + '?programTagId=10003&programType=2&sortProperty=integratedHeat&limit=' + houseNum + '&status=' + status + '',
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'callback',
			success: function(data) {
				if (data != '') {
					for (var i in data) {
						vm.gameHouseData.push(data[i]);
					}
					if (data.length < 5 && vm.gameHouseData.length < 5) {
						vm.getGameHouse(5 - data.length, 'close');
					} else {
						vm.getGameDom(vm.gameHouseData);
						vm.getLiveHouse(4, 'open');
					}
				} else if (timeCont < 10) {
					timeCont++;
					vm.getGameHouse(5, 'open');
				} else if (timeCont >= 10) {
					timeCont = 1;
					setTimeout("vm.getGameHouse(5, 'open')", 1000 * 60 * 5);
				}

			}
		});
	},
	getLiveHouse: function(houseNum, status) {
		status = status == 'open' ? 'T' : 'F';
		$.ajax({
			url: commonIp + vm.getHouseUrl + '?programType=0&sortProperty=RANDOM&limit=' + houseNum + '&status=' + status + '',
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'callback',
			success: function(data) {
				for (var i in data) {
					vm.liveHouseData.push(data[i]);
				}
				if (data.length < 4 && vm.liveHouseData.length < 4) {
					vm.getLiveHouse(4 - data.length, 'close');
				} else {
					vm.getLiveDom(vm.liveHouseData);
				}
			}
		});
	},
	getHeaderUrl: function(anchorId) {
		String.prototype.toAvatarPath = function(version) {
			if (this == 0) {
				return cdnJsHost + '/images/frontend/avatar_default_100x100.png';
			}
			var str = this.toString(),
				num = '000000000';
			str = num.substr(0, 9 - str.length) + str;
			return cdnHost + '/avatar/' + str.substr(0, 3) + '/' + str.substr(3, 2) + '/' + str.substr(5, 2) + '/' + str.substr(7, 2) + '_100x100.jpg' + (version ? '?' + version : '');
		};
		return anchorId.toString().toAvatarPath();
	},
	getGameDom: function(data) {
		for (var i in data) {
			var s = '<div class="oneGame ' + (i == 0 ? 'bigGame' : '') + '">';
			s += '<img src="' + data[i].cover + '" alt="" class="bgImg">';
			s += '<div class="liveFlag">';
			s += data[i].status == 'T' ? '<img src="./images/liveFlagBg.png" class="liveFlagBg">' : '<img src="./images/noLiveBg.png" class="liveFlagBg">';
			s += '<img src="' + vm.getHeaderUrl(data[i].anchorId) + '" alt="" class="headerPic">';
			s += '</div>';
			s += '<div class="botText">' + data[i].anchorNickname + '</div>';
			s += '<a target="_blank" href="' + '/' + data[i].anchorId + sign + '">';
			s += '<div class="coverBg">';
			s += '<div class="coverBgDiv"></div>';
			s += '<img src="./images/playBtn.png">';
			s += '</div>';
			s += '</a>';
			s += '</div>';
			$('.gameHouse').append(s);
		}
	},
	getLiveDom: function(data) {
		for (var i in data) {
			var s = '<div class="oneLive">';
			s += '<img src="' + data[i].cover + '" alt="" class="bgImg">';
			s += '<div class="liveFlag">';
			s += data[i].status == 'T' ? '<img src="./images/liveFlagRedBg.png" class="liveFlagBg">' : '<img src="./images/noLiveRedBg.png" class="liveFlagBg">';
			s += '</div>';
			s += '<div class="botText"><span>' + data[i].programName + '</span><img src="./images/playBtn.png" class="playBtn"></div>';
			s += '<a target="_blank" href="' + '/' + data[i].anchorId + sign + '">';
			s += '<div class="coverBg">';
			s += '<div class="coverBgDiv"></div>';
			s += '<div class="coverText">';
			s += '<div class="name">' + data[i].anchorNickname + '</div>';
			s += data[i].city != null ? '<div class="address">' + data[i].city + '</div>' : '';
			s += '<div class="peopleNum"><img src="./images/iconNum.png" class="iconNum"><span>' + data[i].roomUserCount + '</span></div>';
			s += '</div>';
			s += '</div>';
			s += '</a>';
			s += '</div>';
			$('.liveHouse').append(s);
		}
	}
};