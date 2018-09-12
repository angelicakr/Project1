// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwGHAx9Uz8wso0gY8znLb6nN6Xnzp0xtY",
    authDomain: "project1db-d2918.firebaseapp.com",
    databaseURL: "https://project1db-d2918.firebaseio.com",
    projectId: "project1db-d2918",
    storageBucket: "project1db-d2918.appspot.com",
    messagingSenderId: "234240171369"
  };
  firebase.initializeApp(config);

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
                img.attr("style", "width: 21em;");
                img.attr("style", "height: 15em;");
            } else {
                // Add the event image
                img.attr("src", "https:" + results[i].image.medium.url);
                img.attr("style", "width: 21em;");
                img.attr("style", "height: 15em;");
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
            p1.attr("style", "height: 6em;");
            p1.css("overflow", "auto");
            //If there's no description add "No description"
            if (results[i].description == null) {
                p1.text("No description available");
            } else {
                // Add the event description
                p1.text(results[i].description);
            }
            body.append(p1);

            //Add event time and date
            var p2 = $("<p>");
            p2.attr("class", "card-text");
            var small = $("<small>");
            small.attr("text-muted");
            var split1 = results[i].start_time.split(" ");
            // console.log("Time: " + split1[1]); //Time
            var split2 = split1[1].split(":");
            var split3 = split1[0].split("-");
            var date = split3[1] + "/" + split3[2] + "/" + split3[0];
            var time = split2[0] + ":" + split2[1];
            small.text("Date: " + date)
            if (time == "00:00") {
                small.append("");
            } else {
            small.append(" | Time: " + time);
            }
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
            var a1 = $("<button>");
            var like = ("<img src='assets/Images/accept-circular-button-outline.svg' style='height:65px; width:65px' alt='Like'>");
            a1.append(like);
            div1.append(a1);
            row.append(div1);
            //Add dislike button
            var div2 = $("<div>");
            div2.attr("class", "mx-auto cancel");
            var a2 = $("<button>");
            var dislike = ("<img src='assets/Images/cancel.svg' style='height:70px; width:70px' alt='Dislike'>");
            a2.append(dislike);
            div2.append(a2);
            row.append(div2);
            //Add completed card to the DOM
            $(".deck").append(cardDiv);
        }


        function markers() {
            var event1 = {
                lat: Number(results[0].latitude),
                lng: Number(results[0].longitude)
            };
            var event2 = {
                lat: Number(results[1].latitude),
                lng: Number(results[1].longitude)
            };
            var event3 = {
                lat: Number(results[2].latitude),
                lng: Number(results[2].longitude)
            };

            console.log(event1);
            console.log(event2);
            console.log(event3);
            var marker = new google.maps.Marker({
                position: event1,
                map: map
            });
            var marker = new google.maps.Marker({
                position: event2,
                map: map
            });
            var marker = new google.maps.Marker({
                position: event3,
                map: map
            });
        }

        markers();

        $(document).on("click", ".accept", function () {
            console.log("hello");
            database.ref().push({
                results: results[i].title,
                description: results[i].description,
                time: results[i].start_time,
            });
            cardDiv.remove();
        });
        
        $(document).on("click", ".cancel", function () {
            cardDiv.remove();
        });

    });


    inputClear();
}


// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
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

// Geocode Location
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

    // $(".like-btn").css("color", "black");


    //Logic to house like and dislike
    // var like_btn = "#like-btn" + i
    //if Like button selected
    $(document).on("click", ".like-btn", function () {
        //change image to check or something
        // event.id //<--need to move image based on id
        //increment Likes count by 1
        // likesCount++;
        console.log("hello");
        //Create Firebase event for adding likes data to the database
        // database.ref().push({

        // });

        // database.ref().on("child_added", function (childSnapshot) {
        //     console.log(childSnapshot.val());

        //     // Store everything into a variable.
        //     var srch_loc = childSnapshot.val().location;
        //     var srch_type = childSnapshot.val().type;

        //     // search Info
        //     console.log(srch_loc);
        //     console.log(srch_type);
        // });
    });

    //if dislike button is selected
    $(document).on("click", ".dislike-btn", function () {
        //change image to X or something
        //move array's info to firebase
    });

    // Logic for Likes page

    // If Likes button is pressed
    // hide search boxes
    // execute display_likes function  <-- this will display all events from likes DB.

    // code for identifying users logged in
    // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
   

    // '.info/connected' is a special location provided by Firebase that is updated every time
    // the client's connection state changes.
    // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
    // var connectedRef = database.ref(".info/connected");

    // // When the client's connection state changes...
    // connectedRef.on("value", function (snap) {

    //     // If they are connected..
    //     if (snap.val()) {

    //         // Add user to the connections list.
    //         var con = connectionsRef.push(true);

    //         // Remove user from the connection list when they disconnect.
    //         con.onDisconnect().remove();
    //     }
    };
