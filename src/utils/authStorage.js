import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    const accessToken = AsyncStorage.getItem(
        `${this.namespace}:accessToken`,
    );

    return accessToken ? accessToken : [];
  }

  setAccessToken(accessToken) {
    AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken.accessToken)
    );
  }

  removeAccessToken() {
    AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;
