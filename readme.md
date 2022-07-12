# gascp

copies Google Apps Script source code to another GAS project.

## requirements

### 1. Enable your own Google Apps Script API

open [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings), then enable it.

### 2. Get API credentials

open GCP console https://console.cloud.google.com/welcome , create a project, create OAuth2 consent, and create credentials.

### 3. Install

```
cd gascp
npm install
npm link
```

### 4. OAuth2

```
gascp --showauthurl [client_id] [client_secret] [redirect_uri]
```

then it will show the long url. paste it into your browser address, consent, and get redirected to http://localhost:8080/oauth2/callback?code=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&scope=email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/script.deployments%20https://www.googleapis.com/auth/script.processes%20https://www.googleapis.com/auth/script.projects&authuser=0&prompt=consent . 

### 5. Enter the code

```
gascp --enterauthcode [client_id] [client_secret] [redirect_uri] [code]
```

code is a query string of the redirect url.

### 6. Copy a Google Apps Script project to another one

```
gascp cp [origin_id] [destination_id]
```
