var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    keyboard: {
      enabled: true,
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
  // Existing swiper initialization (for reference)
var existingSwiper = new Swiper('.existing-swiper-container', {
  // Your existing swiper options
});

// Testimonial swiper initialization
var testimonialSwiper = new Swiper('.testimonial-swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Add more configuration options as needed
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