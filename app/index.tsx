// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { loginWithEmail } from "../services/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await loginWithEmail(email, password);
      router.replace("/alunos");
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />

      <View style={styles.form}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Entre com sua conta para continuar</Text>

        <TextInput
          placeholder="Digite seu e-mail"
          placeholderTextColor="#7b8aa0"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#7b8aa0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <View style={styles.actions}>
          <Button title="Entrar" onPress={handleLogin} />
          <Link href="/register" style={styles.registerLink}>
            Não tem conta? Cadastre-se
          </Link>
        </View>
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
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    borderColor: "#c7d6ee",
    backgroundColor: "#f8fbff",
  },
  actions: {
    gap: 8,
    marginTop: 4,
    alignItems: "center",
  },
  registerLink: {
    color: "#2b5fab",
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 6,
  },
});
