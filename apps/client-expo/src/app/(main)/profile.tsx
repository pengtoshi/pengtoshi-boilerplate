import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { createExpoTokenStorage, useLazyFindUser, useSignOut } from "@libs/graphql-mobile";
import { Button, Text } from "@libs/ui-mobile";

const ProfileScreen = () => {
  const router = useRouter();
  const [findUser, { data, loading }] = useLazyFindUser();
  const [signOutMutation] = useSignOut();

  useEffect(() => {
    findUser({ fetchPolicy: "network-only" }).catch(() => undefined);
  }, [findUser]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOutMutation();
    } catch {
      // noop: local token removal is always executed.
    }
    await createExpoTokenStorage().removeToken();
    router.replace("/login");
  }, [router, signOutMutation]);

  const user = data?.findUser;

  return (
    <View className="bg-background-normal flex-1 px-6 py-10">
      {/* TODO: Add your profile content here */}
      {user ? (
        <View className="mb-8 gap-1">
          <Text className="text-16/body/emp text-label-normal">{user.email ?? "이메일 없음"}</Text>
          <Text className="text-13/body text-label-alternative">{user.id}</Text>
        </View>
      ) : null}

      <Button
        size="large"
        variant="outlinedAssertive"
        onPress={() => handleSignOut().catch(() => undefined)}
        disabled={loading}
      >
        로그아웃
      </Button>
    </View>
  );
};

export default ProfileScreen;
