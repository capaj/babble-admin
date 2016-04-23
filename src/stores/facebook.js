const loginCB = function (response) {
  if (response.status === 'connected') {
    // Logged in
    connectedCallback(response)
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not this app

  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.

  }
}

const self = {
  login: function () {
    FB.login(loginCB, {scope: 'public_profile,email'})
  }
}

function connectedCallback (response) {
  self.authResponse = response.authResponse // saving into the store
  console.log('self.authResponse.accessToken', self.authResponse.accessToken)
  FB.api('/me', function (response) {
    Object.assign(self, response)
    console.log('response', response)
  })
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '989552744433460',
    xfbml: true,
    version: 'v2.4'
  })

  FB.getLoginStatus(loginCB)
}

;(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/cz_CS/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

export default self
