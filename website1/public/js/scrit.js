// // Initialize Swiper for the hero section
// var swiper = new Swiper(".mySwiper", {
//     loop: true, // Enables infinite loop
//     autoplay: {
//         delay: 3000, // Auto-slide every 3 seconds
//         disableOnInteraction: false, // Keep autoplay active after user interaction
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
// });

// // Smooth scrolling for navigation links
// document.querySelectorAll(".nav-link").forEach(link => {
//     link.addEventListener("click", function(event) {
//         event.preventDefault();
//         const targetId = this.getAttribute("href").substring(1);
//         const targetSection = document.getElementById(targetId);
//         if (targetSection) {
//             window.scrollTo({
//                 top: targetSection.offsetTop - 70, // Adjusted for navbar height
//                 behavior: "smooth"
//             });
//         }
//     });
// });

// // Responsive Navbar Toggle
// document.querySelector(".navbar-toggler").addEventListener("click", function() {
//     document.querySelector("#navbarNav").classList.toggle("show");
// });
// Initialize Swiper for the hero section
// var swiper = new Swiper(".mySwiper", {
//     loop: true, // Enables infinite loop
//     autoplay: {
//         delay: 3000, // Auto-slide every 3 seconds
//         disableOnInteraction: false, // Keep autoplay active after user interaction
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
// });

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjusted for navbar height
                behavior: "smooth"
            });
        }
    });
});

// Responsive Navbar Toggle
document.querySelector(".navbar-toggler").addEventListener("click", function() {
    document.querySelector("#navbarNav").classList.toggle("show");
});


document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    if (email) {
      alert(`Subscribed successfully with ${email}`);
    } else {
      alert('Please enter a valid email.');
    }
  });