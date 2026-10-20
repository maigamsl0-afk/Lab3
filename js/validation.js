const form = document.querySelector("#register-form");
const success = document.querySelector("#success");

function setError(id, message) {
  const input = document.querySelector("#" + id);
  const error = document.querySelector("#" + id + "-error");
  error.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the form from being sent

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const confirm = document.querySelector("#confirm").value;
  const age = Number(document.querySelector("#age").value);
  const ageText = document.querySelector("#age").value.trim();

  let valid = true;

  // Name
  if (name === "") {
    setError("name", "Name is required.");
    valid = false;
  } else if (name.length < 2) {
    setError("name", "Name must be at least 2 characters.");
    valid = false;
  } else {
    setError("name", "");
  }

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    setError("email", "Email is required.");
    valid = false;
  } else if (!emailPattern.test(email)) {
    setError("email", "Please enter a valid email (like name@mail.com).");
    valid = false;
  } else {
    setError("email", "");
  }

  // Password
  if (password === "") {
    setError("password", "Password is required.");
    valid = false;
  } else if (password.length < 8) {
    setError("password", "Password must be at least 8 characters.");
    valid = false;
  } else {
    setError("password", "");
  }

  // Confirm password
  if (confirm === "") {
    setError("confirm", "Please confirm your password.");
    valid = false;
  } else if (confirm !== password) {
    setError("confirm", "Passwords do not match.");
    valid = false;
  } else {
    setError("confirm", "");
  }

  // Age
  if (ageText === "") {
    setError("age", "Age is required.");
    valid = false;
  } else if (isNaN(age) || age < 1 || age > 120) {
    setError("age", "Age must be a number between 1 and 120.");
    valid = false;
  } else {
    setError("age", "");
  }

  // Result
  success.hidden = !valid;
  if (valid) {
    form.reset();
  }
});
