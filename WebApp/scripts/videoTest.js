"use strict";

function startVideoTests(){
    test_isInputLegal();
}

function test_isInputLegal() {
    console.assert(false === isInputLegal(""),"Empty String is legal");
    console.assert(false === isInputLegal("<script>alert('Test');</script>"),"Empty string is legal");
    console.assert(true === isInputLegal("Hello"),"Empty string is legal");
}