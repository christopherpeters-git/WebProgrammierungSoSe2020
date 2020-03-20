"use strict";

class Comment{
    constructor(author,message){
        var date = new Date();
        this.author = author;
        this.message = message;
        this.date = date.toDateString();
    }
}

function createAjaxRequest(){
    var request;
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject();
    }
    return request;
}

//Versteckt/Zeigt den Videoplayer
function toggleVisibility(){
    var vidPlayer = document.getElementById("videoplayer");
    if(vidPlayer.style.display == "none"){
        vidPlayer.style.display = "block";
    }else{
        vidPlayer.style.display = "none";
    }
}

//Erstellt einen neuen Kommentar
function submitComment(){
    var newComment = document.createElement("div");
    var authorInput = document.getElementById("inputname");
    var messageInput = document.getElementById("inputmessage");
    var date = new Date();

    newComment.setAttribute("class","comment");
    newComment.innerHTML = "<h3>" + authorInput.value + " - " + date.toDateString() +  "</h3>" + messageInput.value;
    document.getElementById("commentsection").appendChild(newComment);
    
    authorInput.value = "";
    messageInput.value = "";
}

//Setzt den Titel des Videos
function initVideoPlayer(){
    var videoSrcPath = document.getElementById("videosource").src;
    var videoName = videoSrcPath.substr(videoSrcPath.lastIndexOf("/") + 1);
    document.getElementById("videotitle").innerHTML = videoName;
}
