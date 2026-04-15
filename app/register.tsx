import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { registerWithEmail } from "../services/auth";
import { AuthCardLayout } from "../components/AuthCardLayout";
import { PrimaryButton } from "../components/PrimaryButton";
import { isValidEmail } from "../utils/validators";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha nome, e-mail e senha para criar a conta.",
      );
      return;
    }

    if (!isValidEmail(email.trim())) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido para continuar.");
      return;
    }

    if (password.trim().length < 6) {
      Alert.alert("Senha inválida", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      await registerWithEmail(email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso");
    } catch (error: any) {
      if (error?.code === "auth/email-already-in-use") {
        Alert.alert("Erro ao cadastrar", "Este e-mail já está em uso.");
        return;
      }

      Alert.alert("Erro ao cadastrar", error?.message || "Não foi possível criar a conta.");
    }
  }

  return (
    <AuthCardLayout
      title="Criar conta"
      subtitle="Preencha os dados para se cadastrar"
    >
      <TextInput
        placeholder="Digite seu nome"
        placeholderTextColor="#7b8aa0"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor="#7b8aa0"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor="#7b8aa0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.actions}>
        <PrimaryButton label="Criar conta" onPress={handleRegister} />
        <Link href="/" style={styles.loginLink}>
          Já tem conta? Entrar
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
  loginLink: {
    color: "#2b5fab",
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 6,
  },
});
