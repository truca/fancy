function clearCache() {
    navigator.camera.cleanup();
}

var retries = 0;
function onCapturePhotoUser(fileURI) {
    var win = function (r) {
      console.log("WIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(r));
      userSuccessCallback(r);
      clearCache();
      retries = 0;
      alert('Imagen subida correctamente');
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
          alert('Ups. Something wrong happens!' + JSON.stringify(error));
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
    ft.upload(fileURI, encodeURI("http://138.197.8.69/users/" + userData.id), win, fail, options);
}

var imageData = null;
function onCapturePhotoEvent(fileURI) {
  if(Object.keys(eventData).length == 0){
    imageData = fileURI;
  }else{
    var win = function (r) {
      console.log("WIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(r));
      eventSuccessCallback(r);
      clearCache();
      retries = 0;
      alert('Imagen subida correctamente!');
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
          alert('Hubo un error subiendo la imagen' + JSON.stringify(error));
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
    ft.upload(fileURI, encodeURI("http://138.197.8.69/chats/" + eventData.id), win, fail, options);
  }
}

function uploadSavedImage(event, user) {
    console.log("Uploading image after creating event");
    var win = function (r) {
      console.log("WIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(r));
      clearCache();
      retries = 0;
      alert('Imagen subida correctamente!');
    }

    var fail = function (error) {
      console.log("FAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(JSON.stringify(error));
      if (retries == 0) {
          retries ++
          setTimeout(function() {
              uploadSavedImage(event, user)
          }, 1000)
      } else {
          retries = 0;
          clearCache();
          alert('Hubo un error subiendo la imagen' + JSON.stringify(error));
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
    ft.upload(imageData, encodeURI("http://138.197.8.69/chats/" + event.id), win, fail, options);
}

var userData = null, userSuccessCallback;
function capturePhotoUser(user, success) {
    userSuccessCallback = success;
    userData = user;
    navigator.camera.getPicture(onCapturePhotoUser, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI
    });
}

var eventData = null, eventSuccessCallback;
function capturePhotoEvent(event, user, success) {
    console.log("Event Data");
    console.log(JSON.stringify(event));
    eventSuccessCallback = success;
    eventData = event;
    userData = user;
    navigator.camera.getPicture(onCapturePhotoEvent, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI
    });
}

function onFail(message) {
    alert('Failed because: ' + message);
}
