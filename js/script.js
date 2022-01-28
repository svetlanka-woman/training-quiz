window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const ranges = document.querySelectorAll('.range');
  const arrGradient = ['#ba1417','#cd0800','#f45800','#fd9113', '#ffb800', '#d7e317', '#d1e01f', '#d1e01f', '#79E371', '#00ab23', '#00ab23'];

  ranges.forEach(range => {
    const rangeValue = range.nextElementSibling,
          sliderRange = range.parentElement.previousElementSibling;

    const showColorRange = () => {
      rangeValue.style.display = 'block';
      rangeValue.style.color = arrGradient[+range.value];
      sliderRange.style.background = 'linear-gradient(to right, #ba1417 0.59%, #cd0800 9.86%, #f45800 19.12%, #fd9113 27.87%, #ffb800 38.16%, #d7e317 48.45%, #d1e01f 60.8%, #eaf65e 71.61%, #00d086 81.9%, #00ab23 90.65%, #056719 99.4%)';
    }

    range.addEventListener('input', () => {
      sliderRange.style.cssText = `
        -webkit-mask: url('../img/thumb-line.svg') ${+range.value * 10}% 0/60px 26px, linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), transparent 0 calc(50% + 60px/2 - 1px), #fff 0) right ${+range.value * 10}% top 21px/calc(200% - 60px) 4px;
        -webkit-mask-repeat: no-repeat;
        mask: url('../img/thumb-line.svg') 0% 0/60px 26px, linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), transparent 0 calc(50% + 60px/2 - 1px), #fff 0) right 0% top 21px/calc(200% - 60px) 4px;
        mask-repeat: no-repeat;
        `;
      if (range.value == 0 && rangeValue.textContent == 1) {
        rangeValue.style.left = '7.5%';
      } else {
        rangeValue.style.left = (+range.value + 1) * 8.1 + '%';
      }
      showColorRange();
      rangeValue.textContent = range.value;
    });

    range.addEventListener('click', () => {
      showColorRange();
    });

    range.addEventListener('change', () => {
      if (range.value < 7) {
console.log(range.getAttribute('name'));
      }
    })
  });



});
