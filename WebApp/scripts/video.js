"use strict";

const forbidden=['<','>'];

//*************************************Classes**************************************
//NOT USED YET
class Comment{
    constructor(author,message){
        var date = new Date();
        this.author = author;
        this.message = message;
        this.date = date.toDateString();
    }
}

class Video{
    constructor(id,src,name,duration){
        this.id = id;
        this.src = src;
        this.name = name;
        this.duration = duration;
    }
}

//*************************************Helpers**************************************

//creats XMLHttp- or ActiveX-Request depending on browser support
function createAjaxRequest(){
    var request;
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject();
    }
    return request;
}

//Checks if string contains illegal characters which are defined in forbidden
function isInputLegal(strIn){
    var inputLength = strIn.length;
    var forbiddenLength = forbidden.length;
    for(var i = 0; i < inputLength;i++){
        for(var j = 0; j < forbiddenLength;j++){
            if(strIn[i] == forbidden[j]){
                return false;
            }
        }
    }
    return true;
}
//*************************************Initializers************************************

//Creates an entry on the video-overview for every video listed in the videos.json
function initVideoOverview(){
    var request = createAjaxRequest();
    request.onreadystatechange = function(){
        if(4 == this.readyState && 200 == this.status){
            var videos = JSON.parse(this.responseText);
            var videoOverview = document.getElementById("videooverview");
            var video = new Video("","","","");
            for(video of videos){
                var header5 = document.createElement("h5");
                var header7 = document.createElement("h7");
                var ahref = document.createElement("a");
                ahref.href = "javascript:showVideoPlayerHideOverview(" + "'" + JSON.stringify(video)+ "'" + ")";
                ahref.innerHTML = video.name;
                header5.appendChild(ahref);
                header7.innerHTML = video.duration;
                videoOverview.appendChild(header5);
                videoOverview.appendChild(header7);
            }
        }
    }
    request.open("GET","./videos.json",true);
    request.send();
}

//*************************************HTML-called-functions***********************************
//Is called on page load, calls all initializers
function init(){
    initVideoOverview()
}

//Shows the video-player and hides the video-list
function showVideoPlayerHideOverview(videoStr){
    var vidArea = document.getElementById("videoArea");
    if(vidArea.style.display == "none") {
        var video = JSON.parse(videoStr);
        var vidOverview = document.getElementById("videooverview");
        //var videoSrc = document.getElementById("videosource");
        var videoTitle = document.getElementById("videotitle");
        var buttonBackToVideos = document.getElementById("backtovideos");
        var videoPlayer = document.createElement("video");
        var videoSource = document.createElement("source");

        videoPlayer.setAttribute("controls","true");
        videoPlayer.setAttribute("width","800");
        videoPlayer.setAttribute("height","450");
        videoSource.setAttribute("type","video/mp4");
        videoSource.setAttribute("src",video.src);
        videoPlayer.appendChild(videoSource);
        vidArea.insertBefore(videoPlayer,vidArea.firstChild);

        vidOverview.style.display = "none";
        videoTitle.innerHTML = video.name;
        buttonBackToVideos.style.display = "block";
        vidArea.style.display = "block";
    }
}
//Shows the video-list and hides the video-player
function showOverviewHideVideoplayer(){
    var vidOverview = document.getElementById("videooverview");
    if(vidOverview.style.display == "none"){
        var vidArea = document.getElementById("videoArea");
        var buttonBackToVideos = document.getElementById("backtovideos");
        vidArea.removeChild(vidArea.firstChild);
        vidArea.style.display = "none";
        vidOverview.style.display = "block";
        buttonBackToVideos.style.display = "none";
    }
}

//Creats a new comment
function submitComment(){
    var newComment = document.createElement("div");
    var authorInput = document.getElementById("inputname");
    var messageInput = document.getElementById("inputmessage");
    var date = new Date();
    if(!isInputLegal(authorInput.value) || !isInputLegal(messageInput.value)){
        return;
    }
    newComment.setAttribute("class","comment");
    newComment.innerHTML = "<h3>" + authorInput.value + " - " + date.toDateString() + " " + date.toTimeString() +  "</h3>" + messageInput.value;
    document.getElementById("commentsection").appendChild(newComment);

    authorInput.value = "";
    messageInput.value = "";
}
