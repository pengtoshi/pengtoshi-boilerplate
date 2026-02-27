import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import type { AuthToken } from "@libs/model";
import { authCookieKey } from "../../core/client/auth-cookie-key";
import type { AuthTokenStorage } from "../../core/client/token-storage";

const isWeb = Platform.OS === "web";

const getWebStoreValue = (key: string) => {
  try {
    return globalThis.localStorage?.getItem(key) ?? undefined;
  } catch (_error) {
    return undefined;
  }
};

const setWebStoreValue = (key: string, value: string) => {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch (_error) {
    // noop
  }
};

const removeWebStoreValue = (key: string) => {
  try {
    globalThis.localStorage?.removeItem(key);
  } catch (_error) {
    // noop
  }
};

const getSecureStoreValue = async (key: string) => {
  if (isWeb) return getWebStoreValue(key);

  try {
    const secureValue = await SecureStore.getItemAsync(key);
    return secureValue ?? undefined;
  } catch (_error) {
    return undefined;
  }
};

const setStoreValue = async (key: string, value: string) => {
  if (isWeb) {
    setWebStoreValue(key, value);
    return;
  }

  try {
    await SecureStore.setItemAsync(key, value);
  } catch (_error) {
    // noop
  }
};

const removeStoreValue = async (key: string) => {
  if (isWeb) {
    removeWebStoreValue(key);
    return;
  }

  try {
    await SecureStore.deleteItemAsync(key);
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
