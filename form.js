document
  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
const input = document.querySelector(".input");
const eyeOpen = document.querySelector(".eye-open");
const eyeClose = document.querySelector(".eye-close");
eyeOpen.addEventListener("click", function () {
  eyeOpen.classList.add("hidden");
  eyeClose.classList.remove("hidden");
  input.setAttribute("type", "password");
});
eyeClose.addEventListener("click", function () {
  eyeOpen.classList.remove("hidden");
  eyeClose.classList.add("hidden");
  input.setAttribute("type", "text");
});

//
const emailEle = document.getElementById("email");
const passwordEle = document.getElementById("password");

const btnRegister = document.getElementById("loginButton");
const inputEles = document.querySelectorAll(".input-group");
var selectedLanguage=document.getElementById("translate_select").value;
btnRegister.addEventListener("click", function () {
  Array.from(inputEles).map((ele) => ele.classList.remove("success", "error"));
  let isValid = checkValidate(selectedLanguage);

  if (isValid) {
    alert("Gửi đăng ký thành công");
    window.location.href = "http://127.0.0.1:5500/test.html";
  }
});

function checkValidate(language) {
  let emailValue = emailEle.value;
  let passwordValue = passwordEle.value;

  let isCheck = true;

  if (emailValue == "") {
    setError(emailEle,'empty email', language);
    isCheck = false;
  } else if (!isEmail(emailValue)) {
    setError(emailEle, 'invalid email', language);
    isCheck = false;
  } else {
    setSuccess(emailEle);
  }

  if (passwordValue == "") {
    setError(passwordEle,'empty password', language);
    isCheck = false;
  } else if (!isPassword(passwordValue)) {
    setError(passwordEle,'invalid password', language);
    isCheck = false;
  } else {
    setSuccess(passwordEle);
  }

  return isCheck;
}

function setSuccess(ele) {
  ele.parentNode.classList.add("success");
}

function setError(ele, message, language) {
  let parentEle = ele.parentNode;
  parentEle.classList.add("error");
  parentEle.querySelector("small").innerText = getMessage(message, language);
}
function getMessage(message, language) {
  if (language === "1") {
    switch (message) {
      case "empty email":
        return "email không được để trống";
      case "invalid email":
        return "email không đúng định dạng";
      case "empty password":
        return "password không được để trống";
      case "invalid password":
        return "password không đúng định dạng";

      default:
        return message;
    }
  } else {
    switch (message) {
      case "empty email":
        return "email cannot be empty";
      case "invalid email":
        return "email invalid format";
      case "empty password":
        return "password canot be empty";
      case "invalid password":
        return "password invalid format";

      default:
        return message;
    }
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isPassword(password) {
  return /^(?=.*?[0-9])(?=.*?[a-zA-Z]).{3,30}$/.test(password);
}
//  thay đổi ngôn ngữ
document
  .getElementById("translate_select")
  .addEventListener("change", function () {
    var selectedLanguage = this.value;
    if (selectedLanguage === "1") {
      document.getElementById("form_title").innerText = "Đăng Nhập";
      document.getElementById("email_lable").innerText =
        "Tên Đăng Nhập Hoặc Email";
      document.getElementById("password_lable").innerText = "Mật Khẩu";
      document.getElementById("loginButton").innerText = "Đăng Nhập";
      setError(emailEle,"empty email",selectedLanguage);
      setError(passwordEle,"empty password",selectedLanguage);
    } else {
      document.getElementById("form_title").innerText = "SIGN IN";
      document.getElementById("email_lable").innerText = "Username or email";
      document.getElementById("password_lable").innerText = "Password";
      document.getElementById("loginButton").innerText = "Sign in";

      setError(emailEle,"empty email",selectedLanguage);
      setError(passwordEle,"empty password",selectedLanguage);
    }
  });
