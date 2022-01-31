window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const indicator = document.querySelectorAll('.indicator'),
        numberTotal = document.querySelectorAll('.number__total'),
        question = document.querySelectorAll('.question');

  question.forEach((item, i) => {
    if (i > 0) {
      item.classList.add('hide');
    }
    numberTotal[i].textContent = question.length-1;
    for (let k = 0; k < i+1; k++) {
      indicator[i].innerHTML += '<li class="indicator_black"></li>';
    }
    for (let k = 0; k < question.length-i-2; k++) {
      indicator[i].innerHTML += '<li></li>';
    }
  }) 

  const ranges = document.querySelectorAll('.range');
  const arrGradient = ['#ba1417','#cd0800','#f45800','#fd9113', '#ffb800', '#d7e317', '#d1e01f', '#d1e01f', '#79E371', '#00ab23', '#00ab23'];

  ranges.forEach(range => {
    const rangeValue = range.nextElementSibling,
          sliderRange = range.parentElement.previousElementSibling,
          answerName = range.getAttribute('name'),
          answerExtendedLike = document.querySelector(`.answer-extended.${answerName}.liked`),
          checkboxLike = document.querySelectorAll(`.answer-extended.${answerName}.liked .answer-checkbox`),
          answerExtendedDisappointed = document.querySelector(`.answer-extended.${answerName}.disappointed`),
          checkboxDisappointed = document.querySelectorAll(`.answer-extended.${answerName}.disappointed .answer-checkbox`);

    range.value = 0;

    const showColorRange = () => {
      rangeValue.style.display = 'block';
      rangeValue.style.color = arrGradient[+range.value];
      sliderRange.style.background = 'linear-gradient(to right, #ba1417 0.59%, #cd0800 9.86%, #f45800 19.12%, #fd9113 27.87%, #ffb800 38.16%, #d7e317 48.45%, #d1e01f 60.8%, #eaf65e 71.61%, #00d086 81.9%, #00ab23 90.65%, #056719 99.4%)';
    }

    range.addEventListener('input', () => {
      sliderRange.style.cssText = `
        -webkit-mask: url('../img/thumb-line.svg') ${+range.value * 10}% 0/60px 26px, linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), transparent 0 calc(50% + 60px/2 - 1px), #fff 0) right ${+range.value * 10}% top 21px/calc(200% - 60px) 4px;
        -webkit-mask-repeat: no-repeat;
        mask: url('../img/thumb-line.svg') ${+range.value * 10}% 0/60px 26px, linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), transparent 0 calc(50% + 60px/2 - 1px), #fff 0) right ${+range.value * 10}% top 21px/calc(200% - 60px) 4px;
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
      if (answerName == 'answer_1') {
        question[1].classList.remove('hide');
        question[1].classList.add('show', 'fade');
      }
    });

    range.addEventListener('change', () => {
      if (answerName !== 'answer_1') {
        if (range.value > 6) {
          answerExtendedLike.classList.add('show', 'fade');
          answerExtendedDisappointed.classList.remove('show', 'fade');
          checkboxDisappointed.forEach(checkbox => {
            checkbox.checked = false;
          });
        } else {
          answerExtendedDisappointed.classList.add('show', 'fade');
          answerExtendedLike.classList.remove('show', 'fade');
          checkboxLike.forEach(checkbox => {
            checkbox.checked = false;
          });
        }
      } 
    });
  });

});
