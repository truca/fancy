/*setTimeout(function(){
  document.getElementById("uploadFile").addEventListener("click", uploadFile);
}, 1000);*/

function getPhoto() {
  // Retrieve image file location from specified source
  window.imagePicker.getPictures(
    function(results) {
        console.log('Image URI: ' + results[0]);

        var fileURL = results[0];
        var uri = encodeURI("http://138.197.8.69/upload");
        var options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
        options.mimeType = "text/plain";

        var headers = {'headerParam':'headerValue'};
        options.headers = headers;

        var ft = new FileTransfer();

        function onSuccess(r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);
        }

        function onError(error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
        }

        ft.upload(fileURL, uri, onSuccess, onError, options);

        return results;
    }, function (error) {
        console.log('Error: ' + error);
    }, {
        maximumImagesCount: 1,
        quality: 50
    }
  );
}

function uploadFile() {
  getPhoto();
}
