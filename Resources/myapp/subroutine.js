(function() {
	myapp.sub = {};

	// sub routine
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
		//Ti.API.info(sig);
		sig = encodeURIComponent(sig);
		//Ti.API.info(sig);

		var url = apiUrl+"?"+cmdOrig+"&signature="+sig;
		Ti.API.info(url);
	
		return url;
	}
})();
