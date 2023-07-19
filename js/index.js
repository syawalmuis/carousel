let [slider, cardWidth] = [
  document.querySelector(".card-slider"),
  document.querySelector(".card-slider-item").clientWidth + 4,
];

let isDragstart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff,
  parentSlider = slider.parentElement,
  currentArrow,
  scrollSliderWitdh = slider.scrollWidth - slider.clientWidth,
  cardItemLength = Math.ceil(slider.clientWidth / cardWidth),
  isPrev;

cardWidth *= cardItemLength;

function cardSlider(isNext, n) {
  let toSlide = cardWidth * (n !== undefined ? n : 1);
  slider.scrollLeft += isNext ? toSlide : -toSlide;
  isPrev = !isNext;
  setTimeout(showHideIcon, 200);
}

function showHideIcon() {
  parentSlider.children[1].style.display =
    slider.scrollLeft - cardWidth <= 0 ? "none" : "flex";
  parentSlider.children[2].style.display =
    slider.scrollLeft + cardWidth >= scrollSliderWitdh ? "none" : "flex";
  isPrev
    ? (parentSlider.children[2].style.display = "flex")
    : (parentSlider.children[1].style.display = "flex");
  // isPrev;
  console.log({ isPrev });
}

function dragging(e) {
  if (!isDragstart) return;
  e.preventDefault();
  slider.classList.add("dragging");
  isDragging = true;
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  slider.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcon();
}

function dragStart(e) {
  isDragstart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = slider.scrollLeft;
}

function dragStop() {
  isDragstart = false;
  if (!isDragging) return;
  slider.classList.remove("dragging");
  isDragging = false;
  autoSlide();
  showHideIcon();
}

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 ||
    slider.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  // getting difference value that needs to add or reduce from slider left to take middle img center
  let valDifference = cardWidth - positionDiff;

  // console.log(positionDiff);
  if (slider.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the rightS
    isPrev = positionDiff > cardWidth / 3 ? false : true;
    return (slider.scrollLeft +=
      positionDiff > cardWidth / 3 ? valDifference : -positionDiff);
  }

  // if user is scrolling to the left
  isPrev = positionDiff > cardWidth / 3 ? true : false;
  slider.scrollLeft -=
    positionDiff > cardWidth / 3 ? valDifference : -positionDiff;
};

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

slider.addEventListener("mouseup", dragStop);
slider.addEventListener("touchend", dragStop);
