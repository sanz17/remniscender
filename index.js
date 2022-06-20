const {google}=require('googleapis')

const {OAuth2}=google.auth

const oAuth2Client=new OAuth2(
    '758124967371-i9c1e6vkhbs5ahkha3iena2ru2g385st.apps.googleusercontent.com',
    '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')

oAuth2Client.setCredentials({
    refresh_token:
    '1//049Z-Mw8UJIghCgYIARAAGAQSNwF-L9IrSjzw6phGqRmowWpl9nLuBGefwJUBWJeFWId9rLkSOeZUrXbz5zlhbScxpNjb8DHoSo8',
    
})

const calendar=google.calendar({version: 'v3',auth: oAuth2Client})

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '758124967371-i9c1e6vkhbs5ahkha3iena2ru2g385st.apps.googleusercontent.com',
                  'redirect_uri': 'YOUR_REDIRECT_URI',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }