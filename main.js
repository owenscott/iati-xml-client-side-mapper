function initialize() {
	//get map config settings
	var mapSettings = getConfigSettings("config.xml");
	
	//get and parse xml
	var activityXml = new JKL.ParseXML(mapSettings.path);
	var activityJson = activityXml.parse();
	var activityCountries = activityJson["iati-activities"]["iati-activity"]["recipient-country"];
	var activityLocations = activityJson["iati-activities"]["iati-activity"]["location"];
	
	//countries
	var countryPolygons = new Array();
	if (activityCountries instanceof Array) {}
	else {
		countryPolygons[0] = new locationPolygon(countries[activityCountries["code"]]);
	}
	
	//locations
	var locationMarkers = new Array();
	if (activityLocations instanceof Array) {
		
		for (var l in activityLocations) {
			switch (activityLocations[l]["location-type"]["code"]) //check type of location
			{
			case "PCL":
				switch (mapSettings.pclMarker) {
				case "point":
					locationMarkers[l] = new locationMarker(activityLocations[l]["coordinates"]["latitude"], activityLocations[l]["coordinates"]["longitude"], activityLocations[l]["name"]);
					break;
				case "polygon":
					//finish later
					break;
				case "none":
					break;
				}
				break;
			case "ADM1":
				switch (mapSettings.adm1Marker) {
				case "point":
					locationMarkers[l] = new locationMarker(activityLocations[l]["coordinates"]["latitude"], activityLocations[l]["coordinates"]["longitude"], activityLocations[l]["name"]);
					break;
				case "polygon":
					//not yet supported
					break;
				case "none":
					break;
				}
				break;
			case "ADM2":
				switch (mapSettings.adm2Marker) {
				case "point":
					locationMarkers[l] = new locationMarker(activityLocations[l]["coordinates"]["latitude"], activityLocations[l]["coordinates"]["longitude"], activityLocations[l]["name"]);
					break;
				case "polygon":
					//not yet supported
					break;
				case "none":
					break;
				}
				break;
			default:
				switch (mapSettings.otherMarker) {
				case "point":
					locationMarkers[l] = new locationMarker(activityLocations[l]["coordinates"]["latitude"], activityLocations[l]["coordinates"]["longitude"], activityLocations[l]["name"]);
					break;
				case "none":
					break;
				}
				break;
				
			}
		}
	} else {}
	//initialize google maps
	var latitude = 0;//-11; 
	var longitude = 0;//34;
	var myLatLng = new google.maps.LatLng(latitude, longitude);
	var googleMapOptions = {
		zoom : 4,//8,
		center : myLatLng,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
	}
	var map = new google.maps.Map(document.getElementById("map_canvas"), googleMapOptions);
	//add markers
	for (var m in locationMarkers) {
		locationMarkers[m].marker.setMap(map);
	}
	for (var c in countryPolygons) {
		for (var p in countryPolygons[c].polygon) {
			countryPolygons[c].polygon[p].setMap(map);
			var vertices = countryPolygons[c].polygon[p].getPath();
			var contentString = "";
			/*for (var i =0; i < vertices.length; i++) {
			var xy = vertices.getAt(i);
			contentString += "\n" + "Coordinate: " + i + "\n" + xy.lat() +"," + xy.lng();
			
		  }
		  alert(contentString);*/
		}
	}
}

function locationMarker(latitude, longitude, name) {
	this.marker = new google.maps.Marker({
			position : new google.maps.LatLng(latitude, longitude),
			title : name
		});
}

function locationPolygon(coordString) {
	this.polygon = new Array();
	var lat;
	var lng;
	for (var p in coordString) {
		var coords = coordString[p].split(" "); //splits the coordinate string into an array of point strings ("latitude,longitude,elevation")
		var gmCoords = new Array();
		for (var c = 0; c < coords.length; c = c + 1) {
			var pointCoords = coords[c].split(","); //splits the point string into an array of individual coordinates
			if (isNaN(Number(pointCoords[0])) == false && isNaN(Number(pointCoords[1])) == false) { //check if coordinates are numbers
				lat = Number(pointCoords[1]);
				lng = Number(pointCoords[0]);
				gmCoords.push( new google.maps.LatLng(lat, lng)); //pointCoords[0] = latitude, pointCoords[1] = longitude
			}
		}
		
		this.polygon[p] = new google.maps.Polygon({
				paths : gmCoords,
				strokeColor : "#FF0000",
				strokeOpacity : 0.8,
				strokeWeight : 2,
				fillColor : "#FF0000",
				fillOpacity : 0.35
			});
	}
}
