import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

// URL da API de login
const API_URL = "https://backend-conectaai.com/api/auth/login";

// COMPONENTE PRINCIPAL ------------------------------------------------------------------------------
export default function Login() {
  // Estados controlando formulário e tela
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // controla estado de loading do botão
  const router = useRouter();

  // Função de login (com fetch comentado para integração futura)
  const handleLogin = async () => {
    router.push("/inicio");
    // setLoading(true);
    // try {
    //   const response = await fetch(API_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     Alert.alert("Erro", errorData.message || "Não foi possível efetuar o login.");
    //     setLoading(false);
    //     return;
    //   }
    //   const data = await response.json();
    //   Alert.alert("Bem-vindo!");
    // } catch (err) {
    //   Alert.alert("Erro", "Erro de conexão. Tente novamente.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    // --- Fundo da tela (imagem de background)
    <ImageBackground
      source={require("../assets/images/background_tela_login.jpg")}
      style={styles.background}
    >
      {/* Container principal do card de login */}
      <View style={styles.container}>
        {/* Logo centralizada no topo */}
        <Image
          source={require("../assets/images/logo.jpg")}
          style={styles.logo}
        />
        <Text style={styles.titulo}>Entrar</Text>
        
        {/* Campo de E-mail */}
        <TextInput
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        
        {/* Campo de Senha */}
        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        
        {/* Botão principal */}
        <PrimaryButton
          title={loading ? "Entrando..." : "Entrar"}
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
        
        {/* Link para a tela de cadastro */}
        <View style={styles.links}>
          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={styles.linkText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// ESTILOS --------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    marginHorizontal: 20,
    marginTop: 250,
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  linkText: {
    color: "#53A0FD",
  },
});
