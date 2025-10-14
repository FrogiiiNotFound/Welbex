const formData = {
  question1: null,
  question2: null,
  question3: null,
  bonus: null,
};

function handleOptionSelect(optionElement, questionKey) {
  const chooseBlock = optionElement.closest(
    '.calculation__form-choose, .calculation__form-addition-choose',
  );

  chooseBlock
    .querySelectorAll('.calculation__form-option, .calculation__form-addition-option')
    .forEach((opt) => {
      opt.classList.remove('active');
    });

  optionElement.classList.add('active');

  formData[questionKey] = optionElement.dataset.value;

  console.log('Form data updated:', formData);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.calculation__form-option').forEach((option) => {
    option.addEventListener('click', function () {
      const questionBlock = this.closest('.calculation__form-question');
      const questionKey = `question${questionBlock.dataset.question}`;
      handleOptionSelect(this, questionKey);
    });
  });

  document.querySelectorAll('.calculation__form-addition-option').forEach((option) => {
    option.addEventListener('click', function () {
      handleOptionSelect(this, 'bonus');
    });
  });
});
