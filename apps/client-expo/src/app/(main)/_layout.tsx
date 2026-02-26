import { Slot, usePathname, useRouter } from "expo-router";
import { Home, User } from "lucide-react-native";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNav, Icon } from "@libs/ui-mobile";
import type { BottomNavItem } from "@libs/ui-mobile";

const NAV_ITEMS: BottomNavItem[] = [
  { key: "home", label: "홈", icon: <Icon component={Home} size={24} /> },
  { key: "profile", label: "프로필", icon: <Icon component={User} size={24} /> },
];

const MainLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const activeKey = pathname.includes("profile") ? "profile" : "home";

  const handleNavChange = (key: string) => {
    if (key === "home") router.replace("/(main)");
    else router.replace(`/(main)/${key}`);
  };

  return (
    <View className="bg-background-normal flex-1">
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
      <BottomNav
        items={NAV_ITEMS}
        activeKey={activeKey}
        onChange={handleNavChange}
        contentContainerStyle={{ paddingBottom: insets.bottom + 4 }}
      />
    </View>
  );
};

export default MainLayout;
