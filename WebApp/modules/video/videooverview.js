"use strict";

import {createAjaxRequest} from "./videoplayer";

function loadVideos(){
    var request = createAjaxRequest();
    request.onreadystatechange = function(){
        if(4 == this.readyState && 200 == this.status){
            var videos = JSON.parse(this.responseText);
            var videoOverview = document.getElementById("videooverview");

            for(video of videos){
                var header5 = document.createElement("h5");
                var header7 = document.createElement("h7");
                var ahref = document.createElement("a");
                ahref.href = "javascript:showVideoPlayerHideOverview(" + "'" + JSON.stringify(video)+ "'" + ")";
                console.log("href: " + ahref.href);
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

export {loadVideos};

