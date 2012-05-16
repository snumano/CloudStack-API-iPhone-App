var myapp = {};
Titanium.include("lib/sha1.js");
Titanium.include("myapp/ui/tab.js");
Titanium.include("myapp/ui/setting.js");

var cloud = [
	["Tata","img/in.png","http://manage.iaas.tatacommunications.com:8080/client/api"],
	["NineFold","img/au.png","https://api.ninefold.com/compute/v1.0/"],
	["Datapipe","img/us.png","https://cloud.datapipe.com/api/compute/v1"],
	["NTTCom","img/jp.png","https://mycloud2.securesites.com/client/api"],
	["IDCF","img/jp.png","https://api.noahcloud.jp/portal/client/api"],
	["Contegix","img/us.png","https://cloud.contegix.com/portal/client/api"]
];
var countCloud = cloud.length;
var opt = "response=json";

Ti.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Ti.UI.createTabGroup();
var tabSetting = myapp.setting.createTab();

var tab0 = myapp.tab.createTab(cloud[0][0],cloud[0][1],cloud[0][2],opt);
var tab1 = myapp.tab.createTab(cloud[1][0],cloud[1][1],cloud[1][2],opt);
var tab2 = myapp.tab.createTab(cloud[2][0],cloud[2][1],cloud[2][2],opt);
var tab3 = myapp.tab.createTab(cloud[3][0],cloud[3][1],cloud[3][2],opt);
var tab4 = myapp.tab.createTab(cloud[4][0],cloud[4][1],cloud[4][2],opt);
var tab5 = myapp.tab.createTab(cloud[5][0],cloud[5][1],cloud[5][2],opt);
var tabadd;

tabGroup.addTab(tab0);  
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tabSetting); 
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);

if(Ti.App.Properties.getString('addCloud')){
	addCloud = JSON.parse(Ti.App.Properties.getString('addCloud'));
	cloud[countCloud] = addCloud;
	tabadd = myapp.tab.createTab(cloud[countCloud][0],cloud[countCloud][1],cloud[countCloud][2],opt);
		
	if(tabadd){
		tabGroup.removeTab(tabadd);	
	}
	
	tabGroup.addTab(tabadd);  
}

tabGroup.open();
