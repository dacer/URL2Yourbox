function onClickDownload() {
	if (document.getElementById("url").value !== '') {
		options = {
        files: [
            {
                'url': document.getElementById("url").value,
                'filename': document.getElementById("file-name").value}
        ],
        success: function() {
            // console.log("success");
            document.getElementById('light').style.display='none';
            document.getElementById('fade').style.display='none';
			showToast("Download finished");
        },
        progress: function(progress) {
            // console.log(progress);
            showToast("Downloading.."+progress*100+"%");
        },
        cancel: function() {
            console.log("cancel");
			showToast("Download canceled");
        },
        error: function(errmsg) {
            console.log(errmsg);
            showToast(errmsg);
        }	 
    }	
	    console.log(document.getElementById("url").value);
	    Dropbox.save(options);
	}else{
		alert("File URL cannot empty");
	};
    
}

// function showProcess(){
// 	var light = document.getElementById("light");
// 	light.style.display="block";
// 	var fade = document.getElementById("fade");
// 	fade.style.display="block";
// 	var waitNode = document.createTextNode("Downloadind..");
// 	light.appendChild(waitNode);	
// }

function showToast(toastText){
	var allAlpha = 0;
	var toastDiv = document.createElement("div");
	toastDiv.setAttribute("id", "toast");
	toastDiv.style.width = "100%";
	toastDiv.style.position = "fixed";
	toastDiv.style.bottom = "35px";
	toastDiv.style.textAlign = "center";

	var toastInner = document.createElement("span");
	toastInner.setAttribute("id", "toastInner");
	toastInner.style.backgroundColor = "black";
	toastInner.style.color = "white";
	toastInner.style.padding = "5px 15px";
	toastInner.style.fontSize = "20px";
	toastInner.style.borderRadius = "3px";
	toastInner.style.boxShadow = "3px 3px 6px black";


	var node = document.createTextNode(toastText);
	toastInner.appendChild(node);
	toastDiv.appendChild(toastInner);
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(toastDiv);

	
	var toastAnim = setInterval(function(){	
		toastInner.style.opacity = allAlpha;
		allAlpha += 0.008;
		if (allAlpha > 0.85) {
			clearInterval(toastAnim);
		};
	},10);

// hideToast
	setTimeout(function(){
		var hideToastAnim = setInterval(function(){	
		toastInner.style.opacity = allAlpha;
		allAlpha -= 0.008;
		if (allAlpha <= 0) {
			clearInterval(hideToastAnim);
		};
	},10);
	},5000);
}
