import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type LocalNotificationParams = {
  title: string;
  body: string;
  seconds?: number;
  data?: Record<string, unknown>;
};

export async function requestNotificationPermissions() {
  const current = await Notifications.getPermissionsAsync();

  if (
    current.granted ||
    current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function setupNotifications() {
  const granted = await requestNotificationPermissions();
  if (!granted) return false;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2b5fab",
    });
  }

  return true;
}

export async function scheduleLocalNotification({
  title,
  body,
}: LocalNotificationParams) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}
