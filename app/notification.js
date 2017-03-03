/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//var axios = require('axios');
var interval = null;

function getLS(itemName){
  return localStorage.getItem(itemName);
}
function print(message){
  if(!navigator) alert("Navigator doesnt exist");
  if(!navigator.notification) alert("Notification doesnt exist");
  if(!navigator.notification.alert) alert("Alert doesnt exist");

  navigator.notification.alert(
      JSON.stringify(message),         // message
      null,                 // callback
      "Alert",           // title
      'Ok'                  // buttonName
  );
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    toast: function(msg){
      if (window.plugins) {
        window.plugins.toast.show(msg, 'long', 'bottom');
      }
      else{
        alert(msg);
      }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //alert("bind");
        try{
            document.addEventListener('deviceready', app.onDeviceReady, false);
        }catch(e){
          alert("error bind" + JSON.stringify(e));
        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        console.log("DEVICE TERRILE REDY");

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //alert("Received event");

        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        //
        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        // alert('Received Event: ' + id);
        //alert('Received Event: ' + id);

        //if(!getLS("fcmToken") || !getLS("userID")){
        interval = setInterval(function(){
          FCMPlugin.getToken(
            function(token){
              //alert("Token: "+token);
              //print("Token: "+token);
              if(token){
                localStorage.setItem("clanapp_user_token", token);
                //alert(JSON.stringify(token));
                console.log(token);
                //window.fcmToken = token;
                //window.userID = "perro";
                console.log("sendToken undefined: " + typeof sendToken);
                clearInterval(interval);
              }
            },
            function(err){
              alert('error retrieving token: ' + err);
              print('error retrieving token: ' + err);
            }
          )
        }, 500);
        // }else{
        //   sendToken();
        // }


        //FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
        //All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
        //Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
        //FCMPlugin.subscribeToTopic('topicExample');

        //FCMPlugin.unsubscribeFromTopic( topic, successCallback(msg), errorCallback(err) );
        //FCMPlugin.unsubscribeFromTopic('topicExample');

        //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //Here you define your application behaviour based on the notification data.
        FCMPlugin.onNotification(
          function(data){
            console.log("DATA:" + JSON.stringify(data));
            if(data.wasTapped){
              //Notification was received on device tray and tapped by the user.
              //alert( JSON.stringify(data) );
              try{
                notification(data);
                //app.toast(data.aps.alert.body);
              }catch(error){
                console.log("Notification Error: " + JSON.stringify(error));
              }

            }else{
              //Notification was received in foreground. Maybe the user needs to be notified.
              //alert( JSON.stringify(data) );
              try{
                notification(data);
                //app.toast(data.aps.alert.body);
              }catch(error){
                console.log("Notification Error: " + JSON.stringify(error));
              }
            }
          },
          function(msg){
            console.log('onNotification callback successfully registered: ' + msg);
          },
          function(err){
            console.log('Error registering onNotification callback: ' + err);
          }
        );
    }
};

function sendToken(){
  console.log("inside send token");
  //alert("inside send token");

  // alert("Axios " + JSON.stringify(axios))
  // alert("Axios " + JSON.stringify(window.axios))

  /*try {
    //alert("sendToken");
    //alert("sending token");
    //var fcmToken = window.fcmToken, userID = window.userID;
    var fcmToken = getLS("fcmToken"), userID = getLS("userID");

    // alert("Axios " + JSON.stringify(axios))
    // alert("Axios " + JSON.stringify(window.axios))
    // if(!axios){
    //   alert("Axios doesnt exist");
    //   return
    // }if(!axios.post){
    //   alert("Axios Post doesnt exist");
    //   return
    // }

    if( fcmToken && userID ){
      //axios.post('http://192.168.1.38:3000/register', { fcmToken, userID })
      axios.post('http://192.168.2.188:3000/register', { fcmToken, userID })
        .then(function (response) {
          //alert(JSON.stringify(response))
          console.log(JSON.stringify(response))

          clearInterval(interval);
          //print(response);
          //app.toast(JSON.stringify(response))
        })
        .catch(function (error) {
          //alert(JSON.stringify(error))
          console.log(JSON.stringify(error))
          //print(error);
          //app.toast(JSON.stringify(error))
        });
      //alert("REACHED THIS POINT, OMG");
      //U.sendToken({ fcmToken, userID });

      return true
    }else{
      return false;
    }

    return
  }catch (e) {
     alert("Send" + JSON.stringify(e));
     console.log("Send" + JSON.stringify(e));
  }*/
}

function notification(data){
  console.log("inside notification");
  console.log(JSON.stringify(data));

  if(!navigator){
    console.log("Navigator doesnt exist");
    alert("Navigator doesnt exist");
  }
  console.log("Navigator exist");
  if(!navigator.notification){
    console.log("Navigator Notification doesnt exist");
    alert("Navigator Notification doesnt exist");
  }
  console.log("Navigator Notification exist");
  if(!navigator.notification.alert){
    console.log("Navigator Notification Alert doesnt exist");
    alert("Navigator Notification Alert doesnt exist");
  }
  console.log("Navigator Notification Alert exist");

  navigator.notification.alert(
      data.message,         // message
      function(res){
        if(push) push("/chats/"+data.chat_id);
      }.bind(data),                 // callback
      data.title,           // title
      "Ir"                  // buttonName
  );
  console.log("After Alert");
}

app.initialize();
