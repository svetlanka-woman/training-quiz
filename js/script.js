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
    // adding last question mark for question_connect
    if (i == question.length-1) {
      indicator[i].insertAdjacentHTML('beforeend', '<li class="mark-last"></li>');
    }
  }

  question.forEach((item, q) => {
    renderQuestionHeader(q);
  });

  const answersExtended = [
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
        'Непонятные формули&shy;ровки', 
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
        'Исчерпываю&shy;щая информация по Priority Pass', 
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

        for (let i = 0; i <= answersExtended[q].src.length-1; i++) {
          const {num, src, alt, pDisap, pLike} = answersExtended[q];
          let number = `${num}-${i+1}`;   //extended question number 
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
  
  function toggleAnswerExtended(showElem, hideElem, hideCheckbox) {
    showElem.classList.add('show', 'fade');
    hideElem.classList.remove('show', 'fade');
    hideCheckbox.forEach(checkbox => {
      checkbox.checked = false;
    });
    const message = hideElem.lastElementChild; 
    if (message.classList.contains('message')) {
      message.remove();
    }
  }

  const numberTotal = document.querySelectorAll('.number__total'), 
        blockSubmit = document.getElementById('block-submit');

  function reRenderQuestionHeader() {
    const indicatorComment = indicator[question.length - 2],
          lastLiIndicatorComment = indicatorComment.lastElementChild;

    if (checkingValueRanges()) {
      if (indicator[0].children.length !== question.length) {
        numberTotal.forEach((elem, q) => {
          elem.textContent = question.length;
          if (q < question.length - 1) {
            indicator[q].insertAdjacentHTML('beforeend', '<li class="last"></li>');
          }
          if (lastLiIndicatorComment.classList.contains('mark-last')) {
            lastLiIndicatorComment.remove();
          }
        });
      }
    } else {
      if (!lastLiIndicatorComment.classList.contains('mark-last')) {
        indicatorComment.insertAdjacentHTML('beforeend', '<li class="mark-last"></li>');
        numberTotal.forEach(elem => {
          elem.textContent = question.length - 1;
        });
        document.querySelectorAll('.last').forEach(elem => {
          elem.remove();
        });
      }
    }
  }

  function checkingValueRanges() {
    const arrValueRanges = [];

    ranges.forEach((item, i) => {
      const rangeValue = item.nextElementSibling;

      if (rangeValue.style.display == 'block') {
        arrValueRanges.push(item.value);
      }
    });
    return arrValueRanges.some(item => item < 7);
  }

  const ranges = document.querySelectorAll('.range'),
        container = document.querySelector('.container'),
        arrGradient = ['#ba1417','#cd0800','#f45800','#fd9113', '#ffb800', '#d7e317', '#d1e01f', '#d1e01f', '#79E371', '#00ab23', '#00ab23'];

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
    }

    range.addEventListener('input', () => {
      sliderRange.style.cssText = `
        -webkit-mask: url('img/thumb-line.svg') ${+range.value * 10}% 0/60px 26px, 
                      linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), 
                      transparent 0 calc(50% + 60px/2 - 1px), #fff 0) 
                      right ${+range.value * 10}% top 21px/calc(200% - 60px) 4px;
        -webkit-mask-repeat: no-repeat;
        mask: url('img/thumb-line.svg') ${+range.value * 10}% 0/60px 26px, 
              linear-gradient(to right, #fff calc(50% - 60px/2 + 1px), 
              transparent 0 calc(50% + 60px/2 - 1px), #fff 0) 
              right ${+range.value * 10}% top 21px/calc(200% - 60px) 4px;
        mask-repeat: no-repeat;
        `;
        
      if (range.value == 0 && rangeValue.textContent == 1) {
        if (container.clientWidth <= 350) { //if screen size <= 350px
          rangeValue.style.left = '8.5%';
        } else { 
          rangeValue.style.left = '7.5%';
        }
      } else {
        if (container.clientWidth <= 350) { //if screen size <= 350px
          switch (range.value) {
            case '1': 
              rangeValue.style.left = '17%';
              break;
            case '10': 
              rangeValue.style.left = '87%';
              break;
            default:
              rangeValue.style.left = (+range.value + 1) * 8.1 + '%';
          }
        } else {
          rangeValue.style.left = (+range.value + 1) * 8.1 + '%';
        }
      }
      showColorRange();
      rangeValue.textContent = range.value;
    });
        
    const num = +answerName.charAt(7);  //question number

    function showNextElement() {
      showColorRange();
      reRenderQuestionHeader();
      
      if (num == '1') {   // show second question
        if (!question[num].classList.contains('show')) {
          question[num].classList.add('show', 'fade', 'padding-bottom');
          scrollNext(question[num]);
        }
      } else { 
        question[num-1].classList.remove('padding-bottom');
        
        // show answers extended
        if (range.value > 6) { 
          toggleAnswerExtended(answerExtendedLike, answerExtendedDisappointed, checkboxDisappointed);
        } else {
          toggleAnswerExtended(answerExtendedDisappointed, answerExtendedLike, checkboxLike);
        }

        if (!question[num].classList.contains('show')) {
          const answerEx = 
            answerExtendedLike.classList.contains('show') ? 
            answerExtendedLike : answerExtendedDisappointed;
          scrollNext(answerEx);
          if (num == question.length-2) { 
            // show question_comment and button-submit
            question[num].classList.add('show', 'fade');
            blockSubmit.classList.add('show', 'fade');
            setTimeout(() => {
              scrollNext(question[num]);
            }, 300);
          }
        }
      }

      if (question[question.length - 2].classList.contains('show')) {
        // reRenderQuestionHeader();
        if (checkingValueRanges()) { 
          //show question_connect
          question[question.length - 1].classList.add('show', 'fade');
        } else {
          //hide question_connect
          question[question.length - 1].classList.remove('show', 'fade');
        }
      }
    }

    range.addEventListener('touchend', showNextElement);

    range.addEventListener('click', showNextElement);

  });

  function scrollNext(elem) {
    let elemHeight = elem.getBoundingClientRect().height;  

    window.scrollBy({
      top: elemHeight + 20, 
      behavior: 'smooth'
    });
  }

  let timer;

  window.addEventListener('scroll', () => {
    if (timer) {
      clearTimeout(timer);
    }
  });
  
  function setTimeScroll(elem, time) {
    timer = setTimeout(() => {
      scrollNext(elem);
    }, time);
    return timer;
  }

  const answerCheckbox = document.querySelectorAll('.answer-checkbox');

  answerCheckbox.forEach(checkbox => {
    const num = checkbox.getAttribute('name').charAt(7); // question number
        
    checkbox.addEventListener('click', () => {
      if (checkbox.checked == true) {
        if (!question[num].classList.contains('show')) {
          question[num].classList.add('show', 'fade', 'padding-bottom');
            setTimeScroll(question[num], 3000);
        }
        const message = checkbox.parentElement.parentElement.nextElementSibling; 
        if (message) {
          message.remove();
        }
      }
    });
  });

  const textareaComment = document.getElementById('comment'), 
        charLimit = document.getElementById('char-limit');

  textareaComment.addEventListener('input', (e) => {
    const elem = e.target,
          currentLength = elem.value.length,
          maxLength = elem.getAttribute('maxlength');

    charLimit.textContent = `${currentLength} из ${maxLength}`;
          
    elem.style.cssText = 'height: auto;';
    elem.style.cssText = 'height:' + elem.scrollHeight + 'px';
  });

  
  function scrollToElem(elem) {
    let elemTop = elem.getBoundingClientRect().top,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;  

    window.scrollTo({
      top: elemTop + scrollTop, 
      behavior: 'smooth'
    });
  }

  const answerExtended = document.querySelectorAll('.answer-extended');

  function verifCheckedCheckbox() {
    answerExtended.forEach((item) => {
      if (item.classList.contains('show')) {
        const checkbox = item.querySelectorAll('.answer-checkbox');
        let checkedSome = false;

        checkbox.forEach(box => {
          if (box.checked) {
            checkedSome = true;
          }
        });

        if (!checkedSome && !item.querySelector('.message')) {
          const message = document.createElement('div');
          message.classList.add('message');
          message.textContent = `Выберите, пожалуста, причину предыдущей оценки`;
          item.append(message);
        }
      }
    });
  }

  const form = document.getElementById('form'),
        header = document.querySelector('.header'),
        afterSubmitBlock = document.querySelector('.after-submit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    verifCheckedCheckbox();
    const message = document.querySelectorAll('.message');
    if (message[0]) {
      scrollToElem(message[0].parentElement.parentElement.parentElement);
    } else {
      const formData = new FormData(form);
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
      
      header.classList.add('hide');
      form.classList.add('hide');
      afterSubmitBlock.classList.add('show', 'fade');
    }
  });

});
