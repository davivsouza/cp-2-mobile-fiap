import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type AuthCardLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthCardLayout({ title, subtitle, children }: AuthCardLayoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />

      <View style={styles.form}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#eaf2ff",
  },
  bgCircleTop: {
    position: "absolute",
    top: -70,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#cddfff",
  },
  bgCircleBottom: {
    position: "absolute",
    bottom: -90,
    left: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#dbe8ff",
  },
  form: {
    width: "100%",
    maxWidth: 360,
    gap: 12,
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d7e3f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#24324a",
  },
  subtitle: {
    fontSize: 14,
    color: "#4d607e",
    marginBottom: 4,
  },
});
