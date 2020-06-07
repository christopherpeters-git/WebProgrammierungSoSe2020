"use strict";

function startTests(){
    test_isInputLegal();
    test_userComparison
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