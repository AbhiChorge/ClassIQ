# ClassIQ

ClassIQ is a simple front-end website project with signup, login, responsive navigation, and email subscription functionality.

## Features

* User signup form
* Name, email, and password validation
* User data stored in browser `localStorage`
* Login form with credential validation
* Login success and error notifications
* Automatic redirect after successful signup
* Automatic redirect after successful login
* Responsive mobile navigation menu
* Active navigation link detection
* Footer email subscription form
* Reusable notification system for success and error messages

## Project Flow

### Signup

1. User opens `signup.html`.
2. User enters:

   * Full name
   * Email address
   * Password
3. The form validates all fields.
4. Password must contain:

   * At least 8 characters
   * At least one letter
   * At least one number
5. If validation succeeds, the user is stored in `localStorage` using the key `classiqUser`.
6. A success notification is displayed.
7. The user is redirected to `login.html`.

### Login

1. User opens `login.html`.
2. User enters their registered email and password.
3. The form validates the input.
4. The saved user is retrieved from `localStorage`.
5. Email and password are checked against the registered user.
6. If the credentials are correct:

   * `classiqLoggedIn` is set to `true`
   * A success notification is displayed
   * The user is redirected to `index.html`
7. If the credentials are incorrect, an error notification is displayed.

## Local Storage

The project uses browser `localStorage` for this demo authentication system.

### Registered User

The signup process stores the user under:

```text
classiqUser
```

Example stored object:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login Status

After successful login:

```text
classiqLoggedIn = "true"
```

> **Important:** This is only suitable for a front-end/demo project. Passwords should never be stored as plain text in `localStorage` in a real production application.

## Form Validation

### Email

The email must follow a valid email format.

### Signup Password

The password must:

* Be at least 8 characters long
* Contain at least one letter
* Contain at least one number

### Login Password

The login password must contain at least 8 characters.

## Notification System

The project uses one reusable notification function:

```javascript
showNotification(message, type);
```

Supported notification types include:

```javascript
showNotification("Signup successful!", "success");
showNotification("Email or password is incorrect.", "error");
```

Notifications include:

* Message text
* Close button
* Automatic closing after 4 seconds
* Success and error states

## HTML Form Requirements

### Login Form

The login form must use:

```html
<form id="loginForm" novalidate>
```

Required element IDs:

```text
loginEmail
loginPassword
loginMessage
```

Each field should also have a matching error element:

```html
<p data-error="loginEmail"></p>
<p data-error="loginPassword"></p>
```

### Signup Form

The signup form must use:

```html
<form id="signupForm" novalidate>
```

Required element IDs:

```text
signupName
signupEmail
signupPassword
signupMessage
```

Each field should also have a matching error element:

```html
<p data-error="signupName"></p>
<p data-error="signupEmail"></p>
<p data-error="signupPassword"></p>
```

For the signup password field, use:

```html
<input id="signupPassword" type="password" autocomplete="new-password">
```

For the login password field, use:

```html
<input id="loginPassword" type="password" autocomplete="current-password">
```

## Mobile Navigation

The JavaScript initializes the mobile navigation using:

```javascript
initMobileMenu();
```

It:

* Opens the mobile menu
* Creates the close button dynamically
* Closes the menu using the close button
* Closes the menu when clicking outside
* Updates `aria-expanded` for accessibility

The navigation expects these classes:

```text
.header
.mobilemenu
.desktopnav
```

When the mobile menu is open, the header receives:

```text
mobileopen
```

## Active Navigation

The current page is detected automatically and the corresponding navigation link receives:

```text
active
```

The navigation links should use normal page URLs such as:

```html
<a href="index.html">Home</a>
<a href="login.html">Login</a>
<a href="signup.html">Sign Up</a>
```

## Subscription Form

The footer subscription form should use:

```html
<form id="subscribeForm">
```

The email input should use:

```html
<input id="email" type="email">
```

When a valid email is submitted:

```text
Thank you for subscribing!
```

is displayed using the notification system.

For an invalid email:

```text
Please enter a valid email address.
```

is displayed.

## JavaScript Structure

The main JavaScript file is organized into these sections:

```text
Email validation
Password validation
Display validation errors
Signup
Login
Mobile menu
Active navigation
Subscription
Notification
```

The complete JavaScript is wrapped in an IIFE:

```javascript
(() => {
  "use strict";

  // Application code

})();
```

This keeps variables and functions from leaking into the global scope.

## Running the Project

Because this is a front-end project, it can be opened directly in a browser.

Recommended development setup:

1. Open the project folder in VS Code.
2. Install/use the Live Server extension.
3. Open `index.html` using Live Server.
4. Navigate to the signup page.
5. Create a demo account.
6. You will be redirected to the login page.
7. Log in using the same credentials.
8. You will be redirected to the homepage.

## Important Security Note

This authentication system is intended for a **demo/static front-end project only**.

It is **not secure authentication** because:

* User credentials are stored in browser `localStorage`
* Passwords are stored as plain text
* There is no backend authentication
* There is no password hashing
* There is no session/token validation
* Users can modify `localStorage` manually

For a production website, authentication should be handled by a secure backend or an established authentication provider.

## Browser Storage Reset

To remove the demo account and login status, open the browser developer console and run:

```javascript
localStorage.removeItem("classiqUser");
localStorage.removeItem("classiqLoggedIn");
```

To clear all local storage for the website:

```javascript
localStorage.clear();
```
