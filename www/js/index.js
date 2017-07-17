/**
 * Modified MIT License
 *
 * Copyright 2017 OneSignal
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * 2. All copies of substantial portions of the Software may only be used in connection
 * with services provided by OneSignal.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
rr=0;
        // OneSignal Initialization
        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
        // Set your iOS Settings
        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = false;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = true;

        window.plugins.OneSignal
          .startInit("82b9c889-5c3a-4526-abaf-271d6d269892")
          .handleNotificationReceived(didReceiveRemoteNotificationCallBack)
          .handleNotificationOpened(function(jsonData) {
rr=1;
alert('1Закрыто'+ rr);
var ref = cordova.InAppBrowser.open(jsonData.payload.additionalData.ssylka, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
  })
              .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
          .iOSSettings(iosSettings)
          .endInit();
     
     if(rr=='0'){
window.plugins.OneSignal.getIds(function(ids) {
ipush = ids.userId;
var ref = cordova.InAppBrowser.open('http://mirada.kz/test/index.php?ipush='+ipush, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
    });
     }
        
        //Call syncHashedEmail anywhere in your app if you have the user's email.
        //This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
        //window.plugins.OneSignal.syncHashedEmail(userEmail);
    }
};

function registerForPushNotification() {
    console.log("Register button pressed");
    window.plugins.OneSignal.registerForPushNotifications();
    // Only works if user previously subscribed and you used setSubscription(false) below
    window.plugins.OneSignal.setSubscription(true);
}

function getIds() {
    window.plugins.OneSignal.getIds(function(ids) {
        document.getElementById("OneSignalUserId").innerHTML = "UserId: " + ids.userId;
        document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
        console.log('getIds: ' + JSON.stringify(ids));
        alert("userId = " + ids.userId + "\npushToken = " + ids.pushToken);
    });
}

function sendTags() {
    window.plugins.OneSignal.sendTags({PhoneGapKey: "PhoneGapValue", key2: "value2"});
    alert("Tags Sent");
}

function getTags() {
    window.plugins.OneSignal.getTags(function(tags) {
        alert('Tags Received: ' + JSON.stringify(tags));
    });
}

function deleteTags() {
    window.plugins.OneSignal.deleteTags(["PhoneGapKey", "key2"]);
    alert("Tags deleted");
}

function promptLocation() {
    window.plugins.OneSignal.promptLocation();
    // iOS - add CoreLocation.framework and add to plist: NSLocationUsageDescription and NSLocationWhenInUseUsageDescription
    // android - add one of the following Android Permissions:
    // <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    // <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
}

function syncHashedEmail() {
    window.plugins.OneSignal.syncHashedEmail("example@google.com");
    alert("Email synced");
}

function postNotification() {
    window.plugins.OneSignal.getIds(function(ids) {
        var notificationObj = { contents: {en: "message body"},
                          include_player_ids: [ids.userId]};
        window.plugins.OneSignal.postNotification(notificationObj,
            function(successResponse) {
                console.log("Notification Post Success:", successResponse);
            },
            function (failedResponse) {
                console.log("Notification Post Failed: ", failedResponse);
                alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
            }
        );
    });
}

function setSubscription() {
    window.plugins.OneSignal.setSubscription(false);
}

function didReceiveRemoteNotificationCallBack(jsonData) {   
     var ref = cordova.InAppBrowser.open(jsonData.payload.additionalData.ssylka, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
    }

function didOpenRemoteNotificationCallBack (jsonData) {
 rr=1;
 alert('Закрыто'+ rr);
// var newdata = JSON.parse ( jsonData.notification.payload.additionalData ); //
     var ref = cordova.InAppBrowser.open(jsonData.payload.additionalData.ssylka, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
    }

app.initialize();




// // Add to index.js or the first page that loads with your app.
// // For Intel XDK and please add this to your app.js.

// document.addEventListener('deviceready', function () {
//   // Enable to debug issues.
//   // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
//   var notificationOpenedCallback = function(jsonData) {
//     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//   };

//   window.plugins.OneSignal
//           .startInit("d368162e-7c4e-48b0-bc7c-b82ba80d4981")
//           .handleNotificationReceived(function(jsonData) {
//             alert("Notification received: \n" + JSON.stringify(jsonData));
//             console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
//           })
//           .handleNotificationOpened(function(jsonData) {
//             alert("Notification opened: \n" + JSON.stringify(jsonData));
//             console.log('didOpenRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
//           })
//           .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.InAppAlert)
//           .iOSSettings(iosSettings)
//           .endInit();
  
//   // Call syncHashedEmail anywhere in your app if you have the user's email.
//   // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
//   // window.plugins.OneSignal.syncHashedEmail(userEmail);
// }, false);
