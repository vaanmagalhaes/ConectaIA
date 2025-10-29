import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Mock de dados
const user = { name: "João Fernando", avatar: null };
const destaque = [
  {
    id: 1,
    title: "ChatGPT",
    category: "Texto",
    stars: 5,
    isFavorito: true,
    logo: require("../assets/images/logoChatGPT.png"),
  },
  {
    id: 2,
    title: "GitHub Copilot",
    category: "Código",
    stars: 5,
    isFavorito: false,
    logo: require("../assets/images/logoGitHub.png"),
  },
];
const categorias = [
  { id: 1, name: "Texto", total: 2 },
  { id: 2, name: "Imagem", total: 1 },
];
const todasCategorias = [
  "Texto",
  "Imagem",
  "Programação",
  "Produtividade"
];

const recentes = [
  {
    id: 3,
    title: "Claude 3",
    descricao: "IA conversacional avançada",
    tags: ["Texto", "Freemium"],
    stars: 4.6,
    logo: require("../assets/images/logoClaude3.png"),
  },
];

// Emojis neutros/menu outline
const menuItems = [
  { label: "Início", emoji: "🏚️" },        // Casa neutra
  { label: "Descobrir", emoji: "🔎" },     // Lupa neutra
  { label: "Favoritos", emoji: "❤️" },     // Coração vazio
  { label: "Tutoriais", emoji: "📑" },     // Livro aberto
  { label: "Perfil", emoji: "👤" },        // Pessoa neutra
];

// Função para pegar iniciais do nome
function getUserInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Inicio() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Saudação e avatar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Olá, {user.name}!</Text>
            <Text style={styles.subtitle}>Que tipo de IA você está procurando hoje?</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getUserInitials(user.name)}</Text>
          </View>
        </View>

        {/* Campo de Busca */}
        <TextInput
          placeholder="Buscar IA..."
          style={styles.searchInput}
        />

        {/* IAs em Destaque */}
        <Text style={styles.sectionTitle}>IAs em Destaque</Text>
        <View style={styles.destaqueRow}>
          {destaque.map(item => (
            <View key={item.id} style={styles.iaCard}>
              <Image source={item.logo} style={styles.iaLogo} resizeMode="contain" />
              <Text style={styles.iaTitle}>{item.title}</Text>
              <Text style={styles.iaCategory}>{item.category}</Text>
              <Text style={styles.iaStars}>★ {item.stars.toFixed(1)}</Text>
              {item.isFavorito && (
                <Text style={styles.favoritoBadge}>Favorito</Text>
              )}
            </View>
          ))}
        </View>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriaRow}>
          {categorias.map(item => (
            <TouchableOpacity key={item.id} style={styles.categoriaCard}>
              <Text style={styles.categoriaTitle}>{item.name}</Text>
              <Text style={styles.categoriaQtd}>{item.total} IA{item.total > 1 ? "s" : ""}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.verMais} onPress={() => setModalVisible(true)}>
            <Text style={styles.verMaisText}>Ver mais</Text>
          </TouchableOpacity>
        </View>

        {/* Adicionadas Recentemente */}
        <Text style={styles.sectionTitle}>Adicionadas Recentemente</Text>
        <View style={styles.recentesRow}>
          {recentes.map(item => (
            <View key={item.id} style={styles.recentesCard}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={item.logo} style={styles.iaLogoGrande} resizeMode="contain" />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.recentesTitle}>{item.title}</Text>
                  <Text style={styles.recentesDescricao}>{item.descricao}</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {item.tags.map(tag => (
                      <View key={tag} style={[styles.tag, tag === "Texto" ? styles.tagAzul : styles.tagCinza]}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.starEmoji}>☆</Text>
                  <Text style={styles.iaStarsCinza}>{item.stars.toFixed(1)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menu fixo com emojis neutros */}
      <View style={styles.menuBar}>
        {menuItems.map(item => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Text style={styles.menuEmoji}>{item.emoji}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal de Categorias */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
            {todasCategorias.map((cat, idx) => (
              <TouchableOpacity
                key={cat}
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  // ação ao clicar na categoria
                }}
              >
                <Text style={styles.modalButtonText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#53A0FD",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    paddingHorizontal: 11,
    paddingVertical: 9,
    fontSize: 15,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  destaqueRow: {
    flexDirection: "row",
    marginBottom: 18,
    gap: 8,
  },
  iaCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 11,
    padding: 11,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 3.5,
    borderWidth: 1,
    borderColor: "#ededed",
    alignItems: "center",
  },
  iaLogo: {
    width: 38,
    height: 38,
    marginBottom: 6,
  },
  iaLogoGrande: {
    width: 45,
    height: 45,
    marginRight: 7,
  },
  iaTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
    textAlign: "center",
  },
  iaCategory: {
    color: "#666",
    fontSize: 13,
    marginBottom: 3,
    textAlign: "center",
  },
  iaStars: {
    color: "#F6B40F",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  iaStarsCinza: {
    color: "#888",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  starEmoji: {
    color: "#888",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: -3,
    alignSelf: "center",
  },
  favoritoBadge: {
    backgroundColor: "#53A0FD",
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 4,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 2,
  },
  categoriaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  categoriaCard: {
    backgroundColor: "#F5F6FA",
    borderRadius: 9,
    padding: 14,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eeeeee",
    marginRight: 3,
  },
  categoriaTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#222",
  },
  categoriaQtd: {
    color: "#53A0FD",
    fontSize: 11,
    marginTop: 3,
  },
  verMais: {
    marginLeft: 6,
  },
  verMaisText: {
    color: "#53A0FD",
    fontSize: 13,
    fontWeight: "bold",
  },
  recentesRow: {
    marginBottom: 20,
  },
  recentesCard: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E1E3E6",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  recentesTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
    marginBottom: 0,
  },
  recentesDescricao: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  tag: {
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 0,
  },
  tagAzul: {
    backgroundColor: "#DFEDFE",
  },
  tagCinza: {
    backgroundColor: "#EBEBED",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#222",
  },
  menuBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ededed",
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  menuItem: {
    alignItems: "center",
    flex: 1,
  },
  menuEmoji: {
    fontSize: 22,
    marginBottom: 0,
  },
  menuLabel: {
    fontSize: 12,
    color: "#222",
    fontWeight: "bold",
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.17)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 240,
    backgroundColor: "#F6F7F9",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "stretch",
    position: "relative",
  },
  modalClose: {
    position: "absolute",
    top: 9,
    right: 9,
    zIndex: 3,
    padding: 5,
  },
  modalButton: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 11,
    alignItems: "center",
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  modalButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
  },
});
