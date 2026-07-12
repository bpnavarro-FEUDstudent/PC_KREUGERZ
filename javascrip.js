const container = document.querySelector(".FeaturedPC_Container");
const cards = document.querySelectorAll(".FeaturedPC_Individual_Boxes");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

const cardWidth = 320; // 300px card + 20px gap
const visibleCards = 2;
const maxIndex = cards.length - visibleCards;


function updateSlider() {

    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

}


nextBtn.addEventListener("click", () => {

    if (currentIndex < maxIndex) {
        currentIndex++;
    }

    updateSlider();

});


prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {
        currentIndex--;
    }

    updateSlider();

});