// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyBwGHAx9Uz8wso0gY8znLb6nN6Xnzp0xtY",
//     authDomain: "project1db-d2918.firebaseapp.com",
//     databaseURL: "https://project1db-d2918.firebaseio.com",
//     projectId: "project1db-d2918",
//     storageBucket: "project1db-d2918.appspot.com",
//     messagingSenderId: "234240171369"
// };
// firebase.initializeApp(config);
// var database = firebase.database();

// Empty input fields
function inputClear() {
    $("#location").val('');
    $("#event").val('');
};

//Function to make ajax call
function ajaxCall(search, location) {

    //AJAX search URL
    var queryURL = "https://api.eventful.com/json/events/search?";

    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        dataType: "jsonp",
        success: function (jsondata) {},
        data: {
            app_key: "8XVzBF2N2f5JHP8h",
            location: location,
            q: search,
        }
    }).then(function (response) {

        var results = response.events.event;
        console.log(results);

        $(".card-deck").empty();

        for (var i = 0; i < 3; i++) {

            // Create card
            var cardDiv = $("<div>");
            cardDiv.attr("class", "card");
            //Add link to card
            var link = $("<a>");
            link.attr("href", results[i].url);
            link.attr("target", "_blank");
            cardDiv.append(link);

            //Add image
            var img = $("<img>");
            //If there's no image add no_image.png
            if (results[i].image == null) {
                img.attr("src", "assets/images/no_image.png");
                img.attr("style", "width: 100%;");
            } else {
                // Add the event image
                img.attr("src", "https:" + results[i].image.medium.url);
                img.attr("style", "width: 100%;");
            }
            link.append(img);

            //Add card body
            var body = $("<div>");
            body.attr("class", "card-body");
            cardDiv.append(body);

            //Add event title
            var title = $("<h5>");
            title.attr("class", "card-title");
            title.text(results[i].title);
            body.append(title);

            //Add description
            var p1 = $("<p>");
            p1.attr("class", "card-text");
            p1.attr("style", "height: auto;");
            //If there's no description add "No description"
            if (results[i].description == null) {
                p1.text("No description available");
            } else {
                // Add the event description
                p1.text(results[i].description);
            }
            body.append(p1);

            //Add distance to event
            var p2 = $("<p>");
            p2.attr("class", "card-text");
            var small = $("<small>");
            small.attr("text-muted");
            //Add distance to event here
            small.text("Event is " + "#" + " miles away");
            p2.append(small);
            body.append(p2);

            //Like/dislike buttons
            //Add row
            var row = $("<div>");
            row.attr("class", "row");
            body.append(row);
            //Add like button
            var div1 = $("<div>");
            div1.attr("class", "mx-auto accept");
            var a1 = $("<a>");
            var like = ("<img src='assets/Images/accept-circular-button-outline.svg' style='height:75px; width:75px' alt='Like'>");
            a1.append(like);
            div1.append(a1);
            row.append(div1);
            //Add dislike button
            var div2 = $("<div>");
            div2.attr("class", "mx-auto cancel");
            var a2 = $("<a>");
            var dislike = ("<img src='assets/Images/cancel.svg' style='height:75px; width:75px' alt='Dislike'>");
            a1.append(dislike);
            div2.append(a2);
            row.append(div2);

            //Add completed card to the DOM
            $(".card-deck").append(cardDiv);
        }
    });

    inputClear();
}

$(document).on("click", "#submit", function (event) {
    event.preventDefault();

    //reset loop
    loop = 0;

    var search = $("#event").val().trim();
    var location = $("#location").val().trim();

    //Call the AJAX function when subject button is pushed
    ajaxCall(search, location);
    console.log("Event: " + search + "\n" + "Location: " + location);

});

//global variable for keeping track of apiLoop iteration
var loop = 0;

// create function to loop through next three results from Eventful
function nextBtn() {
    loop += 3; //<-- add if statement
    if (loop == 3) {
        for (var i = loop; i < (loop + 2); i++) {
            //Display first three results from Eventful search
            //send Lat and long through GoogleMaps API
            //display map
        };
        loop += 3;
        //enable or show previous button
    } else if (loop == 6) {
        for (var i = loop; i < (loop + 2); i++) {
            //Display first three results from Eventful search
            //send Lat and long through GoogleMaps API
            //display map
        }
        //disable or hide Next button
    };
    //previous button
    function previousBtn() {
        loop -= 3;
        if (loop = 6) {
            for (var i = loop; i > (loop - 2); i--) {
                //Display first three results from Eventful search
                //send Lat and long through GoogleMaps API
                //display map
            }
            loop -= 3;
            //enable or show next button
        } else if (loop = 3) {
            for (var i = loop; i < (loop + 2); i++) {
                //Display first three results from Eventful search
                //send Lat and long through GoogleMaps API
                //display map
            };
            loop -= 3;
        }
        //disable or hide Previous button
    };



    //GoogleMaps with location
    function googleMaps(latitude, longitude) {

    }


    //Logic to house like and dislike
    var like_btn = "#like-btn" + i
    //if Like button selected
    $(document).on("click", like_btn, function (event) {
        //change image to check or something
        event.id //<--need to move image based on id
        //increment Likes count by 1
        likesCount++;
        //Create Firebase event for adding likes data to the database
        database.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val());

            // Store everything into a variable.
            var srch_loc = childSnapshot.val().location;
            var srch_type = childSnapshot.val().type;

            // search Info
            console.log(srch_loc);
            console.log(srch_type);
        });
    });

    //if dislike button is selected
    $(document).on("click", "#dislike-btn", function () {
        //change image to X or something
        //move array's info to firebase
    });

    //Logic for Likes page

    //If Likes button is pressed
    //hide search boxes
    //execute display_likes function  <-- this will display all events from likes DB.

    //code for identifying users logged in
    // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    var connectionsRef = database.ref("/connections"); //<--need to change this to likes

    // '.info/connected' is a special location provided by Firebase that is updated every time
    // the client's connection state changes.
    // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
    var connectedRef = database.ref(".info/connected");

    // When the client's connection state changes...
    connectedRef.on("value", function (snap) {

        // If they are connected..
        if (snap.val()) {

            // Add user to the connections list.
            var con = connectionsRef.push(true);

            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });
};