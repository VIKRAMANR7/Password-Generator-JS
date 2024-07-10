const sliderEl = document.querySelector(".progress");
const sliderValue = document.querySelector(".slider-value");
const resultInput = document.getElementById("result-pwd");
const btnPwd = document.querySelector(".genPwd");
const pwdStrength = document.querySelector(".password-strength");
const copyIcon = document.querySelector(".copyBtn");

function setValue(ev) {
  let tempSliderValue = ev.target.value;
  sliderValue.textContent = tempSliderValue;
  const progress = (tempSliderValue / sliderEl.max) * 100;
  sliderEl.style.background = `linear-gradient(to right, #2563EB ${progress}%, #ccc ${progress}%)`;
  getCheckBoxVal();
  let pwdBulletin = getRandomSpaces();
  resultInput.innerText = pwdBulletin;
  strengthChecker();
}

btnPwd.addEventListener("click", () => {
  getCheckBoxVal();
  let pwdBulletin = getRandomSpaces();
  resultInput.innerText = pwdBulletin;
  strengthChecker();
});

function strengthChecker() {
  getCheckBoxVal();
  let pwdBulletin = getRandomSpaces();
  let strength = 0;
  let strengthTest = [/[a-z]+/, /[A-Z]+/, /[0-9]+/, /[!`@#$%^&*~_+-=?/]+/];
  if (pwdBulletin.length > 8) {
    strengthTest.forEach((item) => {
      if (item.test(pwdBulletin)) {
        strength += 1;
      }
    });
  } else {
    strength = 0;
  }

  let progress;
  switch (strength) {
    case 0:
      progress = (1 / 100) * 100;
      pwdStrength.style.background = `linear-gradient(to right, #DC6551 ${progress}%, #ccc ${progress}%)`;
      break;

    case 1:
      progress = (25 / 100) * 100;
      pwdStrength.style.background = `linear-gradient(to right, #DC6551 ${progress}%, #ccc ${progress}%)`;
      break;

    case 2:
      progress = (50 / 100) * 100;
      pwdStrength.style.background = `linear-gradient(to right, #F2B84F ${progress}%, #ccc ${progress}%)`;
      break;

    case 3:
      progress = (75 / 100) * 100;
      pwdStrength.style.background = `linear-gradient(to right, #BDE952 ${progress}%, #ccc ${progress}%)`;
      break;

    case 4:
      progress = (100 / 100) * 100;
      pwdStrength.style.background = `linear-gradient(to right, #3ba62f ${progress}%, #ccc ${progress}%)`;
      break;
  }
}

function getCheckBoxVal() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let result = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      result.push(checkboxes[i].value);
    }
  }
  return result;
}

function generatePassword() {
  let checkBoxTicked = getCheckBoxVal();
  let randomPassword = "";

  if (checkBoxTicked.length == 0) {
    return "";
  }
  if (checkBoxTicked.includes("lowercase")) {
    const aplhabetsLower = "abcdefghijklmnopqrstuvwxyz";
    randomPassword += aplhabetsLower;
  }
  if (checkBoxTicked.includes("uppercase")) {
    const aplhabetsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    randomPassword += aplhabetsUpper;
  }
  if (checkBoxTicked.includes("numbers")) {
    const numbers = "0123456789";
    randomPassword += numbers;
  }
  if (checkBoxTicked.includes("symbols")) {
    const symbols = "!`@#$%^&*~_+-=?/";
    randomPassword += symbols;
  }
  let finalPwd = "";
  for (let i = 0; i < sliderEl.value; i++) {
    const pos = Math.floor(Math.random() * randomPassword.length);
    finalPwd += randomPassword[pos];
  }
  return finalPwd;
}

function getRandomDuplicates() {
  let checkBoxTicked = getCheckBoxVal();
  let pwdVal = generatePassword();
  let uniqueChars;
  if (checkBoxTicked.includes("duplicate")) {
    let allTypes =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!`@#$%^&*~_+-=?/";
    let typesSplitArr = allTypes.split("");
    let newArr = [];
    for (let i = 0; i <= typesSplitArr.length - 1; i++) {
      newArr.push(typesSplitArr[i]);
    }
    let passwordLength = Number(sliderEl.value);
    let noDuplicate = [];
    for (let i = 0; i < passwordLength; i++) {
      let randNum = Math.floor(Math.random() * newArr.length);
      let splicedItem = newArr.splice(randNum, 1)[0];
      noDuplicate.push(splicedItem);
    }
    uniqueChars = noDuplicate.join("");
  } else {
    uniqueChars = pwdVal;
  }
  return uniqueChars;
}

function getRandomSpaces() {
  let checkBoxTicked = getCheckBoxVal();
  let noDuplicates = getRandomDuplicates();
  let finalspaceVal;
  if (checkBoxTicked.includes("spaces")) {
    let spaceArr = noDuplicates.split("");
    let randomInt = Math.floor(Math.random() * noDuplicates.length) + 1;
    let splicedArr = spaceArr.toSpliced(randomInt, 1, " ");
    finalspaceVal = splicedArr.join("");
  } else {
    finalspaceVal = noDuplicates;
  }
  return finalspaceVal;
}

function copyPassword() {
  navigator.clipboard.writeText(resultInput.innerText);
  copyIcon.classList.remove("fa-regular", "fa-copy");
  copyIcon.classList.add("fas", "fa-check");
  setTimeout(() => {
    copyIcon.classList.add("fa-regular", "fa-copy");
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  let lower = "";
  let lowercaseDefaultLetters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 15; i++) {
    const pos = Math.floor(Math.random() * lowercaseDefaultLetters.length);
    lower += lowercaseDefaultLetters[pos];
  }
  resultInput.innerText = lower;

  sliderValue.innerText = "15";
  const progress = (15 / sliderEl.max) * 100;
  sliderEl.style.background = `linear-gradient(to right, #2563EB ${progress}%, #ccc ${progress}%)`;
  pwdStrength.style.background = `linear-gradient(to right, #DC6551 25%, #ccc 25%)`;
});
sliderEl.addEventListener("input", setValue);
copyIcon.addEventListener("click", copyPassword);
