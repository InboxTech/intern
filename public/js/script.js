let map;

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 22.5726, lng: 88.3639 }, // Example: Kolkata, India
        zoom: 12,
    });

    // Add a marker
    new google.maps.Marker({
        position: { lat: 22.5726, lng: 88.3639 },
        map,
        title: "Kolkata, India",
    });

    // Fix map resizing issues
    window.addEventListener("resize", () => {
        google.maps.event.trigger(map, "resize");
    });
}


