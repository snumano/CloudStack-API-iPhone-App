(function() {
	myapp.sub = {};

	// sub routine
	myapp.sub.makeTableHeader = function(){
		var border = Ti.UI.createView({
			backgroundColor:"#576c89",
			height:2,
			bottom:0
		});
		var tableHeader = Ti.UI.createView({
			backgroundColor:"#e2e7ed",
			width:320,
			height:60
		});
		tableHeader.add(border);

		var arrow = Ti.UI.createView({
			backgroundImage:"img/whiteArrow.png",
			width:23,
			height:60,
			bottom:10,
			left:20
		});

		var statusLabel = Ti.UI.createLabel({
			text:"Pull to reload",
			left:55,
			width:200,
			bottom:30,
			height:"auto",
			color:"#576c89",
			textAlign:"center",
			font:{fontSize:13,fontWeight:"bold"},
			shadowColor:"#999",
			shadowOffset:{x:0,y:1}
		});
		
		var actInd = Titanium.UI.createActivityIndicator({
			left:20,
			bottom:13,
			width:30,
			height:30
		});

		tableHeader.add(arrow);
		tableHeader.add(statusLabel);
		tableHeader.add(actInd);
		return{border:border, tableHeader:tableHeader, arrow:arrow, statusLabel:statusLabel, actInd:actInd};
	};

	myapp.sub.getUrl = function(apiUrl,apiKey,secretKey,cmd,opt){
		var signature ="";

		if(opt){
			opt = "&" + opt;
		}
		cmd = "command=" + cmd + opt + "&apiKey=" +apiKey ;
		var cmdOrig = cmd;

		//Step1 & 2
		cmdArray = cmd.split("&");
		cmd = encodeURI(cmdArray.sort().join("&").toLowerCase());
		//Ti.API.info(cmd);

		//Step3
		var sig = b64_hmac_sha1(secretKey, cmd);
		sig = encodeURIComponent(sig);
		//Ti.API.info(sig);

		var url = apiUrl+"?"+cmdOrig+"&signature="+sig;
		Ti.API.info(url);
	
		return url;
	};
})();
