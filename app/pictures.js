

function clearCache() {
    navigator.camera.cleanup();
}

var retries = 0;
function onCapturePhotoUser(fileURI) {
    var win = function (r) {
      console.log("WIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(r));
      var image = document.getElementById('portrait');
      image.src = fileURI;
      userSuccessCallback(r);
      clearCache();
      retries = 0;
      alert(userSuccessText);
    }

    var fail = function (error) {
      console.log("FAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(error));
      if (retries == 0) {
          retries ++
          setTimeout(function() {
              onCapturePhotoUser(fileURI)
          }, 1000)
      } else {
          retries = 0;
          clearCache();
          alert(userErrorText);
      }
    }

    var options = new FileUploadOptions();
    options.httpMethod = "PUT";
    options.fileKey = "user[image]";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = { }; // if we need to send parameters to the server request
    options.headers = { Authorization: userData.token }
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://138.197.8.69/users/" + userData.id), win.bind(fileURI), fail.bind(fileURI), options);
}

var imageData = null;
function onCapturePhotoEvent(fileURI) {
  if(Object.keys(eventData).length == 0){
    imageData = fileURI;
    var image = document.getElementById('portrait');
    image.src = fileURI;
  }else{
    var win = function (r) {
      console.log("WIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(r));
      var image = document.getElementById('portrait');
      image.src = fileURI;
      eventSuccessCallback(r);
      clearCache();
      retries = 0;
      alert(eventSuccessText);
    }

    var fail = function (error) {
      console.log("FAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(error));
      if (retries == 0) {
          retries ++
          setTimeout(function() {
              onCapturePhotoEvent(fileURI)
          }, 1000)
      } else {
          retries = 0;
          clearCache();
          alert(eventErrorText);
      }
    }

    var options = new FileUploadOptions();
    options.httpMethod = "PUT";
    options.fileKey = "chat[image]";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = { }; // if we need to send parameters to the server request
    options.headers = { Authorization: userData.token }
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://138.197.8.69/chats/" + eventData.id), win.bind(fileURI), fail.bind(fileURI), options);
  }
}

function uploadSavedImage(event, user, successText, errorText) {
    if(!imageData) return;
    else{
      console.log("Uploading image after creating event");
      var win = function (r) {
        console.log("WIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(JSON.stringify(r));
        clearCache();
        retries = 0;
        alert(successText);
      }

      var fail = function (error) {
        console.log("FAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(JSON.stringify(error));
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                uploadSavedImage(event, user, successText, errorText);
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            alert(errorText);
        }
      }

      var options = new FileUploadOptions();
      options.httpMethod = "PUT";
      options.fileKey = "chat[image]";
      options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.params = { }; // if we need to send parameters to the server request
      options.headers = { Authorization: user.token }
      var ft = new FileTransfer();
      ft.upload(imageData, encodeURI("http://138.197.8.69/chats/" + event.id), win.bind(fileURI), fail.bind(fileURI), options);
    }
}

var userData = null, userSuccessCallback, userSuccessText, userErrorText;
function capturePhotoUser(user, success, successText, errorText, _pictureSource) {
    userSuccessCallback = success;
    userData = user;
    userSuccessText = successText;
    userErrorText = errorText;
    navigator.camera.getPicture(onCapturePhotoUser, onFail, {
        sourceType: _pictureSource,
        quality: 50,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}

var eventData = null, eventSuccessCallback, eventSuccessText, eventErrorText;
function capturePhotoEvent(event, user, success, successText, errorText, _pictureSource) {
    console.log("Event Data");
    console.log(JSON.stringify(event));
    eventSuccessCallback = success;
    eventSuccessText = successText;
    eventErrorText = errorText;
    eventData = event;
    userData = user;
    navigator.camera.getPicture(onCapturePhotoEvent, onFail, {
        sourceType: _pictureSource,
        quality: 50,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}

function onFail(message) {
    console.log('Failed because: ' + message);
}
