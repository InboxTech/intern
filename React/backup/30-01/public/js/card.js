const buttons = document.querySelectorAll(".btn");

// Loop through each button and add an event listener
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        alert(`clicked!`);
    });
});
    
// var swiper = new Swiper(".mySwiper", {
   
//   });
   
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      "@0.00": {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      "@0.75": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      "@1.50": {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });