import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IaPopup from "../components/IaPopup"; // Ajuste se necessário

// Função auxiliar para pegar as iniciais do nome
function getUserInitials(name) {
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

// MOCKS
const MOCK_DESTAQUE = [
  {
    id: 1,
    logo: require("../assets/images/logoChatGPT.png"),
    title: "ChatGPT",
    category: "Texto",
    tags: ["Grátis", "Premium"],
    url: "https://chatgpt.com/",
  },
  {
    id: 2,
    logo: require("../assets/images/logoGitHubCopilot.png"),
    title: "GitHub Copilot",
    category: "Código",
    tags: ["Grátis", "Paga"],
    url: "https://github.com/copilot",
  },
];
const MOCK_CATEGORIAS = [
  { id: "texto", title: "Texto", count: 2 },
  { id: "imagem", title: "Imagem", count: 1 },
  { id: "codigo", title: "Código", count: 1 },
];
const MOCK_RECENTES = [
  {
    logo: require("../assets/images/logoClaude3.png"),
    title: "Claude 3",
    subtitle: "Anthropic",
    descricao:
      "Claude é uma IA desenvolvida pela Anthropic. Focada em gerar, resumir e compreender textos com segurança e ética. Ideal para quem busca soluções conversacionais avançadas e confiáveis para tarefas profissionais e conteúdo digital.",
    principaisUsos: ["Texto", "Pesquisa", "Programação"],
    precos: "Gratuito com limitações / R$90 por mês para uso ilimitado.",
    url: "https://claude.ai",
  },
];

// Todas as categorias para o modal "ver mais"
const todasCategorias = ["Texto", "Imagem", "Documentação", "Código"];

const menuOptions = [
  { label: "Início", icon: "🏠", link: "/inicio" },
  { label: "Descobrir", icon: "🔍", link: "/descobrir" },
  { label: "Favoritos", icon: "🤍", link: "/favorito" },
  { label: "Tutoriais", icon: "📖", link: "/tutorial" },
  { label: "Perfil", icon: "👤", link: "/perfil" },
];

export default function Inicio() {
  const [destaque, setDestaque] = useState(MOCK_DESTAQUE);
  const [categorias, setCategorias] = useState(MOCK_CATEGORIAS);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCategoriaVisible, setModalCategoriaVisible] = useState(false); // Estado do modal de categorias
  const [recentes, setRecentes] = useState(MOCK_RECENTES);

  const [iaPopupVisible, setIaPopupVisible] = useState(false);
  const [iaSelecionada, setIaSelecionada] = useState(null);
  const [iaPopupLoading, setIaPopupLoading] = useState(false);

  // Menu inferior
  const [menuIndex, setMenuIndex] = useState(0);

  const router = useRouter();

  const user = { name: "João Fernando" };

  /*
  // Backend futura
  const fetchIaDetails = async (iaId) => {
    setIaPopupLoading(true);
    setIaPopupVisible(true);
    try {
      const res = await fetch(`https://sua-api.com/ia/${iaId}`);
      const data = await res.json();
      setIaSelecionada(data);
    } catch (err) {
      setIaSelecionada(null);
    } finally {
      setIaPopupLoading(false);
    }
  };
  */

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Saudação e avatar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Olá, {user.name}!</Text>
            <Text style={styles.subtitle}>
              Que tipo de IA você está procurando hoje?
            </Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getUserInitials(user.name)}</Text>
          </View>
        </View>
        {/* Campo de busca */}
        <TouchableOpacity
          onPress={() => router.push("/descobrir")}
          activeOpacity={0.7}
        >
          <View style={styles.searchInput} pointerEvents="none">
            <Text style={styles.searchPlaceholder}>🔍 Buscar por IAS...</Text>
          </View>
        </TouchableOpacity>
        {/* IAs em Destaque */}
        <Text style={styles.sectionTitle}>IAs em Destaque</Text>
        {/* LISTA HORIZONTAL */}
        <FlatList
          horizontal
          data={destaque}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destaqueRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.iaCard}
              onPress={() => {
                setIaSelecionada({
                  logo: item.logo,
                  title: item.title,
                  subtitle:
                    item.category === "Texto" ? "OpenAI" : "GitHub e OpenAI",
                  descricao:
                    item.title === "ChatGPT"
                      ? "O ChatGPT é uma IA conversacional avançada desenvolvida pela OpenAI que pode ajudar em uma ampla variedade de tarefas. Desde escrever código até criar conteúdo, analisar dados ou simplesmente entreter em uma conversa, o ChatGPT é uma ferramenta versátil para qualquer profissional ou estudante."
                      : "O GitHub Copilot é um assistente de codificação feito para sugerir, explicar e gerar trechos completos de código para desenvolvedores. Ideal para programadores mais técnicos e pessoas que querem experimentar o poder da IA em tarefas profissionais.",
                  principaisUsos:
                    item.title === "ChatGPT"
                      ? ["Texto", "Programação", "Pesquisa", "Análise de Dados"]
                      : ["Código", "Documentação", "Programação"],
                  precos:
                    item.title === "ChatGPT"
                      ? "Gratuito com limitações / R$106 por mês para uso ilimitado."
                      : "Gratuito com limitações para estudantes / R$56 por mês para uso ilimitado do ChatGPT.",
                  url:
                    item.title === "ChatGPT"
                      ? "https://chatgpt.com/"
                      : "https://github.com/copilot",
                });
                setIaPopupLoading(false);
                setIaPopupVisible(true);
              }}
            >
              <Image
                source={item.logo}
                style={styles.iaLogoGrande}
                resizeMode="contain"
              />
              <Text style={styles.iaTitleBlue}>{item.title}</Text>
              <Text style={styles.iaCategory}>{item.category}</Text>
              <View style={styles.ratingRow}>
                {item.tags.map((tag) => (
                  <View
                    key={tag}
                    style={[styles.planBadge, styles.planBadgeBlue]}
                  >
                    <Text
                      style={[styles.planBadgeText, styles.planBadgeTextBlue]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriasSection}>
          <View style={styles.categoriasRow}>
            {categorias.slice(0, 2).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoriaCard}
                onPress={() => {
                  router.push({
                    pathname: "/descobrir",
                    params: { category: item.title }, // 🆕 Passa a categoria
                  });
                }}
              >
                <Text style={styles.categoriaTitle}>{item.title}</Text>
                <Text style={styles.categoriaCount}>
                  {item.count} IA{item.count > 1 ? "s" : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.verMaisRow}>
            <TouchableOpacity onPress={() => setModalCategoriaVisible(true)}>
              <Text style={styles.verMais}>Ver mais</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RECENTES */}
        <View style={styles.recentesContainer}>
          <Text style={styles.sectionTitle}>Adicionadas Recentemente</Text>

          <TouchableOpacity
            style={styles.recenteCard}
            activeOpacity={0.7}
            onPress={() => {
              setIaSelecionada({
                logo: recentes[0].logo,
                title: recentes[0].title,
                subtitle: recentes[0].subtitle,
                descricao: recentes[0].descricao,
                principaisUsos: recentes[0].principaisUsos,
                precos: recentes[0].precos,
                url: recentes[0].url,
              });
              setIaPopupLoading(false);
              setIaPopupVisible(true);
            }}
          >
            <Image
              source={require("../assets/images/logoClaude3.png")}
              style={styles.recenteLogo}
              resizeMode="contain"
            />
            <View style={styles.recenteInfo}>
              <Text style={styles.recenteTitle}>Claude 3</Text>
              <Text style={styles.recenteSubtitle}>
                IA conversacional avançada
              </Text>
              <View style={styles.recenteTagsRow}>
                <View style={[styles.recenteTag, styles.recenteTagTexto]}>
                  <Text style={styles.recenteTagText}>Texto</Text>
                </View>
                <View style={[styles.recenteTag, styles.recenteTagFreemium]}>
                  <Text style={styles.recenteTagText}>Freemium</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* IA PopUp */}
      <IaPopup
        visible={iaPopupVisible}
        iaInfo={iaSelecionada}
        loading={iaPopupLoading}
        onClose={() => setIaPopupVisible(false)}
      />

      {/* MODAL DE CATEGORIAS */}
      <Modal
        visible={modalCategoriaVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalCategoriaVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalCategoriaVisible(false)}
            >
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
            {todasCategorias.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.modalButton}
                onPress={() => {
                  setModalCategoriaVisible(false);
                  router.push({
                    pathname: "/descobrir",
                    params: { category: cat }, // 🆕 Passa a categoria
                  });
                }}
              >
                <Text style={styles.modalButtonText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* MENU INFERIOR FIXO */}
      <View style={styles.menuBar}>
        {menuOptions.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => {
              setMenuIndex(idx);
              router.push(item.link);
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.menuIcon,
                menuIndex === idx && styles.menuIconActive,
              ]}
            >
              {item.icon}
            </Text>
            <Text
              style={[
                styles.menuLabel,
                menuIndex === idx && styles.menuLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ====================== STYLES ======================
const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: 24,
    marginBottom: 68, // espaço para menu fixo
  },
  contentContainer: {
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  avatarCircle: {
    backgroundColor: "#0F2C5C",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 14,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#f3f6fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  categoriasSection: {
    marginBottom: 28,
  },
  categoriasRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: "14px",
  },
  verMaisRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  categoriaCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    minWidth: 120,
    minHeight: 80,
  },
  categoriaTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
    textAlign: "center",
  },
  categoriaCount: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  verMais: {
    color: "#23b2fa",
    fontSize: 17,
    fontWeight: "500",
    textDecorationLine: "underline",
    paddingRight: 6,
  },
  destaqueRow: {
    flexDirection: "row",
    marginBottom: 24,
    paddingRight: 10,
    gap: "14px",
  },
  iaCard: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 130,
  },
  iaLogoGrande: {
    width: 44,
    height: 44,
    marginBottom: 8,
  },
  iaTitleBlue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F2C5C",
    marginBottom: 4,
    textAlign: "center",
  },
  iaCategory: {
    fontSize: 15,
    color: "#888",
    marginBottom: 6,
    textAlign: "center",
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginHorizontal: 2,
    marginBottom: 3,
  },
  planBadgeBlue: {
    backgroundColor: "#e8f0fe",
  },
  planBadgeText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#2460ef",
  },
  planBadgeTextBlue: {
    color: "#2460ef",
  },
  menuBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 62,
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 2,
    zIndex: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    fontSize: 22,
    marginBottom: 0,
    color: "#343434",
  },
  menuIconActive: {
    color: "#29B6F6",
  },
  menuLabel: {
    fontSize: 13,
    color: "#343434",
    marginTop: 2,
  },
  menuLabelActive: {
    color: "#0F2C5C",
    fontWeight: "bold",
  },
  recentesContainer: {
    marginBottom: 24,
  },
  recenteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    padding: 18,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  recenteLogo: {
    width: 46,
    height: 46,
    marginRight: 14,
  },
  recenteInfo: {
    flex: 1,
    justifyContent: "center",
  },
  recenteTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  recenteSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  recenteTagsRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  recenteTag: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 11,
    marginRight: 6,
  },
  recenteTagTexto: {
    backgroundColor: "#1a237e",
  },
  recenteTagFreemium: {
    backgroundColor: "#40bff5",
  },
  recenteTagText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 250,
    padding: 18,
    alignItems: "stretch",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 11,
    top: 7,
    zIndex: 2,
    padding: 5,
  },
  modalButton: {
    backgroundColor: "#F7F7F7",
    paddingVertical: 13,
    marginVertical: 7,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  searchInput: {
    backgroundColor: "#f3f6fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#ebebeb",
    justifyContent: "center",
  },
  searchPlaceholder: {
    fontSize: 14,
    color: "#999",
  },
};
