"use strict";

const forbidden=['<','>','/'];
const categories= ["Entertainment", "Music","Cars"];
let impressumCalled = false;
let videoplayerOpen = false;
//*************************************Classes**************************************
class Video{
    constructor(id,src,name,duration,category,thumbnailPath){
        this.id = id;
        this.src = src;
        this.name = name;
        this.duration = duration;
        this.category = category;
        this.thumbnailPath = thumbnailPath;
    }
}

//*************************************Helpers**************************************

//creates XMLHttp- or ActiveX-Request depending on browser support
function createAjaxRequest(){
    let request;
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return request;
}

//Checks if string contains illegal characters which are defined in forbidden
function isInputLegal(strIn){
    if(!strIn || (strIn.length === 0)){
        return false;
        console.log("String illegal");
    }
    const inputLength = strIn.length;
    const forbiddenLength = forbidden.length;
    for (let i = 0; i < inputLength; i++) {
        for (let j = 0; j < forbiddenLength; j++) {
            if (strIn[i] === forbidden[j]) {
                return false;
            }
        }
    }
    console.log("String is legal");
    return true;
}

function createVideoAnker(video){
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
    return a;
}
//*************************************Initializers************************************

//Creates an entry on the video-overview for every video listed in the videos.json
function initVideoOverview() {
    const request = createAjaxRequest();
    request.onreadystatechange = function () {
        if ((4 === this.readyState) && (200 === this.status)) {
            const videos = JSON.parse(this.responseText);
            const videoOverview = document.getElementById("videooverview");
            let video = new Video("", "", "", "");
            for (let i = 0; i < categories.length; i++) {
                let t = document.createTextNode(categories[i]);
                let hr = document.createElement("hr");
                const text_div = document.createElement("div");
                const videoKat = document.createElement("div");
                videoKat.setAttribute("id", categories[i]);
                text_div.setAttribute("class", "text_category");
                videoKat.setAttribute("class", "category");
                text_div.appendChild(t);
                text_div.appendChild(hr);
                videoKat.appendChild(text_div);
                videoOverview.appendChild(videoKat);
            }

            for (video of videos) {
                let cat = "";
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i] === video.category) {
                        cat = categories[i];
                        console.log(i);
                        break;
                    }
                }
                if (cat === "") {
                    return;
                }
                const catDiv = document.getElementById(cat);
                const newAnker = createVideoAnker(video);
                catDiv.appendChild(newAnker);
            }
        }
    }
    request.open("GET", "videos.json", true);
    request.send();
}

//*************************************HTML-called-functions***********************************
//Is called on page load, calls all initializers
function init(){
    addEnterFunctionality();
    initVideoOverview();
    eventOnEnterByLogin();
    setEventHandlerSlideShow();

    document.getElementById("inputMessage").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitCommentButton").click();
        }
    })

    // Eventlistener for slideshow
    setEventHandlerSlideShow();
    document.getElementById("searchPic").addEventListener('mouseenter',function () {
        document.getElementById("searchPic").style.backgroundColor="#cccccc";
    },false);
    document.getElementById("searchPic").addEventListener('mouseleave',function () {
        document.getElementById("searchPic").style.backgroundColor="#FFFFFF";
    },false);
    addEventListener("scroll",searchbarScroll,false);
    document.getElementById("slideshow-container").addEventListener('mouseenter', setButtonsVisible, false);
    document.getElementById("slideshow-container").addEventListener('mouseleave', setButtonsHidden, false);

    // Eventlistener for Video Player (X-Button)
    const videoArea = document.getElementById('videoArea');
    videoArea.addEventListener('mouseenter', () => {
        document.getElementById('backtovideos').hidden = false;
    }, true);
    videoArea.addEventListener('mouseleave', () => {
        document.getElementById('backtovideos').hidden = true;
    }, true);
}

function addEnterFunctionality() {
    const inputSearch = document.getElementById("searchentry");
    inputSearch.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchPic").click();
        }
    })
}


//von W3School
// Searchbar ist fixed und folgt beim Scrollen
function searchbarScroll() {
    const header = document.getElementById("upperBody");
// Get the offset position of the navbar
    const sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

}

