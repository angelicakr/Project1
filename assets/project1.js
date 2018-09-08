function() {
    $("#map").googleMap({
      zoom: 10, // Initial zoom level (optional)
      coords: [48.895651, 2.290569], // Map center (optional)
      type: "ROADMAP" // Map type (optional)
    });
  })

function() {
    $("#map").googleMap();
    $("#map").addMarker({
      coords: [48.895651, 2.290569], // GPS coords
      url: 'http://www.tiloweb.com', // Link to redirect onclick (optional)
      id: 'marker1' // Unique ID for your marker
    });
  })