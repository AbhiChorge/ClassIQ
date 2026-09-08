(() => {
  "use strict";
  /* Email validation */
  const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);

  /* Password validation */
  const passwordOK = value => value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);

  /* Display validation error */
  const error = (id, msg) => {
    const input = document.getElementById(id);
    const output = document.querySelector(`[data-error="${id}"]`);

    // Add/remove invalid class
    if (input) {
      input.classList.toggle("invalid", !!msg);
    }

    // Display error message
    if (output) {
      output.textContent = msg || "";
    }

    // Return true if there is no error
    return !msg;
  };


  /* SIGNUP */
  const signup = document.querySelector("#signupForm");
  if (signup) {

    signup.addEventListener("submit", e => {
        // Prevent normal page reload
        e.preventDefault();

        /* Get form values */
        const name = document.querySelector("#signupName").value.trim();
        const email = document.querySelector("#signupEmail").value.trim();
        const pass = document.querySelector("#signupPassword").value;
        let ok = true;

        /* Validate name */
        ok = error( "signupName", name.length < 2 ? "Enter your full name." : "" ) && ok;

        /* Validate email */
        ok = error( "signupEmail", !validEmail(email) ? "Enter a valid email address." : "" ) && ok;

        /* Validate password */
        ok = error( "signupPassword", !passwordOK(pass) ? "Use 8+ characters with a letter and number." : "" ) && ok;

        const message = document.querySelector("#signupMessage");
        /* If any validation failed */
        if (!ok) {
          message.textContent = "Please fix the highlighted fields.";
          message.className = "form-message error-message";
          return;
        }

        /* Redirect user to login page */
        setTimeout(() => { location.href = "login.html"; }, 700);
      }
    );
  }


  /* LOGIN */

  const login = document.querySelector("#loginForm");
  if (login) {

    login.addEventListener("submit", e => {
      e.preventDefault();

      const email = document.querySelector("#loginEmail").value.trim();
      const pass = document.querySelector("#loginPassword").value;
      let ok = true;

      /* Email validation */
      ok = error("loginEmail", !validEmail(email) ? "Enter a valid email address." : "") && ok;

      /* Password validation */
      ok = error("loginPassword", pass.length < 8 ? "Password must be at least 8 characters." : "") && ok;

      const message = document.querySelector("#loginMessage");


      /* Stop if validation fails. */
      if (!ok) {
        message.textContent = "Please fix the highlighted fields.";
        message.className = "form-message error-message";
        return;
      }

      /* Retrieve registered user. */
      const user = JSON.parse(localStorage.getItem("classiqUser") || "null");

      if (user && (user.email.toLowerCase() !== email.toLowerCase() || user.password !== pass)) {
        message.textContent = "Email or password is incorrect.";
        message.className = "form-message error-message";
        return;
      }

      /* Login successful. */
      localStorage.setItem("classiqLoggedIn", "true");

      message.textContent = "Login successful. Redirecting…";
      message.className = "form-message success";

      setTimeout(() => { location.href = "index.html"; }, 600);
    });
  }


  /* MOBILE MENU */
  function initMobileMenu() {

    const menu = document.querySelector(".mobilemenu");
    if (!menu) { return; }

    menu.addEventListener("click", () => {
      const header = document.querySelector(".header");
      const open = header.classList.toggle("mobileopen");

      menu.setAttribute( "aria-expanded", String(open));
    });
  }
  initMobileMenu();
})();