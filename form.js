document

  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
const input = document.querySelector(".input");
var parentEle = null;
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
var selectedLanguage = document.getElementById("translate_select").value;
btnRegister.addEventListener("click", function () {
  selectedLanguage = document.getElementById("translate_select").value;
  Array.from(inputEles).map((ele) => ele.classList.remove("success", "error"));
  let isValid = checkValidate(selectedLanguage);

  if (isValid) {
    alert("Gửi đăng ký thành công");
    window.location.href = "http://127.0.0.1:5500/test.html";
  }
});
document.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("blur", function () {
    checkValidate(selectedLanguage);
  });
});

function checkValidate(language) {
  let emailValue = emailEle.value;
  let passwordValue = passwordEle.value;
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const uppercaseLetters = /[A-Z]+/;

  let isCheck = true;

  if (emailValue == "") {
    setError(emailEle, "empty email", language);
    isCheck = false;
  } else if (!isEmail(emailValue)) {
    setError(emailEle, "invalid email", language);
    isCheck = false;
  } else if (emailValue.length < 15) {
    setError(emailEle, "email too short", language);
    isCheck = false;
  } else {
    setSuccess(emailEle);
  }

  if (passwordValue == "") {
    setError(passwordEle, "empty password", language);
    isCheck = false;
  } else if (!isPassword(passwordValue)) {
    setError(passwordEle, "invalid password", language);
    isCheck = false;
  }
  
  else if (!isssPassword(passwordValue)) {
    setError(passwordEle, "number password", language);
    isCheck = false;
  }
  else if (!issPassword(passwordValue)) {
    setError(passwordEle, "character password", language);
    isCheck = false;
  }
  
  else if (passwordValue.length < 8) {
    setError(passwordEle, "password too short", language);
    isCheck = false;
  } else {
    setSuccess(passwordEle);
  }

  return isCheck;
}

function setSuccess(ele) {
  ele.parentNode.classList.add("success");
  ele.parentNode.querySelector("small").innerText = "";
  ele.parentNode.classList.remove("error");
}

function setError(ele, message, language) {
  parentEle = ele.parentNode;
  parentEle.classList.add("error");
  parentEle.classList.remove("success");
  parentEle.querySelector("small").innerText = getMessage(message, language);
}

function getMessage(message, language) {
  if (language === "1") {
    switch (message) {
      case "empty email":
        return "email không được để trống";

      case "invalid email":
        return "email không đúng định dạng";

      case "email too short":
        return "email quá ngắn trên 15 ký tự";


      case "password too short":
        return "password quá ngắn trên 8 ký tự";

      case "empty password":
        return "password không được để trống";

      case "invalid password":
        return "password phải có chữ cái in hoa";

        case "character password":
            return "password phải có ký tự đặc biệt";
            
            case "number password":
                return "password phải có 1 chữ số";

      default:
        return message;
    }
  } else {
    switch (message) {
      case "empty email":
        return "email cannot be empty";

      case "invalid email":
        return "email invalid format";

      case "email too short":
        return "email too short on 8 characters ";


      case "password too short":
        return "password too short on 8 characters ";

      case "empty password":
        return "password canot be empty";

        case "invalid password":
            return "password must uppercase";

      case "character password":
        return "password must special character";
        case "number password":
            return "password must have one number";

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

return /[A-Z]/.test(password);
}
function issPassword(password) {
   
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}
function isssPassword(password) {
    // Kiểm tra mật khẩu có ít nhất một chữ số
    return /\d/.test(password);
}


//  thay đổi ngôn ngữ
document
  .getElementById("translate_select")
  .addEventListener("change", function () {
    var selectedLanguage = this.value;
    //cập nhật mới
    updateLanguageUI(selectedLanguage);
    //  kiểm tra và cập nhật nếu có lỗi
    checkAndShowValidationErrors(selectedLanguage);
  });
function updateLanguageUI(language) {
  if (language === "1") {
    document.getElementById("form_title").innerText = "Đăng Nhập";
    document.getElementById("email_lable").innerText =
      "Tên Đăng Nhập Hoặc Email";
    document.getElementById("password_lable").innerText = "Mật Khẩu";
    document.getElementById("loginButton").innerText = "Đăng Nhập";
    if (parentEle) {
      setError(emailEle, "empty email", language);
      setError(passwordEle, "empty password", language);
    }
  } else {
    document.getElementById("form_title").innerText = "SIGN IN";
    document.getElementById("email_lable").innerText = "Username or email";
    document.getElementById("password_lable").innerText = "Password";
    document.getElementById("loginButton").innerText = "Sign in";

    if (parentEle) {
      setError(emailEle, "empty email", language);
      setError(passwordEle, "empty password", language);
    }
  }
}
function checkAndShowValidationErrors(language) {
  // Chỉ hiển thị lỗi nếu đã tồn tại
  if (emailEle.parentNode.classList.contains("error")) {
    checkValidate(language);
  }

  if (passwordEle.parentNode.classList.contains("error")) {
    checkValidate(language);
  }
}

// function checkValidPassword (pass) {
//     const conditionPass = ''
//     if(pass.length > 8) {conditionPass.concat('chua du 8 ky tu')}
//     if(pass.includes()) {conditionPass.concat('chua co ky tu dac biet')}
//     if()
//}
function checkValidPassword(pass) {
    let conditionPass = '';

    if (pass.length < 8) {
        conditionPass = 'password phải có ít nhất 8 ký tự';
    }

    if (!pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        conditionPass = 'password phải có ít nhất một ký tự đặc biệt';
    }

    if (!pass.match(/[A-Z]/)) {
        conditionPass = 'password phải có ít nhất một chữ cái viết hoa';
    }

    return conditionPass;
}
