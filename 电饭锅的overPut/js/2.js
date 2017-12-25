//@charset "UTF-8";
/*var commonIp = 'http://yangba.syoogame.com';
var cdnHost = 'http://yangbaimg.syoogame.com';
var cdnJsHost = 'http://yangbaimg.syoogame.com/assets';*/

var commonIp = 'http://test-feature.yangba.tv';
var cdnHost = 'http://test-feature.img.yangba.tv';
var cdnJsHost = 'http://test-feature.img.yangba.tv/assets';

var vm = new Vue({
	el: '#overPut',
	data: {
		getHouseUrl: '/spread/getJsonpProgramList',
		gameHouseData: [],
		liveHouseData: []
	},
	mounted: function() {
		this.getGameHouse(5, 'open');
		this.getLiveHouse(4, 'open');
	},
	methods: {
		getGameHouse: function(houseNum, status) {
			status = status == 'open' ? 'T' : 'F';
			this.$nextTick(function() {
				this.$http.jsonp(commonIp + this.getHouseUrl, {
					params: {
						'programType': 2,
						'limit': houseNum,
						'status': status,
						'sortProperty': 'integratedHeat'
					},
					jsonp: 'callback'
				}).then(function(data) {
					for(var i in data.data){
						vm.gameHouseData.push(data.data[i]);
					}
					if (data.data.length < 5 && vm.gameHouseData.length < 5) {
						vm.getGameHouse(5 - data.data.length, 'close');
					}
				});
			});
		},
		getLiveHouse: function(houseNum, status) {
			status = status == 'open' ? 'T' : 'F';
			this.$nextTick(function() {
				this.$http.jsonp(commonIp + this.getHouseUrl, {
					params: {
						'programType': 0,
						'limit': houseNum,
						'status': status,
						'sortProperty': 'RANDOM'
					},
					jsonp: 'callback'
				}).then(function(data) {
					for(var i in data.data){
						vm.liveHouseData.push(data.data[i]);
					}
					if (data.data.length < 4 && vm.liveHouseData.length < 4) {
						vm.getLiveHouse(4 - data.data.length, 'close');
					}
				});
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
		}
	}
});