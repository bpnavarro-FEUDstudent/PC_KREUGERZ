const container = document.querySelector(".FeaturedPC_Container");
const cards = document.querySelectorAll(".FeaturedPC_Individual_Boxes");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 2;
}

function updateSlider() {
    const cardWidth =
        cards[0].getBoundingClientRect().width + 20;

    container.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
    const maxIndex =
        cards.length - getVisibleCards();

    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

window.addEventListener("resize", () => {
    currentIndex = Math.min(
        currentIndex,
        cards.length - getVisibleCards()
    );

    updateSlider();
});