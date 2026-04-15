import { Stack } from "expo-router";
import { useEffect } from "react";
import { setupNotifications } from "../services/notifications";

export default function RootLayout() {
  useEffect(() => {
    setupNotifications();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
