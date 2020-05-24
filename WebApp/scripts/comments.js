"use strict";
const localStorageVideoPrefix = "video";

class Comment{
    constructor(author,message){
        const date = new Date();
        this.author = author;
        this.message = message;
        const completeTimeString = date.toTimeString();
        const time = completeTimeString.slice(0,completeTimeString.lastIndexOf(":"));
        this.date = date.toDateString() + " " +  time;
    }
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
    const createCommentArea = document.getElementById("createCommentArea");
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