"use strict";

import {loadVideos} from "./videooverview";

const forbidden=['<','>'];

class Comment{
    constructor(author,message){
        var date = new Date();
        this.author = author;
        this.message = message;
        this.date = date.toDateString();
    }
}

//*************************************Helpers**************************************
function createAjaxRequest(){
    var request;
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject();
    }
    return request;
}

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
//*************************************Initializer************************************
function init(){
    loadVideos()
    initVideoPlayer()
}

function initVideoPlayer(){
    var videoSrcPath = document.getElementById("videosource").src;
    var videoName = videoSrcPath.substr(videoSrcPath.lastIndexOf("/") + 1);
    document.getElementById("videotitle").innerHTML = videoName;
}

//*************************************Others*****************************************


function showVideoPlayerHideOverview(videoStr){
    var vidPlayer = document.getElementById("video");
    if(vidPlayer.style.display == "none") {
        var video = JSON.parse(videoStr);
        var vidOverview = document.getElementById("videooverview");
        var videoSrc = document.getElementById("videosource");
        var videoTitle = document.getElementById("videotitle");
        var buttonBackToVideos = document.getElementById("backtovideos");

        vidOverview.style.display = "none";
        vidPlayer.style.display = "block";
        videoSrc.src = video.src;
        videoTitle.innerHTML = video.name;
        buttonBackToVideos.style.display = "block";
    }
}

function showOverviewHideVideoplayer(){
    var vidOverview = document.getElementById("videooverview");
    if(vidOverview.style.display == "none"){
        var buttonBackToVideos = document.getElementById("backtovideos");
        var vidPlayer = document.getElementById("video");
        vidPlayer.style.display = "none";
        vidOverview.style.display = "block";
        buttonBackToVideos.style.display = "none";
    }
}

//Erstellt einen neuen Kommentar
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

export {createAjaxRequest,init,initVideoPlayer,showOverviewHideVideoplayer,showVideoPlayerHideOverview,submitComment}









