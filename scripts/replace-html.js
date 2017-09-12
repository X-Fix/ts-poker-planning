const fs = require('fs');
const args = process.argv.slice(2);
let config = {};

switch (args[0]) {
	case "watch":
		config.buildScript = "<script src=\"build.js\" type=\"application/javascript\"></script>";
		config.styleSheet = "<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\"/>";
		config.analytics = "";
		config.fullStory = "";
		config.title = "<title>Working Example</title>";
		break;
	case "production":
		config.buildScript = "<script src=\"build.min.js\" type=\"application/javascript\"></script>";
		config.styleSheet = "<link rel=\"stylesheet\" href=\"style.min.css\" type=\"text/css\"/>";
		config.analytics = "";
		config.fullStory = "<script>window[\"_fs_debug\"] = false;window[\"_fs_host\"] = \"fullstory.com\";window[\"_fs_org\"] = \"73DWB\";window[\"_fs_namespace\"] = \"FS\";(function(m,n,e,t,l,o,g,y){if (e in m) {if(m.console && m.console.log) { m.console.log(\"FullStory namespace conflict. Please set window[\"_fs_namespace\"].\");} return;}g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];o=n.createElement(t);o.async=1;o.src=\"https://\"+_fs_host+\"/s/fs.js\";y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};g.identifyAccount=function(i,v){o=\"account\";v=v||{};v.acctId=i;g(o,v)};g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match(\"fs_uid=[`;`]*`[`;`]*`[`;`]*`\")){d=n.domain;while(1){n.cookie=\"fs_uid=;domain=\"+d+\";path=/;expires=\"+new Date(0).toUTCString();i=d.indexOf(\".\");if(i<0)break;d=d.slice(i+1)}}};})(window,document,window[\"_fs_namespace\"],\"script\",\"user\");</script>\"";
		config.title = "<title>Poker Planning</title>";
	break;
}

fs.readFile('client/html/index.html', 'utf-8', function (err, data) {
	if (err) throw err;

	var newValue = data
					.replace("<!-- ReplaceAnalytics -->", config.analytics || "")
					.replace("<!-- ReplaceBuildScript -->", config.buildScript)
					.replace("<!-- ReplaceFullStory -->", config.fullStory || "")
					.replace("<!-- ReplaceStyleSheet -->", config.styleSheet)
					.replace("<!-- ReplaceTitle -->", config.title);
	
	fs.writeFile('public/index.html', newValue, 'utf-8', function (err) {
		if (err) throw err;
	});
});