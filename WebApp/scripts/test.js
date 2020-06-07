"use strict";

function startTests(){
    test_isInputLegal();
    test_userComparison();
    test_checkVideoAttributes();
}

function test_isInputLegal() {
    console.assert(false === isInputLegal(""),"Empty String is legal");
    console.assert(false === isInputLegal("<script>alert('Test');</script>"),"Empty string is legal");
    console.assert(true === isInputLegal("Hello"),"Empty string is legal");
}

function test_userComparison() {
    let user1 = new User('test', 'abc&%234',);
    let user2 = new User('Heinrich','derZweite');

    console.assert(false === userComparison(user1,user2), 'user and password are not correct.');
    console.assert(true === userComparison(user1,user1), 'user and password are correct');

}

function test_checkVideoAttributes() {
    let video1 = new Video("1", "/tests/blabla/superVideo", "Super Entertaining Video", "0:05", "Entertainment",
        "/tests/blabla/media", "youtube.de/12345");
    let video2 = new Video("2", "/tests/blabla/deleteAFD", "democracy101", "0:04", "Entertainment",
        "/tests/blabla/media", "youtube.de/6789");

    console.assert(false === checkVideoAttributes("blabla",video1), "Searchstring does not match video");
    console.assert(true === checkVideoAttributes("democracy",video2), "Searchstring matches video");

}