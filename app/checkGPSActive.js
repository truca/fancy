// Checks to see if GPS is enabled AND if the app is authorized
checkEnabled(successCallback){
    cordova.plugins.diagnostic.isLocationAvailable(
      (available) => { onSuccess(available, successCallback); },
      (error) => { goToSettings(error); }
    );
};

onSuccess(available, success) {
  if(available) { // do something 
    success();
  }else{
    goToSettings(available);
  }
}

// Output error to console
// Prompt user to enable GPS, on OK switch to phone settings
goToSettings(error) {
  console.log("error: ", error);
  if(window.confirm("You need to enable location settings to use the geolocation feature.")) {
    cordova.plugins.diagnostic.switchToSettings();
  }
};

//checkEnabled(); // Run check