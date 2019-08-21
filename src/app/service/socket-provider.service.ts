import {environment} from '../../environments/environment';
import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';


export const stompConfig: InjectableRxStompConfig = {
  // Which server?
  webSocketFactory: () => {
    return new WebSocket(environment.webSocketUrl, []);
  },

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    // login: 'user',
    // passcode: '5b2298d0-ab71-4e13-8c8e-f7b771a0dfe8'
  },

  // How frequent is the heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds


  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnectDelay: 5000,

  // Will log diagnostics on console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
