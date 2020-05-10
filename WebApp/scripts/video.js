"use strict";

const forbidden=['<','>'];
const localStorageVideoPrefix = "video";

//*************************************Classes**************************************
//NOT USED YET
class Comment{
    constructor(author,message){
        const date = new Date();
        this.author = author;
        this.message = message;
        this.date = date.toDateString() + " " + date.toTimeString();
    }
}

class Video{
    constructor(id,src,name,duration,category){
        this.id = id;
        this.src = src;
        this.name = name;
        this.duration = duration;
        this.category = category;
    }
}

//*************************************Helpers**************************************

//creats XMLHttp- or ActiveX-Request depending on browser support
function createAjaxRequest(){
    let request;
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject();
    }
    return request;
}

//Checks if string contains illegal characters which are defined in forbidden
function isInputLegal(strIn){
    if(!strIn || (strIn.length === 0)){
        return false;
    }
    const inputLength = strIn.length;
    const forbiddenLength = forbidden.length;
    for(let i = 0; i < inputLength;i++){
        for(let j = 0; j < forbiddenLength;j++){
            if(strIn[i] == forbidden[j]){
                return false;
            }
        }
    }
    return true;
}

//Loads comments from webstorage. Returns elements in an array, returns array with size 0 if no comments found for id
function loadCommentsForId(id){
    let comments;
    if(localStorage.getItem(localStorageVideoPrefix + String(id))){
        comments = JSON.parse(localStorage.getItem(localStorageVideoPrefix + String(id)));
    }else{
        comments = new Array();
        console.log("No comments found!");
    }
    return comments;
}

//Saves comments in webstorage for video id.
function saveCommentsForId(comments, id){
    localStorage.setItem(localStorageVideoPrefix + String(id), JSON.stringify(comments));
}

//Clears "createcommentarea" and generates and appends saved comments to parent
function generateComments(videoIdStr){
    const createCommentArea = document.getElementById("createcommentarea");
    createCommentArea.innerHTML = "";
    const comments = loadCommentsForId(videoIdStr);
    if(!(comments.length === 0)){
        for(let i = 0; i < comments.length; i++){
            //Create new comment-html
            const newComment = document.createElement("div");
            newComment.setAttribute("class","comment");
            const header3 = document.createElement("h3");
            header3.innerHTML = comments[i].author + " - " + comments[i].date;
            const message = document.createElement("p");
            message.innerHTML = comments[i].message;
            newComment.appendChild(header3);
            newComment.appendChild(message);
            createCommentArea.appendChild(newComment);
        }
    }
}


//creates a comment, in use for foreach loop

//*************************************Initializers************************************

//Creates an entry on the video-overview for every video listed in the videos.json
function initVideoOverview(){
    const request = createAjaxRequest();
    request.onreadystatechange = function(){
        if((4 === this.readyState) && (200 === this.status)){
            const videos = JSON.parse(this.responseText);
            const videoOverview = document.getElementById("videooverview");
            let video = new Video("","","","");
            for(video of videos){
                const videoDiv = document.createElement("div");
                const header5 = document.createElement("h5");
                const header7 = document.createElement("h7");
                const a = document.createElement("a");
                const img = document.createElement("img");

                videoDiv.setAttribute("class","videoLink");
                a.href = "javascript:showVideoPlayerHideOverview(" + "'" + JSON.stringify(video)+ "'" + ")";
                img.setAttribute("src",video.thumbnailPath);
                console.log(video.thumbnailPath);
                img.setAttribute("class","thumbnail");
                header5.innerHTML = video.name;
                header7.innerHTML = video.duration;
                videoDiv.appendChild(img);
                videoDiv.appendChild(header5);
                videoDiv.appendChild(header7);
                a.appendChild(videoDiv);
                videoOverview.appendChild(a);
            }
        }
    }
    request.open("GET","videos.json",true);
    request.send();
}

//*************************************HTML-called-functions***********************************
//Is called on page load, calls all initializers
function init(){
    initVideoOverview();
    eventOnEnterByLogin();
}

//Shows the video-player and hides the video-list
function showVideoPlayerHideOverview(videoStr){
    document.getElementById("searchentrys").innerHTML = "";
    var vidArea = document.getElementById("videoArea");
    if(vidArea.style.display == "none") {
        const buttonMainP = document.getElementById("returnToMainPage");
        const video = JSON.parse(videoStr);
        const vidOverview = document.getElementById("videooverview");
        const videoTitle = document.getElementById("videotitle");
        const buttonBackToVideos = document.getElementById("backtovideos");
        const videoPlayer = document.createElement("video");
        const videoSource = document.createElement("source");
        const videoId = document.createElement("div");
        const slideShow = document.getElementById("slideShow");

        //Initialize video player
        videoPlayer.setAttribute("controls","true");
        videoPlayer.setAttribute("autoplay","true");
        videoPlayer.setAttribute("width","800");
        videoPlayer.setAttribute("height","450");
        videoSource.setAttribute("type","video/mp4");
        videoSource.setAttribute("src",video.src);
        videoId.setAttribute("id","videoId");
        videoId.setAttribute("style","display: none;")
        videoPlayer.appendChild(videoSource);
        videoPlayer.appendChild(videoId);
        vidArea.insertBefore(videoPlayer,vidArea.firstChild);

        videoId.innerHTML = video.id;
        vidOverview.style.display = "none";
        videoTitle.innerHTML = video.name;
        buttonBackToVideos.style.display = "block";
        vidArea.style.display = "block";
        buttonMainP.style.display = "none";

        generateComments(videoId.innerHTML);
        if(slideShow.style.display == "block") {
            hideSlideShow();
        }
    }
}

