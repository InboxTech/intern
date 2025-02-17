var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// Set the default location to Baroda, Gujarat, India
var barodaLat = 22.3072;
var barodaLon = 73.1812;

// Initialize the map centered at Baroda
var map = L.map('map').setView([barodaLat, barodaLon], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker for Baroda
L.marker([barodaLat, barodaLon]).addTo(map)
    .bindPopup('Vadodara, Gujarat, India')
    .openPopup();
var swiper = new Swiper('.swiper-container', {
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});