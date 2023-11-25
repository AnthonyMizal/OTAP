import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';

const echoInstance = new Echo({
  broadcaster: 'pusher',
  Pusher,
  key: 'c1e225993702dfc860e2', // set the key defined in your .env
  cluster: 'ap1',
  forceTLS: false,
  encrypted: false,
  wsHost: '192.168.18.43', // the host defined in your .env
  wssHost: '192.168.18.43', // the host defined in your .env
  wsPort: 6001, // or the port defined in your .env
  wssPort: 6001, // or the port defined in your .env

});

export default echoInstance;