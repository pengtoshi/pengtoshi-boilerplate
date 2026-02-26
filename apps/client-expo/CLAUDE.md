# 모바일 디자인 시스템 사용 규칙 (apps/client-expo)

## RN 기본 컴포넌트 대체

### 텍스트

RN의 `Text`를 직접 사용하지 말고 `@libs/ui-mobile`의 `Text` 컴포넌트를 사용합니다.
이유: `text-14/body`, `text-16/body/emp` 등 tailwind 클래스에서 자동으로 폰트 weight를 매핑합니다.

❌ BAD:

```tsx
import { Text } from "react-native";
<Text style={{ fontWeight: "600", fontSize: 14 }}>내용</Text>
```

✅ GOOD:

```tsx
import { Text } from "@libs/ui-mobile";
<Text className="text-14/body/emp">내용</Text>
```

### 버튼/입력/스위치 등

RN의 `Pressable`, `TouchableOpacity`, `ActivityIndicator`, `TextInput`, `Switch`를 직접 조합하지 말고
`Button`, `TextField`, `TextArea`, `Switch`, `Checkbox`, `Radio` 등 `@libs/ui-mobile` 컴포넌트를 사용합니다.

### 아이콘

`lucide-react-native` 아이콘을 직접 렌더링하지 말고 `Icon` / `AnimatedColorIcon`을 사용합니다.
색상은 `className`이 아닌 `color` prop 또는 토큰 클래스로 지정합니다.

## 색상 전환 애니메이션

### tailwind가 직접 매핑되는 경우

`transition-colors duration-300` 클래스를 사용해 상태 전환 시 색상이 부드럽게 변경되도록 합니다.

### 아이콘처럼 tailwind로 색상 애니메이션이 안 되는 경우

`AnimatedColorIcon`을 사용합니다. `fromColor`/`toColor`를 디자인 토큰에 맞춰 지정하고, `duration`은 기본 300ms로 유지합니다.

❌ BAD:

```tsx
// active 여부에 따라 아이콘을 즉시 교체하여 깜빡이는 느낌
<Icon component={Heart} color={isActive ? "#FF4B8A" : "#6F6F6F"} />
```

✅ GOOD:

```tsx
<AnimatedColorIcon
  component={Heart}
  fromColor="#6F6F6F"
  toColor="#FF4B8A"
  active={isActive}
  duration={300}
/>
```

## 피드백 컴포넌트 (Toast / Modal / BottomSheet)

### Toast / Toaster

`sonner-native`를 직접 사용하지 않고 `libs/ui/mobile/src/lib/components/Feedback/Toaster/Toaster.tsx`가 노출하는
`Toaster`, `toast()` 헬퍼를 사용합니다.

- 앱/Storybook 루트 레이아웃에서만 `Toaster`를 렌더링하고, 각 화면 컴포넌트에서는 `toast()`만 호출합니다.
- `Toaster` 내부에서 `offset`을 하드코딩하지 않습니다. `useSafeAreaInsets()`로 상단 여백을 계산해 `offset={insets.top + 8}` 형태로 넘깁니다.

### Modal / BottomSheet

RN `Modal`이나 서드파티 바텀시트를 직접 조합하지 말고 `libs/ui/mobile/src/lib/components/Feedback` 하위의
`Modal`, `BottomSheet`를 사용합니다.

## Tailwind 스타일 작성 규칙 (모바일)

### 다크 모드를 별도 클래스로 중복 정의하지 않기

모바일에서는 RN 스타일 시스템 특성상 다크 모드 토큰을 따로 `dark:` prefix로 반복해서 작성하지 않습니다.
하나의 semantic 클래스만 사용하고, 토큰 정의(`mobile.preset.js`)에서 다크/라이트 모드를 처리합니다.

❌ BAD: `<Text className="text-label-normal dark:text-dark-label-normal">텍스트</Text>`
✅ GOOD: `<Text className="text-label-normal">텍스트</Text>`

### tailwind mobile preset 기반

새로운 모바일 컴포넌트의 클래스는 `mobile.preset.js`에 이미 존재하는 토큰을 사용합니다.
필요 시 새로운 semantic 토큰을 preset에 추가한 뒤, 컴포넌트에서는 그 토큰만 사용합니다.
