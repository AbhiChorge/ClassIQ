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
      e.preventDefault();

      /* Get form values */
      const name = document.querySelector("#signupName").value.trim();
      const email = document.querySelector("#signupEmail").value.trim();
      const pass = document.querySelector("#signupPassword").value;

      /* Remove previous invalid classes */
      document.querySelector("#signupName").classList.remove("invalid");
      document.querySelector("#signupEmail").classList.remove("invalid");
      document.querySelector("#signupPassword").classList.remove("invalid");

      /* Validate name */
      if (name.length < 2) {
        error( "signupName", "Enter your full name." );
        showNotification( "Please enter your full name.", "error" );

        document.querySelector("#signupName").focus();
        return;
      }

      /* Validate email */
      if (!validEmail(email)) {
        error( "signupEmail", "Enter a valid email address." );
        showNotification( "Please enter a valid email address.", "error" );

        document.querySelector("#signupEmail").focus();
        return;
      }

      /* Validate password */
      if (!passwordOK(pass)) {
        error( "signupPassword", "Use 8+ characters with a letter and number." );
        showNotification( "Use 8+ characters with a letter and number.", "error" );

        document.querySelector("#signupPassword").focus();
        return;
      }

      /* Save registered user */
      const user = {
        name: name,
        email: email,
        password: pass
      };

      localStorage.setItem( "classiqUser", JSON.stringify(user) );

      /* Show success notification */
      showNotification( "Signup successful! Redirecting to login...", "success" );

      /* Redirect to login page */
      setTimeout(() => {
        location.href = "login.html";
      }, 700);
    });
  }


  /* LOGIN */

  const login = document.querySelector("#loginForm");

  if (login) {
    login.addEventListener("submit", e => {
      e.preventDefault();

      /* Get form values */
      const email = document.querySelector("#loginEmail").value.trim();
      const pass = document.querySelector("#loginPassword").value;

      /* Remove previous invalid classes */
      document.querySelector("#loginEmail").classList.remove("invalid");
      document.querySelector("#loginPassword").classList.remove("invalid");

      /* Validate email */
      if (!validEmail(email)) {
        error( "loginEmail", "Enter a valid email address." );
        showNotification( "Please enter a valid email address.", "error");

        document.querySelector("#loginEmail").focus();
        return;
      }

      /* Validate password */
      if (pass.length < 8) {
        error( "loginPassword", "Password must be at least 8 characters." );
        showNotification( "Password must be at least 8 characters.", "error" );

        document.querySelector("#loginPassword").focus();
        return;
      }

      /* Retrieve registered user */
      const user = JSON.parse( localStorage.getItem("classiqUser") || "null" );

      /* Check if user exists */
      if (!user) {
        showNotification( "No account found. Please sign up first.", "error" );
        return;
      }

      /* Check email and password */
      if ( user.email.toLowerCase() !== email.toLowerCase() || user.password !== pass ) {
        showNotification( "Email or password is incorrect.", "error");
        return;
      }

      /* Login successful */
      localStorage.setItem( "classiqLoggedIn", "true" );

      /* Show success notification */
      showNotification( "Login successful! Redirecting...", "success" );

      /* Redirect to homepage */
      setTimeout(() => {
        location.href = "index.html";
      }, 700);
    });
  }


  /* MOBILE MENU */
  function initMobileMenu() {

    const header = document.querySelector(".header");
    const menu = document.querySelector(".mobilemenu");
    const nav = document.querySelector(".desktopnav");

    if (!header || !menu || !nav) {
        return;
    }

    // Create close button using JavaScript
    const close = document.createElement("button");

    close.className = "mobileclose";
    close.setAttribute("aria-label", "Close navigation");
    close.innerHTML = "&times;";

    // Add close button at the beginning of nav
    nav.prepend(close);

    // Open menu
    menu.addEventListener("click", (event) => {
        event.stopPropagation();
        header.classList.add("mobileopen");
        menu.setAttribute("aria-expanded", "true");
    });

    // Close menu
    close.addEventListener("click", (event) => {
        event.stopPropagation();
        header.classList.remove("mobileopen");
        menu.setAttribute("aria-expanded", "false");
    });

    // Don't close when clicking inside nav
    nav.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Close when clicking outside header
    document.addEventListener("click", () => {
        header.classList.remove("mobileopen");
        menu.setAttribute("aria-expanded", "false");
    });
  }
  initMobileMenu();

  /* Nav active */ 
  function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".desktopnav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
  }
  setActiveNav();

    /* SUBSCRIPTION */
  const subscribeForm = document.querySelector("#subscribeForm");

  if (subscribeForm) {

    subscribeForm.addEventListener("submit", e => {

      e.preventDefault();

      const emailInput = document.querySelector("#email");
      const email = emailInput.value.trim();

      // Remove previous error
      emailInput.classList.remove("invalid");

      // Validate email
      if (!validEmail(email)) {

        emailInput.classList.add("invalid");

        showNotification(
          "Please enter a valid email address.",
          "error"
        );

        emailInput.focus();

        return;
      }

      // Valid email
      showNotification(
        "Thank you for subscribing!",
        "success"
      );

      // Clear input
      emailInput.value = "";
    });
  }


  /* NOTIFICATION */
  function showNotification(message, type = "success") {

    // Remove existing notification
    const existing = document.querySelector(".notification");

    if (existing) {
      existing.remove();
    }

    // Create notification
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Close notification">
        &times;
      </button>
    `;

    document.body.appendChild(notification);

    // Close button
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        closeNotification(notification);
      });

    // Automatically close after 4 seconds
    setTimeout(() => {
      closeNotification(notification);
    }, 4000);
  }

  function closeNotification(notification) {
    notification.classList.add("notification-hide");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }
})();