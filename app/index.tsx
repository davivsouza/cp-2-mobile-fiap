// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { loginWithEmail } from "../services/auth";
import { AuthCardLayout } from "../components/AuthCardLayout";
import { PrimaryButton } from "../components/PrimaryButton";

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
    <AuthCardLayout
      title="Bem-vindo"
      subtitle="Entre com sua conta para continuar"
    >
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
        <PrimaryButton label="Entrar" onPress={handleLogin} />
        <Link href="/register" style={styles.registerLink}>
          Não tem conta? Cadastre-se
        </Link>
      </View>
    </AuthCardLayout>
  );
}

const styles = StyleSheet.create({
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