//Shows the video-player and hides the video-list
function showVideoPlayerHideOverview(videoStr) {
    videoplayerOpen = true;
    document.getElementById("searchentrys").innerHTML = "";
    const vidArea = document.getElementById("videoArea");
    if (vidArea.style.display === "none") {

        // Eventlistener for Video Player hidde/unhidde backButton
        const buttonMainP = document.getElementById("returnToMainPage");
        const video = JSON.parse(videoStr);
        const vidOverview = document.getElementById("videooverview");
        const videoTitle = document.getElementById("videotitle");
        const videoPlayer = document.createElement("video");
        const videoSource = document.createElement("source");
        const videoId = document.createElement("div");
        const slideShow = document.getElementById("slideShow");
        const submitCommentDiv = document.getElementById("submitCommentDiv");
        const backXButton = document.createElement('span');

        //Initialize video player
        videoPlayer.setAttribute("controls", "true");
        videoPlayer.setAttribute("autoplay", "true");
        videoPlayer.setAttribute("width", "800");
        videoPlayer.setAttribute("height", "450");
        videoSource.setAttribute("type", "video/mp4");
        videoSource.setAttribute("src", video.src);
        videoId.setAttribute("id", "videoId");
        videoId.setAttribute("style", "display: none;");
        backXButton.setAttribute('id','backtovideos');
        backXButton.setAttribute('onclick', 'showOverviewHideVideoplayer()');
        backXButton.innerHTML = "&times;";
        backXButton.setAttribute('hidden', 'true');
        videoPlayer.appendChild(videoSource);
        videoPlayer.appendChild(videoId);
        vidArea.insertBefore(videoPlayer, vidArea.firstChild);
        vidArea.appendChild(backXButton);

        videoId.innerHTML = video.id;
        vidOverview.style.display = "none";
        videoTitle.innerHTML = video.name;
        vidArea.style.display = "block";
        // buttonMainP.style.display = "none";
        console.log("Auth: " + localStorage.getItem("auth"));
        if (localStorage.getItem("auth") != null) {
            submitCommentDiv.style.display = "block";
        }
        generateComments(videoId.innerHTML);
        if (slideShow.hidden === false) {
            console.log(slideShow);
            hideSlideShow();
        }
    }
}

//Shows the video-list and hides the video-player
function showOverviewHideVideoplayer() {
    document.getElementById("searchentrys").innerHTML = "";
    videoplayerOpen = false;
    const vidOverview = document.getElementById("videooverview");
    if (vidOverview.style.display === "none") {
        const vidArea = document.getElementById("videoArea");
        const createCommentArea = document.createElement("createcommentarea");
        const submitCommentDiv = document.getElementById("submitCommentDiv")
        const backXButton = document.getElementById('backtovideos');

        createCommentArea.innerHTML = "";
        if (vidArea.firstChild != null && vidArea.firstChild.nodeName==="VIDEO"){
            vidArea.removeChild(vidArea.firstChild);
        }
        vidArea.style.display = "none";
        vidOverview.style.display = "block";
        if(submitCommentDiv!=null) {
            submitCommentDiv.style.display = "none";
        }
        console.log(backXButton);
        if(backXButton!=null) {
            vidArea.removeChild(backXButton);
        }
        hideSlideShow();
    }
}

//Creates a new comment
function submitComment() {
    //Get needed elements
    const author = localStorage.getItem("auth");
    const messageInput = document.getElementById("inputMessage");
    const message = messageInput.value;
    const videoId = document.getElementById("videoId");

    //Check inputs for illegal chars
    if (!isInputLegal(messageInput.value)) {
        return;
    }
    //Create new comment
    let newComment;
    if (author === "") {
        newComment = new VideoComment("unknown", message);
    } else {
        newComment = new VideoComment(author, message);
    }
    //Save new comment in webstorage
    const currentVideoId = document.getElementById("videoId");
    const comments = loadCommentsForId(currentVideoId.innerHTML);
    if (!comments) {
        console.log("No entry for this video found");
    }
    comments.push(newComment);
    saveCommentsForId(comments, currentVideoId.innerHTML);

    //Reset form values
    messageInput.value = "";
    generateComments(videoId.innerHTML);
}

function searchVideos() {
    const vidArea= document.getElementById("videoArea");
    if (vidArea.firstChild != null && vidArea.firstChild.nodeName==="VIDEO"){
        vidArea.removeChild(vidArea.firstChild);
    }
    //showOverviewHideVideoplayer();
    document.getElementById("searchentrys").innerHTML = "";
    const slideShow = document.getElementById("slideShow");
    const search = document.getElementById("searchentry").value;
    if (!isInputLegal(search)) {
        console.log("Search Canceled! Illegal Charackters used")
        return;
    }
    if (slideShow.hidden === false) {
        hideSlideShow();
    }

    const vidOverview = document.getElementById("videooverview")
    const videoPlayer = document.getElementById("videoArea")
    if (videoPlayer.style.display === "block") {
        videoPlayer.style.display = "none";
        // if (videoPlayer.firstChild != null) {
        //     videoPlayer.removeChild(videoPlayer.firstChild);
        // }
    }
    vidOverview.style.display = "none";
    console.log(search);
    let video = new Video("", "", "", "");
    var request = createAjaxRequest();
    request.onreadystatechange = function () {
        if (4 === this.readyState && 200 === this.status) {
            const videos = JSON.parse(this.responseText);
            const searchresults = document.getElementById("searchentrys");
            for (video of videos) {
                if (checkVideoAttributes(search, video) || (video.duration.localeCompare(search) === 0)) {
                    const newAnker = createVideoAnker(video);
                    searchresults.appendChild(newAnker);
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



