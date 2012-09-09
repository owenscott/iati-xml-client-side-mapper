

//get configuration settings
function getConfigSettings(path)
{
//open and configuration file
var xmlDoc = openXmlDoc(path); //edit config file path here
regionMarker = xmlDoc.getElementsByTagName("region-marker")[0].childNodes[0].wholeText;
countryMarker = xmlDoc.getElementsByTagName("country-marker")[0].childNodes[0].wholeText;
pclMarker = xmlDoc.getElementsByTagName("pcl-marker")[0].childNodes[0].wholeText;
adm1Marker = xmlDoc.getElementsByTagName("adm1-marker")[0].childNodes[0].wholeText;
adm2Marker = xmlDoc.getElementsByTagName("adm2-marker")[0].childNodes[0].wholeText;
otherMarker = xmlDoc.getElementsByTagName("other-marker")[0].childNodes[0].wholeText;
var mapSettings = new configSettings(regionMarker,countryMarker,pclMarker,adm1Marker,adm2Marker,otherMarker);
return mapSettings;
}



function configSettings(regionMarker, countryMarker, pclMarker, adm1Marker, adm2Marker, otherMarker) {
	this.regionMarker = regionMarker;
	this.countryMarker = countryMarker;
	this.pclMarker = pclMarker;
	this.adm1Marker = adm1Marker;
	this.adm2Marker = adm2Marker;
	this.otherMarker = otherMarker;
}	


