var okta = new OktaSignIn({
    baseUrl: "{{BASE_URL}}",
    clientId: "{{CLIENT_ID}}",
    authParams: {
      issuer: "{{ISSUER}}",
      responseType: ["token", "id_token"],
      display: "page",
    },
});


// Handle the user's login and what happens next.
function handleLogin() {
    // If the user is logging in for the first time...
    if (okta.token.hasTokensInUrl()) {
      okta.token.parseTokensFromUrl(
        function success(res) {
          // Save the tokens for later use, e.g. if the page gets refreshed:
          okta.tokenManager.add("accessToken", res[0]);
          okta.tokenManager.add("idToken", res[1]);
  
          console.log("user just logged in");
        },
        function error(err) {
          alert(
            "We weren't able to log you in, something horrible must have happened. Please refresh the page."
          );
        }
      );
    } else {
      okta.session.get(function (res) {
        window.isLoggedIn = true;
        // If the user is logged in...
        if (res.status === "ACTIVE") {
          console.log("user is already logged in");
          return;
        }
        window.isLoggedIn = false;
        // If we get here, the user is not logged in.
        console.log("user not logged in");
        // showLogin();
      });
    }
  }
  
  handleLogin();
  