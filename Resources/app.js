var myapp = {};

Titanium.include("lib/sha1.js");
Titanium.include("myapp/ui/view.js");
Titanium.include("myapp/ui/setting.js");
Titanium.include("myapp/ui/map.js");

var cmdLists = {
	'VM':{
		'list':'listVirtualMachines',
		'res':'listvirtualmachinesresponse',
		'key':'virtualmachine'
	}, 
	'VOLUME':{
		'list':'listVolumes',
		'res':'listvolumesresponse',
		'key':'volume'
	}
};	
		
var cloudOrig = [
	{title:"Contegix", img:"img/us.png", url:"https://cloud.contegix.com/portal/client/api", hasChild:true, height:Ti.UI.FILL},
	{title:"Datapipe", img:"img/us.png", url:"https://cloud.datapipe.com/api/compute/v1", hasChild:true, height:Ti.UI.FILL},
	{title:"IDCF", img:"img/jp.png", url:"https://api.noahcloud.jp/portal/client/api", hasChild:true, height:Ti.UI.FILL},
	{title:"NineFold", img:"img/au.png", url:"https://api.ninefold.com/compute/v1.0/", hasChild:true, height:Ti.UI.FILL},
	{title:"NTTCom", img:"img/jp.png", url:"https://mycloud2.securesites.com/client/api", hasChild:true, height:Ti.UI.FILL},
	{title:"Tata", img:"img/in.png", url:"http://manage.iaas.tatacommunications.com:8080/client/api", hasChild:true, height:Ti.UI.FILL}
];
	
var cloud = new Array();
if(Ti.App.Properties.getString('cloud')){
	cloud = JSON.parse(Ti.App.Properties.getString('cloud'));
}
else{
	cloud = cloudOrig.slice(0);
}

var cloudLen = cloud.length;
var opt = "response=json";


Ti.UI.setBackgroundColor('#000');

var tabGroup = Ti.UI.createTabGroup();
var tabSetting = myapp.setting.createTab();
var tabMap = myapp.map.createTab();

var viewArray = new Array();
var btn = new Array();
for(var i=0;i<cloud.length;i++){
	viewArray[i] = myapp.view.createView(cloud[i]['title'],cloud[i]['img'],cloud[i]['url'],opt);
}

var i=0;		
var cloudWin = Ti.UI.createWindow({
	backgroundColor:'black',
	barColor:'black',
	title:cloud[i]['title'],
	rightNavButton:Ti.UI.createButton({backgroundImage:cloud[i]['img'], height:22, width:32})
});

var scrollView = Titanium.UI.createScrollableView({
    views:viewArray,
    showPagingControl:true,
    pagingControlHeight:30,
    pagingControlColor: 'black',
    maxZoomScale:0,
    currentPage:0
});

var activeView = viewArray[0];
scrollView.addEventListener('scroll', function(e){
	activeView = e.view;  
	i = e.currentPage;
	if(i >= 0){
		cloudWin.setTitle(cloud[i]['title']);
		cloudWin.setRightNavButton(Ti.UI.createButton({backgroundImage:cloud[i]['img'], height:22, width:32}));
	}
});
cloudWin.add(scrollView);

var tabCloud = Ti.UI.createTab({
	title:'Cloud',
	icon:'img/Cloud.png',
	window:cloudWin
});

tabGroup.addTab(tabCloud);
tabGroup.addTab(tabMap); 
tabGroup.addTab(tabSetting); 

if(Ti.App.Properties.getString('addCloud')){
	addCloud = JSON.parse(Ti.App.Properties.getString('addCloud'));
	cloud[cloudLen] = addCloud;
	viewadd = myapp.view.createView(cloud[cloudLen]['title'],cloud[cloudLen]['img'],cloud[cloudLen]['url'],opt);
	scrollView.addView(viewadd);
}

tabGroup.open();