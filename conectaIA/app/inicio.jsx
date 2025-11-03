import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
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

// MOCKS E CONSTANTES ------------------------------------------------------------------------------------

// Dados mocks iniciais para o desenvolvimento imediato da interface
const MOCK_DESTAQUE = [
  {
    id: 1,
    title: "ChatGPT",
    category: "Texto",
    logo: require("../assets/images/logoChatGPT.png"),
    tags: ["Grátis"],
  },
  {
    id: 2,
    title: "GitHub Copilot",
    category: "Código",
    logo: require("../assets/images/logoGitHub.png"),
    tags: ["Grátis"],
  },
];

const MOCK_CATEGORIAS = [
  { id: 1, name: "Texto", total: 2 },
  { id: 2, name: "Imagem", total: 1 },
];

const MOCK_RECENTES = [
  {
    id: 3,
    title: "Claude 3",
    descricao: "IA conversacional avançada",
    tags: ["Texto", "Freemium"],
    logo: require("../assets/images/logoClaude3.png"),
  },
];

// Lista estática para modal de categorias
const todasCategorias = [
  "Texto",
  "Imagem",
  "Programação",
  "Produtividade"
];

// Itens do menu inferior fixo
const menuItems = [
  { label: "Início", icon: "home-outline", active: true },
  { label: "Descobrir", icon: "magnify", active: false },
  { label: "Favoritos", icon: "heart-outline", active: false },
  { label: "Tutoriais", icon: "book-outline", active: false },
  { label: "Perfil", icon: "account-outline", active: false },
];

// Utilitário para pegar as iniciais do nome do usuário
function getUserInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// COMPONENTE PRINCIPAL --------------------------------------------------------------------------

export default function Inicio() {
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para os dados que atualmente usam mocks, mas futuramente virão da API
  const [destaque, setDestaque] = useState(MOCK_DESTAQUE);
  const [categorias, setCategorias] = useState(MOCK_CATEGORIAS);
  const [recentes, setRecentes] = useState(MOCK_RECENTES);

  // useEffect para carregar dados da API quando disponível (codigo comentado)
  useEffect(() => {
    /*
    // Exemplo básico de fetch para cada recurso
    fetch('https://sua-api.com/destaques')
      .then(res => res.json())
      .then(data => setDestaque(data))
      .catch(console.error);
      
    fetch('https://sua-api.com/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(console.error);

    fetch('https://sua-api.com/recentes')
      .then(res => res.json())
      .then(data => setRecentes(data))
      .catch(console.error);
    */
  }, []);

  // Usuário exemplar para avatar e saudação
  const user = { name: "João Fernando" };

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
            <Text style={styles.avatarText}>
              {getUserInitials(user.name)}
            </Text>
          </View>
        </View>

        {/* Campo de busca */}
        <TextInput placeholder="Buscar IA..." style={styles.searchInput} />

        {/* IAs em Destaque */}
        <Text style={styles.sectionTitle}>IAs em Destaque</Text>
        <View style={styles.destaqueRow}>
          {destaque.map(item => (
            <View key={item.id} style={styles.iaCard}>
              <Image source={item.logo} style={styles.iaLogoGrande} resizeMode="contain" />
              <Text style={styles.iaTitleBlue}>{item.title}</Text>
              <Text style={styles.iaCategory}>{item.category}</Text>
              <View style={styles.ratingRow}>
                {item.tags.map(tag => (
                  <View key={tag} style={[styles.planBadge, styles.planBadgeBlue]}>
                    <Text style={[styles.planBadgeText, styles.planBadgeTextBlue]}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Categorias rápidas */}
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
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menu inferior fixo */}
      <View style={styles.menuBar}>
        <View style={styles.menuDivider} />
        {menuItems.map(item => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <MaterialCommunityIcons
              name={item.icon}
              size={28}
              color={item.active ? "#53A0FD" : "#222"}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuLabel, item.active ? styles.menuLabelActive : {}]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal categorias */}
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
            {todasCategorias.map(cat => (
              <TouchableOpacity
                key={cat}
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
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

// ESTILOS ---------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#fff" },
  container: { backgroundColor: "#fff", flex: 1 },
  contentContainer: { padding: 20, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#222" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 2 },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0F2C5C",
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

  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8, color: "#222" },

  destaqueRow: { flexDirection: "row", marginBottom: 18, gap: 18 },
  iaCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 11,
    padding: 11,
    borderWidth: 1,
    borderColor: "#ededed",
    alignItems: "center",
    minWidth: 145,
  },
  iaLogoGrande: { width: 43, height: 43, marginBottom: 2 },
  iaTitleBlue: { fontWeight: "bold", fontSize: 16, color: "#23398A", textAlign: "center" },
  iaCategory: { color: "#888", fontSize: 13, marginBottom: 3, textAlign: "center" },

  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 6, flexWrap: "nowrap", justifyContent: "center" },
  planBadge: { borderRadius: 8, paddingHorizontal: 8, height: 21, justifyContent: "center", alignItems: "center", marginRight: 4 },
  planBadgeBlue: { backgroundColor: "#DFEDFE" },
  planBadgeText: { fontSize: 12, fontWeight: "500", marginTop: 1 },
  planBadgeTextBlue: { color: "#23398A" },

  categoriaRow: { flexDirection: "row", alignItems: "center", marginBottom: 16, gap: 8 },
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
  categoriaTitle: { fontWeight: "bold", fontSize: 14, color: "#222" },
  categoriaQtd: { color: "#53A0FD", fontSize: 11, marginTop: 3 },

  verMais: { marginLeft: 6 },
  verMaisText: { color: "#53A0FD", fontSize: 13, fontWeight: "bold" },

  recentesRow: { marginBottom: 20 },
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
  recentesTitle: { fontWeight: "bold", fontSize: 15, color: "#222", marginBottom: 0 },
  recentesDescricao: { fontSize: 12, color: "#888", marginBottom: 2 },
  tag: { borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2, marginRight: 6, marginBottom: 0 },
  tagAzul: { backgroundColor: "#DFEDFE" },
  tagCinza: { backgroundColor: "#EBEBED" },
  tagText: { fontSize: 12, fontWeight: "500", color: "#222" },

  menuBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    height: 62,
    alignItems: "center",
    position: "relative",
    borderTopWidth: 0,
  },
  menuDivider: { position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: "#EAEBEF", width: "100%" },
  menuItem: { alignItems: "center", flex: 1, justifyContent: "flex-end", paddingTop: 10 },
  menuIcon: { marginBottom: 0 },
  menuLabel: { fontSize: 12, color: "#222", fontWeight: "bold", marginTop: 2 },
  menuLabelActive: { color: "#53A0FD" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.17)", justifyContent: "center", alignItems: "center" },
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
  modalClose: { position: "absolute", top: 9, right: 9, zIndex: 3, padding: 5 },
  modalButton: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 11,
    alignItems: "center",
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  modalButtonText: { fontWeight: "bold", fontSize: 15, color: "#222" },
});

