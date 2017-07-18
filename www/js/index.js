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
var rr = 0;
        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = false;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = true;
     
     function didReceiveRemoteNotificationCallBack(jsonData) {   
      rr=1;
     var ref = cordova.InAppBrowser.open(jsonData.payload.additionalData.ssylka, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
    }

function didOpenRemoteNotificationCallBack(jsonData) {
rr=1;
    ref.close();
// Для Andori
var newdata = JSON.parse ( jsonData.notification.payload.additionalData );
alert(newdata.ssylka);
var ref = cordova.InAppBrowser.open(newdata.ssylka , '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
 //  Для Iphone
 //  var ref = cordova.InAppBrowser.open(jsonData.notification.payload.additionalData.ssylka, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
}
 

  


        window.plugins.OneSignal
          .startInit("82b9c889-5c3a-4526-abaf-271d6d269892")
          .handleNotificationReceived(didReceiveRemoteNotificationCallBack)
          .handleNotificationOpened(didOpenRemoteNotificationCallBack)
              .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
          .iOSSettings(iosSettings)
          .endInit();
     

window.plugins.OneSignal.getIds(function(ids) {
ipush = ids.userId;
    
    $.ajax({type: 'POST',url: 'http://mirada.kz/project_ksk/api/kskSpisok.php',
success: function(data){
kskObslDoma = JSON.parse(data);
 $.each(kskObslDoma, function(key1, data) {
	$('body').append(kskObslDoma[key1].name+'<br>');
	
});
},
error: function(XMLHttpRequest, textStatus, errorThrown){
}
});
    

});


     


    }
};


app.initialize();


function sendTag() {
var ref = cordova.InAppBrowser.open('http://top-star.kz/fr7/index.php' , '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
}

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
