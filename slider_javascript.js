
const container = document.querySelector(".FeaturedPC_Container");
const cards = document.querySelectorAll(".FeaturedPC_Individual_Boxes");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function getVisibleCards(){
    return window.innerWidth <= 768 ? 1 : 2;
}

function setActiveDot(index){
    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[index]) {
        dots[index].classList.add("active");
    }
}

function updateSlider(){
    const cardWidth =
        cards[0].getBoundingClientRect().width + 20;

    container.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

    setActiveDot(currentIndex);
}

nextBtn.addEventListener("click", () => {
    const maxIndex =
        cards.length - getVisibleCards();

    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    updateSlider();
});

prevBtn.addEventListener("click", () => {
    const maxIndex =
        cards.length - getVisibleCards();

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }

    updateSlider();
});

window.addEventListener("resize", () => {
    const maxIndex =
        cards.length - getVisibleCards();

    currentIndex = Math.min(currentIndex, maxIndex);

    updateSlider();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });
});

updateSlider();
