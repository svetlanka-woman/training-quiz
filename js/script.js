window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const ranges = document.querySelectorAll('.range');

  ranges.forEach(range => {
    range.addEventListener('input', (e) => {
      const rangeValue = e.target.nextElementSibling,
            sliderRange = e.target.parentElement.previousElementSibling;
      // sliderRange.style.mask = 'url('../img/thumb-line-1.svg') 20% 0/60px 24px, linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), transparent 0 calc(50% + 60px/2 - 1px), #fff 0) right 0% top 20px/calc(200% - 60px) 4px';
      sliderRange.style.cssText = `-webkit-mask: url('../img/thumb-line-1.svg') ${+e.target.value * 10}% 0/60px 24px, linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), transparent 0 calc(50% + 60px/2 - 1px), #fff 0) right ${+e.target.value * 10}% top 20px/calc(200% - 60px) 4px;
      -webkit-mask-repeat: no-repeat;`;
      sliderRange.style.maskPosition = (+e.target.value + 1) * 8.1 + '% + 0';
      rangeValue.style.left = (+e.target.value + 1) * 8.1 + '%';
      rangeValue.textContent = e.target.value;
      console.log(e.target.parentElement.previousElementSibling);
    });
  });

// const input = document.querySelector('input');
// const log = document.getElementById('rangeValue');

// input.addEventListener('input', updateValue);

// function updateValue(e) {
//   log.textContent = e.target.value;
// }

//   console.log('5');

  // oninput="document.getElementById('rangeValue').innerHTML = this.value;
});
