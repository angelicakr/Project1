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
    $("#address").val('');
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

        $(".deck").empty();

        for (var i = 0; i < 3; i++) {

            // Create card
            var cardDiv = $("<div>");
            cardDiv.attr("class", "card m-3");
            cardDiv.css("width", "21em");
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
            $(".deck").append(cardDiv);
        }

        // var event1lat = results[0].latitude;
        // var event1lng = results[0].longitude;

        // var event2lat = results[1].latitude;
        // var event2lng = results[1].longitude;

        // var event3lat = results[2].latitude;
        // var event3lng = results[2].longitude;

        // var event1 = {
        //     lat: event1lat,
        //     lng: event1lng
        // };
        // var event2 = {
        //     lat: event2lat,
        //     lng: event2lng
        // };
        // var event3 = {
        //     lat: event3lat,
        //     lng: event3lng
        // };

        // var event1 = {
        //     lat: 39.802765,
        //     lng: -105.087486
        // };
        // var event2 = {
        //     lat: 39.710850,
        //     lng: -105.081505
        // };
        // var event3 = {
        //     lat: 39.649055,
        //     lng: -104.976425
        // };
        // var marker = new google.maps.Marker({
        //     position: {lat: 39.802765, lng: -105.087486},
        //     map: map
        // });
        // var marker = new google.maps.Marker({
        //     position: event2,
        //     map: map
        // });
        // var marker = new google.maps.Marker({
        //     position: event3,
        //     map: map
        // });
        var marker = new google.maps.Marker({
            position: {lat: 39.802765, lng: -105.087486},
        });

        marker.setMap(map);
    });


    inputClear();
}


//global variable for keeping track of apiLoop iteration
var loop = 0;

$(document).on("click", "#submit", function (event) {
    event.preventDefault();

    //reset loop
    loop = 0;

    var search = $("#event").val().trim();
    var location = $("#address").val().trim();

    //Call the AJAX function when submit button is pushed
    ajaxCall(search, location);
    console.log("Event: " + search + "\n" + "Location: " + location);
});

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




// var event1lat;
// var event1lng;

// var event2lat;
// var event2lng;

// var event3lat;
// var event3lng;

// var event1;
// var event2;
// var event3;

var markerArray = [];

// var map;

// Initialize Google Map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {
            lat: 39.742043,
            lng: -104.991531
        }
    });


    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //   map: resultsMap,
            //   position: results[0].geometry.location
            // });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}