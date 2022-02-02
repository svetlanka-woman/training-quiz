window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const indicator = document.querySelectorAll('.indicator'),
        numberQuestion = document.querySelectorAll('.number'),
        question = document.querySelectorAll('.question');

  function renderQuestionHeader(i) {
    numberQuestion[i].innerHTML = `<span class="number__current">${i+1}</span>
                                    /
                                  <span class="number__total">${question.length-1}</span>`;
    for (let k = 0; k < i+1; k++) {
      indicator[i].innerHTML += '<li class="indicator_black"></li>';
    }
    for (let k = 0; k < question.length-i-2; k++) {
      indicator[i].innerHTML += '<li></li>';
    }
  }

  question.forEach((item, q) => {
    if (q > 0 && q < 4) {
      item.classList.add('hide');
    }
    renderQuestionHeader(q);
  });

  const answerExtended = [
    {
      num: 1
    },
    {
      num: 2, 
      src: ['resume.svg', 'files.svg', 'clock.svg', 'bad-review.svg', 'help.svg'],
      alt: ['Заявка', 'Документы', 'Время', 'Получение продукта', 'Помощь'], 
      pDisap: [
        'Неудобная подача заявки', 
        'Большое кол-во требуемых документов/ объём анкеты', 
        'Долгое оформление', 
        'Неудобное получение продукта', 
        'Нежелание сотрудника помочь'
      ],
      pLike: [
        'Удобство подачи заявки',
        'Не требуется много документов', 
        'Быстрое оформления',
        'Удобоное получение продукта',
        'Желание сотрудника помочь'
      ]
    },
    {
      num: 3, 
      src: ['find.svg', 'speak.svg', 'zoom.svg'],
      alt: ['Поиск', 'Фразы', 'Скрытый'], 
      pDisap: [
        'Сложно найти информацию', 
        'Непонятные формулировки', 
        'Есть скрытые условия'
      ],
      pLike: [
        'Просто найти информацию',
        'Понятные формулировки', 
        'Нет скрытых условий'
      ]
    },
    {
      num: 4, 
      src: ['customer-service.svg', 'information.svg', 'information2.svg', 'exchange.svg', 'profile.svg', 'settings.svg'],
      alt: ['Информация', 'Информация', 'Информация', 'Информация', 'Информация', 'Информация'], 
      pDisap: [
        'Мало информации об условиях обслуживания', 
        'Мало информации по Priority Pass', 
        'Мало информации по программе #МожноВсё', 
        'Мало информации о курсах обмена', 
        'Мало информации о персональном менеджере',
        'Мало информации о Консьерж-сервисе'
      ],
      pLike: [
        'Подробная информация об условиях обслуживания',
        'Исчерпывающая информация по Priority Pass', 
        'Детальная информация по программе #МожноВсё',
        'Подробная информация о курсах обмена',
        'Подробная информация о персональном менеджере', 
        'Подробная информация о Консьерж-сервисе'
      ]
    }
  ];

  const questionBody = document.querySelectorAll('.question__body');
  
  function renderAnswerExtended() {
    questionBody.forEach((item, q) => {
      if (q > 0 && q < questionBody.length - 2) {
        let liDisap = '', 
            liLike = '';

        for (let i = 0; i <= answerExtended[q].src.length-1; i++) {
          const {num, src, alt, pDisap, pLike} = answerExtended[q];
          let number = `${num}-${i+1}`;
          liDisap += `<li>
                        <input type="checkbox" class="answer-checkbox" name="answer_${number}_disap" id="answer_${number}_disap" />
                        <label for="answer_${number}_disap">
                          <img class="img-colors" src="img/answer_${num}/${src[i]}" alt="${alt[i]}" />
                          <img class="img-white" src="img/answer_${num}/active/${src[i]}" alt="${alt[i]}" />
                          <p>${pDisap[i]}</p>
                        </label>
                      </li>`;
          liLike += `<li>
                        <input type="checkbox" class="answer-checkbox" name="answer_${number}_like" id="answer_${number}_like" />
                        <label for="answer_${number}_like">
                          <img class="img-colors" src="img/answer_${num}/${src[i]}" alt="${alt[i]}" />
                          <img class="img-white" src="img/answer_${num}/active/${src[i]}" alt="${alt[i]}" />
                          <p>${pLike[i]}</p>
                        </label>
                      </li>`;
        }

        const answerExtendedDisap = document.createElement('div');
        answerExtendedDisap.classList.add('answer-extended', `answer_${q + 1}`, 'disappointed');
        answerExtendedDisap.innerHTML = `
          <p class="answer-extended__question">Что Вас разочаровало?</p>
          <ul class="answer-extended__list">
            ${liDisap}
          </ul>
        `;
        item.append(answerExtendedDisap);

        const answerExtendedLike = document.createElement('div');
        answerExtendedLike.classList.add('answer-extended', `answer_${q + 1}`, 'liked');
        answerExtendedLike.innerHTML = `
          <p class="answer-extended__question">Что понравилось больше всего?</p>
          <ul class="answer-extended__list">
            ${liLike}
          </ul>
        `;
        item.append(answerExtendedLike);
      }
    });
  }
  renderAnswerExtended();

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

    function showColorRange() {
      rangeValue.style.display = 'block';
      rangeValue.style.color = arrGradient[+range.value];
      sliderRange.style.background = 'linear-gradient(to right, #ba1417 0.59%, #cd0800 9.86%, #f45800 19.12%, #fd9113 27.87%, #ffb800 38.16%, #d7e317 48.45%, #d1e01f 60.8%, #eaf65e 71.61%, #00d086 81.9%, #00ab23 90.65%, #056719 99.4%)';
    };

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
        scrollNext();
      } else {
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
        scrollNext();
      }
    });

  });

  function scrollNext() {
    window.scrollBy({
          top: 400,
          behavior: 'smooth'
        });
  }

  const answerCheckbox = document.querySelectorAll('.answer-checkbox');
  
  answerCheckbox.forEach(checkbox => {
    const num = checkbox.getAttribute('name').charAt(7);
    
    checkbox.addEventListener('click', () => {
      if (checkbox.checked == true) {
        if (question[num].classList.contains('hide')) {
          setTimeout(scrollNext, 3000);
          question[num].classList.remove('hide');
          question[num].classList.add('show', 'fade');
        }
      }
    });
  });

  const comment = document.getElementById('comment'), 
        charLimit = document.getElementById('char-limit');


  comment.addEventListener('input', (e) => {
    const elem = e.target,
          currentLength = elem.value.length,
          maxLength = elem.getAttribute('maxlength');

    charLimit.textContent = `${currentLength} из ${maxLength}`;
          
    elem.style.cssText = 'height: auto;';
    elem.style.cssText = 'height:' + elem.scrollHeight + 'px';
  });

});
