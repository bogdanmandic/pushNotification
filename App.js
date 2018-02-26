import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ToastAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';





export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      time: '',
    };
  }

  /*
  componentWillMount() {
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        console.log(token);
      },
    
      onNotification: (notification) => {
        console.log(notification);
        setTimeout(() => {
          if (!notification['foreground']) {
            ToastAndroid.show("You've clicked!", ToastAndroid.SHORT);
          }
        }, 1);
        PushNotification.localNotificationSchedule({
          title: notification['title'],
          message: notification['name'], // required
          date: new Date(Date.now()) // in 60 secs
        });
      },
    
      // Android only: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: '1024587262143',
    });
  }
  */
  componentWillMount() {
    this.setState({
      notification: undefined
    });
    PushNotification.configure({
      onRegister: function (token) {
        console.log('register', token);
      },
      onNotification: this.onNotificationReceived,
      
      senderID: '1024587262143',
    });
  }

  onNotificationReceived = (notification) => {
    console.log(notification);
    this.setState({
      title: notification.title,
      message: notification.message,
      time: Date.now()
    });
    
    PushNotification.localNotificationSchedule({
      title: notification['title'],
      message: notification['message'], // required
      date: new Date(Date.now()) // in 60 secs
    });
  }

  
  render() {
    const { title, message, time } = this.state;
    console.log('Radi')
    return (
      <View style={styles.container}>
        <Text>NOTIFICATION</Text>
        <Text style={{ fontSize: 24, color: 'red' }}>{title}</Text>
        <Text style={{ fontSize: 20, color: 'blue' }}>{message}</Text>
        <Text>{time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
