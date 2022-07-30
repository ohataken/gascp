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

### 4. Copy the config file

```
cd gascp
cp oauth2_token.json ~/.gascp_oauth2_token.json
```

### 5. OAuth2

```
gascp --showauthurl [client_id] [client_secret] [redirect_uri]
```

then it will show the long url. paste it into your browser address, consent, and get redirected to http://localhost:8080/oauth2/callback?code=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&scope=&authuser=0&prompt=consent .

### 6. Enter the code

```
gascp --enterauthcode [redirect_uri] [code]
```

code is a query string of the redirect url.

### 7. Copy a Google Apps Script project to another one

```
gascp cp [origin_id] [destination_id]
```
