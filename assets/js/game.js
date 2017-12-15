var charactersObject = {
        obi: {
          namePlayer: "Obi Wan Kenobi",
          imgSource: "assets/images/obi.jpg",
          nameId: "obi",
          health: 100,
          attackPower: 8,
          attackPowerFactor: 8,
          counterAttack: 25,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: function( event ){
            selectChar($(this));
        },
        },
        bob: {
          namePlayer: "Boba Fett",
          imgSource: "assets/images/boba.jpg",
          nameId: "bob",
          health: 120,
          attackPower: 7,
          attackPowerFactor: 7,
          counterAttack: 25,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: function( event ){
            selectChar($(this));
        },
        },
        dar: {
          namePlayer: "Darth Vader",
          imgSource: "assets/images/dv.jpg",
          nameId: "dar",
          health: 180,
          attackPower: 5,
          attackPowerFactor: 5,
          counterAttack: 25,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: function( event ){
            selectChar($(this));
        },
        },
        sit: {
          namePlayer: "Lord Sith",
          imgSource: "assets/images/sith.jpg",
          nameId: "sit",
          health: 100,
          attackPower: 8,
          attackPowerFactor: 8,
          counterAttack: 25,
          isDefender: false,
          isEnemy: false,
          isHero: false,
          clickEvent: function( event ){
            selectChar($(this));
        },
        }
    };

// This function initiates the game to a start state 
function gameStart() {
    //Loop through charachters object
    for (var key in charactersObject) {
        //Check for null
        if (!charactersObject.hasOwnProperty(key)) continue;
        //Create the variables to be used
        var obj = charactersObject[key];
        var character = charactersObject[key].nameId;
        var charImgSource = charactersObject[key].imgSource;
        var divId = (charactersObject[key].nameId + 'Div')
        var divElement = $('<div>');
        var charElement = $('<img>');
        //Create character
        //Set the character div id to characters Id plus floor
        //append the character div
        divElement.attr('class', 'character');
        divElement.attr('id', divId);
        $('#yourCharOptions').append(divElement);
        //Create the img tag 
        //set the id to character id
        //Set the src to image source location
        //Bind the click event using the namespace myEvent
        //append the img tag        
        charElement.attr('class', 'yourChar');
        charElement.attr('id', charactersObject[key].nameId);
        charElement.attr('alt', charactersObject[key].namePlayer);
        charElement.attr('src', charactersObject[key].imgSource);
        charElement.bind('click.myEvent', charactersObject[key].clickEvent);
        $('#' + divId).append(charElement);
        //Create a span with the health points for the character
        //Set the class to gameText
        //Append the span to it's corresponding div element
        var healthPoints = $('<span>');
        healthPoints.attr('class', 'gameText');
        healthPoints.text(charactersObject[key].health);
        $('#' + divId).append(healthPoints);
    }
}

//The purpose of this function is to respond to user's click on a character image
function selectChar(element) {

    var imgId = ('#' + element["0"].id);
    var imgElement = $(imgId);
    var divElementId = (imgId + 'Div');
    $(imgElement).unbind();
    imgElement.prependTo('#' + element["0"].id + 'Div');
    $(divElementId).appendTo('#yourChar');
    for (var key in charactersObject) {
        //Check for null
        if (!charactersObject.hasOwnProperty(key)) continue;
        if (element["0"].id !== charactersObject[key].nameId) {
            var characterName = charactersObject[key].namePlayer;
        $('#yourCharLabel h3').html('Good Luck You Selected ' + characterName);
        $('#yourCharLabel').show();
        var test = $('#' + charactersObject[key].id + 'Div');
        var test2 = ('#' + charactersObject[key].id + 'Div');
        console.log(test);
        console.log(test2);
        console.log($('#' + charactersObject[key].id + 'Div'));
        var divElement = $('#' + charactersObject[key].nameId + 'Div');
        var childElement = divElement.children('img')[0];
        $(childElement).unbind();
        $(childElement).prependTo(divElement);
        $(childElement).bind('click', function( event ) {
            selectDefender($(this));
        });
        $(childElement).prependTo(divElement);
        $(divElement).appendTo('#enemies');
        $('#yourCharOptionsLabel h3').hide();
        $('#enemiesLabel h3').html('Select Your First Opponent To Fight');
        $('#enemiesLabel h3').show();    
        }
            
    }
}

//The purpose of this function is respond to user's click of the image when selecting an enmeny
function selectDefender(element) {
    //Capture the image selected and move the entire character to the #fightSelection div
    var imgId = '#' + element["0"].id;
    var imgElement = $(imgId);
    divElement = $(imgId + 'Div');
    console.log(imgElement);
    $(divElement).appendTo('#fightSelection');
    $('#fightSelection img').each(function () {
        $(this).unbind();
        //$('#fightSelection').append(this);
        $(this).prependTo(divElement);
    });
    //Iterate through the remaining characters 
    //Remove and bound events and re-append to the #enemies div
    $('#enemies img').each(function () {
        $(this).unbind();
        $(this).prependTo('#' + this.id + 'Div');
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
  $('#yourChar img').each(function () {
    var yourChar = this.id;
    var attackPower = charactersObject[yourChar].attackPower;
    var attackPowerFactor = charactersObject[yourChar].attackPowerFactor;
    $('#fightSelection img').each(function () {
      var defender = this.id;
      var healthPoints = charactersObject[defender].health;
      charactersObject[defender].health -= attackPower;
      charactersObject[yourChar].attackPower += attackPowerFactor;
      $('#fightSelection span').text(charactersObject[defender].health);
      if (checkHealth(defender) == true) {
        $('#attackButton').unbind();
        $('#attackButton').val('Game Over')
        $('#attackButton').appendTo('#attackButtonContainer');
      }
      //checkHealth(defender);
      defenderAttack(yourChar, defender);
    });
  });    
}

function checkHealth(character) {
  if (charactersObject[character].health <= 0) {
    return true;
  }

}

function defenderAttack(yourChar, defender) {
  charactersObject[yourChar].health -= charactersObject[defender].counterAttack;
  $('#yourChar span').text(charactersObject[yourChar].health);
  if (checkHealth(yourChar) == true) {
    console.log('loss');
    $('#attackButton').unbind();
    $('#attackButton').val('Game Over')
    $('#attackButton').bind('click', function( event ){
        gameStart();
    });
    $('#attackButton').appendTo('#attackButtonContainer');
  }
}