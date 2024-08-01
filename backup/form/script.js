const nameReg =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỨỪỬỮỰÝỲỶỸỴýỳỷỹỵ]+(\s[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỨỪỬỮỰÝỲỶỸỴýỳỷỹỵ]+)*$/;
const phoneReg = /^\d{8,}$/;
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// custom
const wpHost = "https://amigroup.okhub-tech.com/";
const contactFormId = 7;

// add field
function showEmailError(message) {
  const emailErrorMessage = document.querySelector(".error-message[data-input='email']");
  emailErrorMessage.textContent = message;
  emailErrorMessage.style.opacity = 1;
}
function clearEmailError() {
  const emailErrorMessage = document.querySelector(".error-message[data-input='email']");
  emailErrorMessage.textContent = "";
  emailErrorMessage.style.opacity = 0;
}
function handleEmailInput(e) {
  const value = e.target.value;
  const isValid = emailReg.test(value);
  showEmailError(isValid ? "" : value === "" ? "Email không được để trống" : "Email không hợp lệ");
}

function init() {
  const form = document.querySelector(".email-container");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector("button[type='submit']");
    const submitText = submitButton.querySelector("p");
    const loadingIcon = submitButton.querySelector("svg");

    // add field
    const emailInput = form.querySelector("input[name='email']");
    const email = emailInput.value;

    if (!emailReg.test(email)) {
      // add field
      showEmailError(email === "" ? "Email không được để trống" : "Email không hợp lệ");
      emailInput.addEventListener("input", handleEmailInput);
    } else {
      submitText.style.opacity = 0;
      loadingIcon.style.opacity = 1;
      submitButton.disabled = true;
      submitButton.style.pointerEvents = "none";

      const formData = new FormData();
      formData.append("_wpcf7_unit_tag", contactFormId);

      // add field
      formData.append("yourEmail", email);

      const res = await fetch(`${wpHost}wp-json/contact-form-7/v1/contact-forms/${contactFormId}/feedback`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      kKao4Notification({
        text: result.status === "mail_sent" ? "Cảm ơn bạn đã đăng ký!" : "Có lỗi xảy ra. Không thể gửi thông tin.",
        duration: 4000,
      });

      submitText.style.opacity = 1;
      loadingIcon.style.opacity = 0;
      submitButton.disabled = false;
      submitButton.style.pointerEvents = "all";

      // add field
      emailInput.value = "";
      clearEmailError();
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
