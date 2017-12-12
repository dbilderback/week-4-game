var charactersObject = {
        obi: {
          nameplayer: "Obi Wan Kenobi",
          imgSource: "assets/images/obi.jpg",
          nameid: "obi",
          health: 100,
          attackPower: 10,
          attackPowerFactor: 20,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: false,
        },
        bob: {
          nameplayer: "Boba Fett",
          imgSource: "assets/images/boba.jpg",
          nameid: "bob",
          health: 100,
          attackPower: 10,
          attackPowerFactor: 20,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: false,
        },
        dar: {
          nameplayer: "Darth Vader",
          imgSource: "assets/images/dv.jpg",
          nameid: "dar",
          health: 100,
          attackPower: 10,
          attackPowerFactor: 20,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: false,
        },
        sit: {
          nameplayer: "Lord Sith",
          imgSource: "assets/images/sith.jpg",
          nameid: "sit",
          health: 100,
          attackPower: 10,
          attackPowerFactor: 20,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: false,
        }
    };

// This function initiates the game to a start state 
function gameStart() {
    

    var characters = [
        { "Obi Wan Kenobi":"assets/images/obi.jpg" },
        { "Boba Fett":"assets/images/boba.jpg" },
        { "Darth Vader":"assets/images/dv.jpg" },
        { "Lord Sith":"assets/images/sith.jpg" }
    ];

console.log(charactersObject.bob.isDefender);



    //Loop the the character arrary based on it's length
    for (var i = 0; i < characters.length; i++) {
        //Load Characters from the array into an individual div element
        //Set the div id to the 1st three letters of the character's name
        //Append the div to #yourCharOptions  div
        for (var characterId in characters[i]) {
            var character = characters[i][characterId];
            var divId = (characterId.substring(0, 3) + 'Div')
            var divElement = $('<div>');
            divElement.attr('class', 'character');
            divElement.attr('id', divId);
            $('#yourCharOptions').append(divElement);
            //Create an image element for each character
            //Set the img id to 1st three letters of the characters name
            //Set the src to image location on the server
            //Attach an event to img that calls the function selectChar()
            //Append the img to it's corresponding div element
            var charElement = $('<img>');
            charElement.attr('class', 'yourChar');
            charElement.attr('id', characterId.substring(0, 3));
            charElement.attr('alt', characterId);
            charElement.attr('src', character);
            charElement.bind('click.myEvent', function( event ){
                selectChar($(this));
            });
            $('#' + divId).append(charElement);
            //Create a span with the health points for the character
            //Set the class to gameText
            //Append the span to it's corresponding div element
            var healthPoints = $('<span>');
            healthPoints.attr('class', 'gameText');
            healthPoints.html('100');
            $('#' + characterId.substring(0, 3)).append(healthPoints);
        }
    }
}

//The purpose of this function is to respond to user's click on a character image
function selectChar(element) {
    //Capture then remove any events from image selected
    //Append the image slected to the #yourChar div
    //Set the labels for the character
    var imgId = '#' + element["0"].id;
    var imgElement = $(imgId);
    $(imgElement).unbind();
    $(imgElement).appendTo('#yourChar');
    var characterName = element[0].alt;
    $('#yourCharLabel h3').html('Good Luck You Selected ' + characterName);
    $('#yourCharLabel').show();
    //Iterate through the remaining div element inside the #yourCharOptions div
    $('#yourCharOptions div').each(function () {
        //Remove any bound events from the image
        //Bind new function selectDefender()
        //Append new image to #yourCharOptions
        //Append new div to #enemies div
        var divElement = $('#' + $(this).attr('id'));
        console.log(divElement);
        console.log(divElement.children('img')[0]);
        childElement = divElement.children('img')[0];
        $(childElement).unbind();
        $(childElement).prependTo(divElement)
        $(childElement).bind('click', function( event ){
                selectDefender($(this));
            });
        $(childElement).prependTo(divElement)
        $(divElement).appendTo('#enemies');
    });
    $('#yourCharOptionsLabel h3').hide();
    $('#enemiesLabel h3').html('Select Your First Opponent To Fight');
    $('#enemiesLabel h3').show();
}

//The purpose of this function is respond to user's click of the image when selecting an enmeny
function selectDefender(element) {
console.log(charactersObject.bob.isDefender);
charactersObject.bob.attackPower = 10000;
console.log(charactersObject.bob.attackPower);
    //Capture the image selected and move the entire character to the #fightSelection div
    var imgId = '#' + element["0"].id;
    var imgElement = $(imgId);
    //var divElement = $()
    console.log(imgElement);
    $(imgElement).appendTo('#fightSelection');
    //$('#fightSelectionLabel').html('You Must Attack The Defender Until The FIrst Character Has Zero Health Points')
    //Iterate through the remaining characters 
    //Remove and bound events and re-append to the #enemies div
    $('#enemies img').each(function () {
        $(this).unbind();
        $('#enemies').append(this);
    });
    $('#enemiesLabel').html('Enemies Left To Fight');
    $('#attackButton').bind('click', function( event ){
        attackDefender();
    });
    $('#attackButton').appendTo('#attackButtonContainer');
    $('#attackButton').show();
    $('#defenderLabel h3').html('Defender')
}

//The purpose of this function is to respond to user's click of the Attack button
function attackDefender() {
    console.log(charactersObject.bob.attackPower);
}

