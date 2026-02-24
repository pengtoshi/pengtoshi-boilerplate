import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import type { AuthToken } from "@libs/model";
import { authCookieKey } from "../../core/client/auth-cookie-key";
import type { AuthTokenStorage } from "../../core/client/token-storage";

const getSecureStoreValue = async (key: string) => {
  try {
    const secureValue = await SecureStore.getItemAsync(key);
    if (secureValue !== null) {
      await AsyncStorage.setItem(key, secureValue);
      return secureValue;
    }
  } catch (_error) {
    // noop: falls back to AsyncStorage.
  }

  try {
    const fallbackValue = await AsyncStorage.getItem(key);
    return fallbackValue ?? undefined;
  } catch (_error) {
    return undefined;
  }
};

const setStoreValue = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (_error) {
    // noop: keep AsyncStorage as fallback.
  }

  try {
    await AsyncStorage.setItem(key, value);
  } catch (_error) {
    // noop
  }
};

const removeStoreValue = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (_error) {
    // noop: continue deleting fallback storage.
  }

  try {
    await AsyncStorage.removeItem(key);
  } catch (_error) {
    // noop
  }
};

export const createExpoTokenStorage = (): AuthTokenStorage => {
  return {
    getToken: async () => {
      const [accessToken, refreshToken] = await Promise.all([
        getSecureStoreValue(authCookieKey.accessToken),
        getSecureStoreValue(authCookieKey.refreshToken),
      ]);

      return { accessToken, refreshToken };
    },
    setToken: async (token: AuthToken) => {
      await Promise.all([
        setStoreValue(authCookieKey.accessToken, token.accessToken),
        setStoreValue(authCookieKey.refreshToken, token.refreshToken),
      ]);
    },
    removeToken: async () => {
      await Promise.all([removeStoreValue(authCookieKey.accessToken), removeStoreValue(authCookieKey.refreshToken)]);
    },
  };
};
