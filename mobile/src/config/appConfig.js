export const serverIP = '192.168.16.101';
export const serverPort = '3333';

const appConfig = {
  reactotronHost: serverIP, // configure({ host: appConfig.reactotronHost })
  apiBaseURL: `http://${serverIP}:${serverPort}`,
};

export default appConfig;
