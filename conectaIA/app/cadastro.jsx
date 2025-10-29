import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const API_URL = "https://backend-conectaai.com/api/auth/register";

export default function Cadastro() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async () => {
    // Validações
    if (!nomeCompleto.trim()) {
      Alert.alert("Atenção", "Por favor, informe seu nome completo.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Atenção", "Por favor, informe seu e-mail.");
      return;
    }

    if (!senha.trim()) {
      Alert.alert("Atenção", "Por favor, informe sua senha.");
      return;
    }

    if (!confirmarSenha.trim()) {
      Alert.alert("Atenção", "Por favor, confirme sua senha.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_nome: nomeCompleto,
          usuario_email: email,
          usuario_senha: senha,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Não foi possível criar a conta.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      Alert.alert("Sucesso!", "Conta criada com sucesso. Faça login para continuar.", [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]);
    } catch (err) {
      Alert.alert("Erro", "Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background_tela_login.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Criar conta</Text>

            <TextInput
              placeholder="Nome Completo"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              style={styles.input}
              autoCapitalize="words"
              editable={!loading}
            />

            <TextInput
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              editable={!loading}
            />

            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
              editable={!loading}
            />

            <TextInput
              placeholder="Confirme sua senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              style={styles.input}
              editable={!loading}
            />

            <PrimaryButton
              title={loading ? "Criando conta..." : "Criar conta"}
              onPress={handleCadastro}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Já possui uma conta? </Text>
              <TouchableOpacity 
                onPress={() => router.push("/login")} 
                disabled={loading}
              >
                <Text style={styles.linkButton}>Fazer login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    maxWidth: 400,
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#000000",
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    alignItems: "center",
  },
  linkText: {
    color: "#666666",
    fontSize: 14,
  },
  linkButton: {
    color: "#53A0FD",
    fontWeight: "600",
    fontSize: 14,
  },
});