//Shows the video-list and hides the video-player
function showOverviewHideVideoplayer(){
    document.getElementById("searchentrys").innerHTML = "";
    const vidOverview = document.getElementById("videooverview");
    if(vidOverview.style.display == "none"){
        const vidArea = document.getElementById("videoArea");
        const buttonBackToVideos = document.getElementById("backtovideos");
        const createCommentArea = document.createElement("createcommentarea");
        const buttonBackToMainPage = document.getElementById("returnToMainPage");

        createCommentArea.innerHTML = "";
        if(vidArea.firstChild != null) {
            vidArea.removeChild(vidArea.firstChild);
        }
        vidArea.style.display = "none";
        vidOverview.style.display = "block";
        buttonBackToVideos.style.display = "none";
        buttonBackToMainPage.style.display = "none";
        hideSlideShow();
    }
}

//Creates a new comment
function submitComment(){
    //Get needed elements
    const authorInput = document.getElementById("inputname");
    const author = authorInput.value;
    const messageInput = document.getElementById("inputmessage");
    const message = messageInput.value;
    const videoId = document.getElementById("videoId");

    //Check inputs for illegal chars
    if(!isInputLegal(authorInput.value) || !isInputLegal(messageInput.value)){
        return;
    }
    //Create new comment
    const newComment = new Comment(author,message);
    //Save new comment in webstorage
    const currentVideoId = document.getElementById("videoId");
    const comments = loadCommentsForId(currentVideoId.innerHTML);
    if(!comments){
        console.log("No entry for this video found");
    }
    comments.push(newComment);
    saveCommentsForId(comments, currentVideoId.innerHTML);

    //Reset form values
    authorInput.value = "";
    messageInput.value = "";

    generateComments(videoId.innerHTML);
}

function searchVideos() {
    document.getElementById("searchentrys").innerHTML = "";
    const slideShow = document.getElementById("slideShow");
    if(slideShow.style.display == "block") {
        //console.log("jabadadu");
        hideSlideShow();
    }
    const buttonBackToMainPage = document.getElementById("returnToMainPage");
    buttonBackToMainPage.style.display = "block";
    const search = document.getElementById("searchentry").value;
    const vidOverview = document.getElementById("videooverview")
    vidOverview.style.display = "none";
    console.log(search);
    let video = new Video("","","","");
    var request = createAjaxRequest();
    request.onreadystatechange = function(){
        if(4 == this.readyState && 200 == this.status) {
            const videos = JSON.parse(this.responseText);
            const searchresults = document.getElementById("searchentrys");
            for (video of videos) {
                // console.log(video.name)
                if(checkVideoAttributes(search,video) || (video.duration.localeCompare(search)==0)) {
                    const videoDiv = document.createElement("div");
                    const header5 = document.createElement("h5");
                    const header7 = document.createElement("h7");
                    const a = document.createElement("a");
                    const img = document.createElement("img");

                    videoDiv.setAttribute("class","videoLink");
                    a.href = "javascript:showVideoPlayerHideOverview(" + "'" + JSON.stringify(video)+ "'" + ")";
                    img.setAttribute("src",video.thumbnailPath);
                    console.log(video.thumbnailPath);
                    img.setAttribute("class","thumbnail");
                    header5.innerHTML = video.name;
                    header7.innerHTML = video.duration;
                    videoDiv.appendChild(img);
                    videoDiv.appendChild(header5);
                    videoDiv.appendChild(header7);
                    a.appendChild(videoDiv);
                    searchresults.appendChild(a);
                }
            }
        }
    }
    request.open("GET","./videos.json",true);
    request.send();

}

function checkVideoAttributes(searchEntry,video) {
    if(searchEntry === "") {
        return false;
    }
    let searchEntryNormalized = searchEntry.toUpperCase();
    let videoName = video.name.toUpperCase();
    let videoCategory = video.category.toUpperCase();
    if(videoName.includes(searchEntryNormalized) || videoCategory.includes(searchEntryNormalized)) {
        return true;
    }
}
//*************************************Slideshow-Functions***********************************
function slideshowGetVideo(i) {
    if (i===0) {
        var json = {"id": 2, "src": "media/videos/Avengers_Whatever_It_Takes.mp4", "name": "Whatever_it_takes", "duration": "0:04"};
        var test_string = JSON.stringify(json);
        showVideoPlayerHideOverview(test_string);
    } else  if (i===1) {
        var json = {"id": 1, "src": "media/videos/wendler_egal.mp4", "name": "Whatever_it_takes", "duration": "0:04"};
        var test_string = JSON.stringify(json);
        showVideoPlayerHideOverview(test_string);
    }

}
function hideSlideShow() {
    const slideShow= document.getElementById("slideShow");
    if(slideShow.style.display=="none"){
        slideShow.style.display = "block";
    }else {
        slideShow.style.display = "none";
    }

}