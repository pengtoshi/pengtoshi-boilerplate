import { Home, Search, User } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { BottomNav, BottomNavBadgeDot, Icon, Text } from "@libs/ui-mobile";

const Index = () => {
  const [activeKey, setActiveKey] = useState<"home" | "search" | "profile">("home");

  return (
    <View className="flex-1 bg-background-strong">
      <View className="flex-1 items-center justify-center px-6">
        {activeKey === "home" && (
          <View className="items-center">
            <Text className="text-24/heading text-primary-normal">Home 탭</Text>
            <Text className="mt-3 text-center text-14/body text-label-normal">
              하단 BottomNav에서 다른 탭을 눌러보세요.
            </Text>
          </View>
        )}

        {activeKey === "search" && (
          <View className="items-center">
            <Text className="text-24/heading text-primary-normal">Search 탭</Text>
            <Text className="mt-3 text-center text-14/body text-label-normal">
              나중에 검색 화면이 들어갈 위치입니다.
            </Text>
          </View>
        )}

        {activeKey === "profile" && (
          <View className="items-center">
            <Text className="text-24/heading text-primary-normal">Profile 탭</Text>
            <Text className="mt-3 text-center text-14/body text-label-normal">
              마이 페이지/프로필 화면이 들어갈 위치입니다.
            </Text>
          </View>
        )}
      </View>

      <BottomNav
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key as typeof activeKey)}
        items={[
          { key: "home", icon: <Icon component={Home} size={24} />, label: "Home" },
          { key: "search", icon: <Icon component={Search} size={24} />, label: "Search" },
          {
            key: "profile",
            icon: <Icon component={User} size={24} />,
            label: "Profile",
            badge: <BottomNavBadgeDot />,
          },
        ]}
      />
    </View>
  );
};

export default Index;
