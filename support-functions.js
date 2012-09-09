function openXmlDoc(path) {
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", path, false); 
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	return xmlDoc
}
