let [card_slider, cardWidth] = [
  document.querySelector(".card-slider"),
  (document.querySelector(".card-slider-item").clientWidth + 10) * 4,
];

let isDragstart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

function cardSlider(self, isNext) {
  card_slider.scrollLeft += isNext ? cardWidth : -cardWidth;
}

card_slider.addEventListener("mousedown", dragStart);
card_slider.addEventListener("touchstart", dragStart);

card_slider.addEventListener("mousemove", dragging);
card_slider.addEventListener("touchmove", dragging);

card_slider.addEventListener("mouseup", dragStop);
card_slider.addEventListener("touchend", dragStop);

function dragging(e) {
  if (!isDragstart) return;
  e.preventDefault();
  card_slider.classList.add("dragging");
  isDragging = true;
  positionDiff = e.pageX - prevPageX;
  console.log({ prevScrollLeft, scrollLef: card_slider.scrollLeft });
  card_slider.scrollLeft = prevScrollLeft - positionDiff;
}

function dragStart(e) {
  isDragstart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = card_slider.scrollLeft;
  alert("touch");
}

function dragStop() {
  isDragstart = false;
  if (!isDragging) return;
  card_slider.classList.remove("dragging");
  isDragging = false;
  autoSlide();
}

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    card_slider.scrollLeft -
      (card_slider.scrollWidth - card_slider.clientWidth) >
      -1 ||
    card_slider.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  // getting difference value that needs to add or reduce from card_slider left to take middle img center
  let valDifference = cardWidth - positionDiff;

  if (card_slider.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (card_slider.scrollLeft +=
      positionDiff > cardWidth / 4 ? valDifference : -positionDiff);
  }
  // if user is scrolling to the left
  card_slider.scrollLeft -=
    positionDiff > cardWidth / 4 ? valDifference : -positionDiff;
};
