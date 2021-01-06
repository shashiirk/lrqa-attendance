const form = document.getElementById('form');
const fullName = document.getElementById('full-name');
const rollNumber = document.getElementById('roll-number');
const department = document.getElementById('dept');
const linkBox = document.getElementById('link-box');
const linkContent = document.getElementById('link-content');
const copyBtn = document.getElementById('copy');
const hintBox = document.getElementById('hint-box');
// Boolean value used to ensure that event listeners on input fields are added only once
let firstValidation = true;

// Validates full name and returns a boolean value
function validateFullName() {
  const fullNameValue = fullName.value.trim();
  const fullNameParent = fullName.parentElement;
  const regexTestPassed = /^[A-Za-z\s]+$/.test(fullNameValue);

  // Event listener on input event
  if (firstValidation) {
    fullName.addEventListener('input', validateFullName);
  }

  if (fullNameValue === '' || !regexTestPassed) {
    fullNameParent.classList.add('error');
    return false;
  } else {
    fullNameParent.classList.remove('error');
    return true;
  }
}

// Validates roll number and returns a boolean value
function validateRollNumber() {
  const rollNumberValue = rollNumber.value.trim();
  const rollNumberParent = rollNumber.parentElement;
  const regexTestPassed = /^[A-Za-z0-9]{10}$/.test(rollNumberValue);

  // Event listener on input event
  if (firstValidation) {
    rollNumber.addEventListener('input', validateRollNumber);
  }

  if (rollNumberValue === '' || !regexTestPassed) {
    rollNumberParent.classList.add('error');
    return false;
  } else {
    rollNumberParent.classList.remove('error');
    return true;
  }
}

// Validates department selection and returns a boolean value
function validateSelection() {
  const departmentValue = department.value;
  const departmentParent = department.parentElement;

  // Event listener on input event
  if (firstValidation) {
    department.addEventListener('change', validateSelection);
  }

  if (departmentValue === 'none') {
    departmentParent.classList.add('error');
    return false;
  } else {
    departmentParent.classList.remove('error');
    return true;
  }
}

// Generate link on successful form validation
function generateLink(ev) {
  ev.preventDefault();

  const fullNameValidation = validateFullName();
  const rollNumberValidation = validateRollNumber();
  const departmentValidation = validateSelection();

  firstValidation = false;

  if (fullNameValidation && rollNumberValidation && departmentValidation) {
    const fullNameValue = fullName.value.trim();
    const rollNumberValue = rollNumber.value.trim();
    const departmentValue = department.value;

    // Pick a random rating for feedback
    const ratingsAvailable = ['5 - Excellent', '4 - Good', '3 - Average'];
    const randomRating = ratingsAvailable[Math.floor(Math.random() * 3)];

    const baseUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLScJu10Mv2uYVoCEvY7-thq5UMpbXfV466aMU6O9REaqVosNeA/formResponse';

    const queryUrl = `${baseUrl}?entry.1110617932=${rollNumberValue.toUpperCase()}&entry.1569197185=${fullNameValue}&entry.1265045525=${departmentValue}&entry.248948479=${rollNumberValue.toLowerCase()}@cvsr.ac.in&entry.362064286=${randomRating}&entry.624867601=No+issues&entry.940688449=Nothing&submit=Submit`;

    linkContent.textContent = queryUrl;
    linkBox.classList.add('show');
  } else {
    return;
  }
}

function copyToClipboard() {
  const range = document.createRange();
  range.selectNode(linkContent);
  // Clear current selection
  window.getSelection().removeAllRanges();
  // To select text
  window.getSelection().addRange(range);
  // To copy text
  document.execCommand('copy');
  // To deselect text
  window.getSelection().removeAllRanges();
  linkBox.classList.remove('show');
  // Show hint box
  hintBox.classList.add('show');
  // Hide hint box
  setTimeout(() => {
    hintBox.classList.remove('show');
  }, 2400);
}

// Submit event of form
form.addEventListener('submit', generateLink);
// Click event on copy button
copyBtn.addEventListener('click', copyToClipboard);
