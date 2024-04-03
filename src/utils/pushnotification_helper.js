import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    await GetFCMToke()
  }
}

async function GetFCMToke() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if(!fcmtoken) {
        try {
            let fcmtoken = await messaging().getToken();
            console.log(fcmtoken)
            if(fcmtoken){
                AsyncStorage.setItem('fcmtoken', fcmtoken);
            }
            else{
                // console.log(fcmtoken)
            }
        } catch (error) {
            console.log(error, "error in fcmtoken")
        }
    }
    // console.log(fcmtoken)
}

export const NotificationListner = ()=> {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background: ',
        remoteMessage.notification)
    })

    messaging().getInitialNotification().then(remoteMessage => {
        if(remoteMessage){
            console.log('Notification caused app to open from quit state: ',
            remoteMessage.notification)
        }
    });

    messaging().onMessage(async remoteMessage => {
        console.log("Notification on foreground state...", remoteMessage.notification)
    })
}