var map = new BMap.Map('myMap', {
	enableMapClick: false
});
var mycity = new BMap.LocalCity();
var geoc = new BMap.Geocoder();
var locationStr;
var locationPx;
var locationPy;
var htmlAdd = '';
mycity.get(function(result) {
	var cityname = result.name;
	map.centerAndZoom(cityname, 15);
});

map.enableScrollWheelZoom();
map.addControl(new BMap.NavigationControl({
	anchor: BMAP_ANCHOR_TOP_LEFT,
	offset: new BMap.Size(10, 10)
}));

map.addControl(new BMap.CityListControl({
	anchor: BMAP_ANCHOR_TOP_LEFT,
	offset: new BMap.Size(10, 20)
}));
map.addEventListener('click', function(e) {
	var p = e;
	var pt = e.point;

	geoc.getLocation(pt, function(result) {
		address = result.address;
		locationStr = address;
		htmlAdd = locationStr;
		$('.locationStr').empty();
		$('.locationStr').append(htmlAdd);
	});
	locationPx = pt.lng.toString();
	locationPy = pt.lat.toString();

});

function G(id) {
	return document.getElementById(id);
}

var ac = new BMap.Autocomplete( //建立一个自动完成的对象
	{
		"input": "suggestId",
		"location": map
	});

ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
	var str = "";
	var _value = e.fromitem.value;
	var value = "";
	if (e.fromitem.index > -1) {
		value = _value.province + _value.city + _value.district + _value.street + _value.business;
	}
	str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

	value = "";
	if (e.toitem.index > -1) {
		_value = e.toitem.value;
		value = _value.province + _value.city + _value.district + _value.street + _value.business;
	}
	str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
	G("searchResultPanel").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
	var _value = e.item.value;
	myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
	G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

	locationStr = myValue;
	htmlAdd = locationStr;
	$('.locationStr').empty();
	$('.locationStr').append(htmlAdd);
	setPlace();
});

function setPlace() {
	map.clearOverlays(); //清除地图上所有覆盖物
	function myFun() {
		var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
		map.centerAndZoom(pp, 18);
		map.addOverlay(new BMap.Marker(pp)); //添加标注
	}
	var local = new BMap.LocalSearch(map, { //智能搜索
		onSearchComplete: myFun
	});
	local.search(myValue);
}

function bd_decrypt(bd_lon, bd_lat) {
	var X_PI = Math.PI * 3000.0 / 180.0;
	var x = bd_lon - 0.0065;
	var y = bd_lat - 0.006;
	var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
	var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
	gg_lon = z * Math.cos(theta);
	gg_lat = z * Math.sin(theta);
}