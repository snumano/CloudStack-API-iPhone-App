var myapp = {};
Titanium.include("lib/sha1.js");
Titanium.include("myapp/ui/tab.js");
Titanium.include("myapp/ui/setting.js");

var cloud = [
	["Tata","img/in.png","http://manage.iaas.tatacommunications.com:8080/client/api"],
	["NineFold","img/au.png","https://api.ninefold.com/compute/v1.0/"],
	["Datapipe","img/us.png","https://cloud.datapipe.com/api/compute/v1"],
	["NTTCom","img/jp.png","https://198.106.17.2/client/api"],
	["IDCF","img/jp.png","https://api.noahcloud.jp/portal/client/api"]
];
var img = "img/light_add.png";
var opt = "response=json";

Ti.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Ti.UI.createTabGroup();
var tabSetting = myapp.setting.createTab();

var tabVm0 = myapp.tab.createTab(0,cloud[0][0],cloud[0][1],cloud[0][2],opt,img);
var tabVm1 = myapp.tab.createTab(1,cloud[1][0],cloud[1][1],cloud[1][2],opt,img);
var tabVm2 = myapp.tab.createTab(2,cloud[2][0],cloud[2][1],cloud[2][2],opt,img);
var tabVm3 = myapp.tab.createTab(3,cloud[3][0],cloud[3][1],cloud[3][2],opt,img);
var tabVm4 = myapp.tab.createTab(4,cloud[4][0],cloud[4][1],cloud[4][2],opt,img);

tabGroup.addTab(tabVm0);  
tabGroup.addTab(tabVm1);  
tabGroup.addTab(tabVm2);
tabGroup.addTab(tabSetting);  
//tabGroup.addTab(tabVm3);
//tabGroup.addTab(tabVm4);


tabGroup.open();

// sub routine
myapp.getUrl = function(apiUrl,apiKey,secretKey,cmd,opt){
	var signature ="";

	if(opt){
		opt = "&" + opt;
	}
	cmd = "command=" + cmd + opt + "&apiKey=" +apiKey ;
	var cmdOrig = cmd;

	//Step1 & 2
	cmdArray = cmd.split("&");
	cmd = encodeURI(cmdArray.sort().join("&").toLowerCase());
	Ti.API.info(cmd);

	//Step3
	var sig = b64_hmac_sha1(secretKey, cmd);
	Ti.API.info(sig);
	sig = encodeURIComponent(sig);
	Ti.API.info(sig);

	var url = apiUrl+"?"+cmdOrig+"&signature="+sig;
	Ti.API.info(url);
	
	return url;
}


