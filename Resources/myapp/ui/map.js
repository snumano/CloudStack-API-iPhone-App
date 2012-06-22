(function() {
	myapp.map = {};
	myapp.map.createTab = function(){
		var win = Ti.UI.createWindow({
			barColor:'black',
			title: 'Map',
			});
		var tab = Ti.UI.createTab({  
			title:'Map',
    		icon:'img/light_globe.png',
    		window:win
		});
		
		var mapview = Titanium.Map.createView({
    		mapType: Titanium.Map.STANDARD_TYPE,
    		region:{latitude:40, longitude:130, latitudeDelta:90, longitudeDelta:360},
    		animate:true,
    		regionFit:false,
		});

		var Contegix = Titanium.Map.createAnnotation({
        	latitude:38.625542,
        	longitude:-90.194946,
        	title:"Contegix",
        	subtitle:'Saint Louis',
        	pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var Datapipe1 = Titanium.Map.createAnnotation({
        	latitude:40.745491,
        	longitude:-73.982758,
        	title:"Datapipe",
        	subtitle:'New York',
        	pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var Datapipe2 = Titanium.Map.createAnnotation({
	        latitude:22.284881,
    	    longitude:114.154996,
        	title:"Datapipe",
	        subtitle:'Hong Kong',
    	    pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var Datapipe3 = Titanium.Map.createAnnotation({
	        latitude:37.378615,
    	    longitude:-121.916656,
        	title:"Datapipe",
	        subtitle:'Silicon Valley',
    	    pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var Datapipe4 = Titanium.Map.createAnnotation({
        	latitude:51.518593,
	        longitude:-0.098476,
    	    title:"Datapipe",
        	subtitle:'London',
	        pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var Datapipe5 = Titanium.Map.createAnnotation({
    		    latitude:31.165572,
        		longitude:121.49398,
		        title:"Datapipe",
    		    subtitle:'Shanghai',
	    	    pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var IDCF = Titanium.Map.createAnnotation({
    	    latitude:35.689488,
        	longitude:139.691706,
	        title:"IDCF",
    	    subtitle:'Tokyo',
        	pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var NineFold = Titanium.Map.createAnnotation({
        	latitude:-33.871584,
	        longitude:151.203054,
    	    title:"NineFold",
        	subtitle:'Sydney',
	        pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var NTTCom2 = Titanium.Map.createAnnotation({
    	    latitude:37.354108,
        	longitude:-121.955236,
        	title:"NTTCom",
        	subtitle:'USA',
        	pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var Tata1 = Titanium.Map.createAnnotation({
    	    latitude:19.075984,
        	longitude:72.877656,
	        title:"Tata",
    	    subtitle:'South India',
        	pincolor:Titanium.Map.ANNOTATION_GREEN
		});
		var Tata2 = Titanium.Map.createAnnotation({
        	latitude:1.335503,
        	longitude:103.890461,
	        title:"Tata",
    	    subtitle:'Singapore',
        	pincolor:Titanium.Map.ANNOTATION_GREEN
		});

		// ピンの追加
		mapview.addAnnotations([Contegix, Datapipe1, Datapipe2, Datapipe3, Datapipe4, Datapipe5, IDCF, NineFold, NTTCom2, Tata1, Tata2]);
		win.add(mapview);

/*
// GPS の利用目的を表示。iOS 4 以降では必須。
Titanium.Geolocation.purpose = 'サンプル';

Titanium.Geolocation.getCurrentPosition(
    function(e) {
        if (!e.success || e.error){
            alert('位置情報が取得できませんでした');
            return;
        }

        latitude = e.coords.latitude;
        longitude = e.coords.longitude;
        Ti.API.info('LAT:' + latitude);
        Ti.API.info('LONG:' + longitude);
        
        // ピンを立てる
        var currentPos = Titanium.Map.createAnnotation({
            latitude:latitude,
            longitude:longitude,
            title:"現在地",
            pincolor:Titanium.Map.ANNOTATION_GREEN,
            animate:true
        });
        mapview.addAnnotation(currentPos);
        mapview.show(); // 隠していた地図を表示する
        mapview.setLocation({   // 現在地まで地図をスクロールする
            latitude:latitude,
            longitude:longitude,
            latitudeDelta:0.01,
            longitudeDelta:0.01
        });
    }
);
*/

		return tab;	
	}
})();