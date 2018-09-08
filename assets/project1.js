var map;

function initMap() {
  var Denver = {lat: 39.742043, lng: -104.991531};
  var event1 = {lat: 39.802765, lng: -105.087486};
  var event2 = {lat: 39.710850, lng: -105.081505};
  var event3 = {lat: 39.649055, lng: -104.976425};
  map = new google.maps.Map(document.getElementById('map'), {
    center: Denver,
    zoom: 8
  });
  // var marker = new google.maps.Marker({position: Denver, map: map});
  var marker = new google.maps.Marker({position: event1, map: map});
  var marker = new google.maps.Marker({position: event2, map: map});
  var marker = new google.maps.Marker({position: event3, map: map});
}