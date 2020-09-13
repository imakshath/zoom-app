

// Render the login form.
function showLogin() {
  okta.renderEl(
    { el: "#okta-login-container" },
    function (res) {},
    function (err) {
      alert(
        "Couldn't render the login form, something horrible must have happened. Please refresh the page."
      );
    }
  );
}

if (window.isLoggedIn) {
    showLogin();
}  