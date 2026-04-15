import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { registerWithEmail } from "../services/auth";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await registerWithEmail(email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso");
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />

      <View style={styles.form}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>

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
          <Button title="Criar conta" onPress={handleRegister} />
          <Link href="/" style={styles.loginLink}>
            Já tem conta? Entrar
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
  loginLink: {
    color: "#2b5fab",
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 6,
  },
});
