import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IaPopup from "../components/IaPopup";

// MOCK de IAs para a listagem
const MOCK_IAS_DESCOBRIR = [
  {
    id: 1,
    logo: require("../assets/images/logoChatGPT.png"),
    title: "ChatGPT",
    subtitle: "IA conversacional para textos, códigos e ideias",
    category: ["Texto", "Código", "Pesquisa"],
    preco: "Freemium",
    tags: ["Conversacional"],
    url: "https://chatgpt.com/",
  },
  {
    id: 2,
    logo: require("../assets/images/logoClaude3.png"),
    title: "Claude 3",
    subtitle: "IA focada em gerar, resumir e compreender textos com segurança e ética",
    category: ["Texto", "Código"],
    preco: "Freemium",
    tags: ["Conversacional"],
    url: "https://claude.ai",
  },
  {
    id: 3,
    logo: require("../assets/images/logoGitHubCopilot.png"),
    title: "GitHub Copilot",
    subtitle: "Assistente de código inteligente",
    category: ["Código"],
    preco: "Premium",
    tags: ["Programação"],
    url: "https://github.com/copilot",
  },
];

// Categorias para os chips
const CATEGORIAS_CHIPS = [
  "Todos",
  "Texto",
  "Imagem",
  "Código",
  "Vídeo",
  "Áudio",
];

export default function Descobrir() {
  const params = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [iasFiltradas, setIasFiltradas] = useState(MOCK_IAS_DESCOBRIR);

  // Estados do modal de filtro
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);
  const [filtrosCategorias, setFiltrosCategorias] = useState([]);
  const [filtrosPrecos, setFiltrosPrecos] = useState([]);

  // Estados do popup de IA
  const [iaPopupVisible, setIaPopupVisible] = useState(false);
  const [iaSelecionada, setIaSelecionada] = useState(null);
  const [iaPopupLoading, setIaPopupLoading] = useState(false);

  // Função para alternar seleção de categoria
  function toggleFiltroCategoria(categoria) {
    if (filtrosCategorias.includes(categoria)) {
      setFiltrosCategorias(filtrosCategorias.filter((c) => c !== categoria));
    } else {
      setFiltrosCategorias([...filtrosCategorias, categoria]);
    }
  }

  // Função para alternar seleção de preço
  function toggleFiltroPreco(preco) {
    if (filtrosPrecos.includes(preco)) {
      setFiltrosPrecos(filtrosPrecos.filter((p) => p !== preco));
    } else {
      setFiltrosPrecos([...filtrosPrecos, preco]);
    }
  }

  // Aplicar filtros do modal
  const aplicarFiltros = () => {
    if (filtrosCategorias.length === 1) {
      setSelectedCategory(filtrosCategorias[0]); // Chip fica igual à única categoria escolhida
    } else {
      setSelectedCategory("Todos"); // Chip mostra "Todos" quando múltiplas categorias
    }
    let filtered = MOCK_IAS_DESCOBRIR;
    if (filtrosCategorias.length > 0) {
      filtered = filtered.filter((ia) =>
        ia.category.some((cat) => filtrosCategorias.includes(cat))
      );
    }
    if (filtrosPrecos.length > 0) {
      filtered = filtered.filter((ia) => filtrosPrecos.includes(ia.preco));
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (ia) =>
          ia.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ia.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setIasFiltradas(filtered);
    setModalFiltrosVisible(false);
  };


  // Limpar filtros do modal
  const limparFiltros = () => {
    setFiltrosCategorias([]);
    setFiltrosPrecos([]);
    setIasFiltradas(MOCK_IAS_DESCOBRIR);
    setModalFiltrosVisible(false);
  };

  // Filtrar ao buscar
  const handleSearch = (text) => {
    setSearchQuery(text);
    let filtered = MOCK_IAS_DESCOBRIR;
    if (filtrosCategorias.length > 0) {
      filtered = filtered.filter((ia) =>
        ia.category.some((cat) => filtrosCategorias.includes(cat))
      );
    }
    if (filtrosPrecos.length > 0) {
      filtered = filtered.filter((ia) => filtrosPrecos.includes(ia.preco));
    }
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((ia) =>
        ia.category.includes(selectedCategory)
      );
    }
    if (text.trim() !== "") {
      filtered = filtered.filter(
        (ia) =>
          ia.title.toLowerCase().includes(text.toLowerCase()) ||
          ia.subtitle.toLowerCase().includes(text.toLowerCase())
      );
    }
    setIasFiltradas(filtered);
  };

  // Filtrar ao clicar em chip
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    let filtered = MOCK_IAS_DESCOBRIR;
    if (filtrosCategorias.length > 0) {
      filtered = filtered.filter((ia) =>
        ia.category.some((cat) => filtrosCategorias.includes(cat))
      );
    }
    if (filtrosPrecos.length > 0) {
      filtered = filtered.filter((ia) => filtrosPrecos.includes(ia.preco));
    }
    if (category !== "Todos") {
      filtered = filtered.filter((ia) => ia.category.includes(category));
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (ia) =>
          ia.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ia.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setIasFiltradas(filtered);
  };

  // Quando mudar params (navegação por categoria), filtrar a lista
  useEffect(() => {
    if (params.category) {
      const categoria = params.category;
      setSelectedCategory(categoria);
      const filtered = MOCK_IAS_DESCOBRIR.filter((ia) =>
        ia.category.includes(categoria)
      );
      setIasFiltradas(filtered);
    }
  }, [params.category]);

  // Função para abrir detalhes da IA
  const abrirDetalhesIA = (ia) => {
    const detalhes = {
      logo: ia.logo,
      title: ia.title,
      subtitle:
        ia.title === "ChatGPT"
          ? "OpenAI"
          : ia.title === "Claude 3"
            ? "Anthropic"
            : "GitHub e OpenAI",
      descricao:
        ia.title === "ChatGPT"
          ? "O ChatGPT é uma IA conversacional avançada desenvolvida pela OpenAI que pode ajudar em uma ampla variedade de tarefas. Desde escrever código até criar conteúdo, analisar dados ou simplesmente entreter em uma conversa, o ChatGPT é uma ferramenta versátil para qualquer profissional ou estudante."
          : ia.title === "Claude 3"
            ? "Claude é uma IA desenvolvida pela Anthropic. Focada em gerar, resumir e compreender textos com segurança e ética. Ideal para quem busca soluções conversacionais avançadas e confiáveis para tarefas profissionais e conteúdo digital."
            : "O GitHub Copilot é um assistente de codificação feito para sugerir, explicar e gerar trechos completos de código para desenvolvedores.",
      principaisUsos:
        ia.title === "ChatGPT"
          ? ["Texto", "Programação", "Pesquisa", "Análise de Dados"]
          : ia.title === "Claude 3"
            ? ["Texto", "Pesquisa", "Programação"]
            : ["Código", "Documentação", "Programação"],
      precos:
        ia.title === "ChatGPT"
          ? "Gratuito com limitações / R$106 por mês para uso ilimitado."
          : ia.title === "Claude 3"
            ? "Gratuito com limitações / R$90 por mês para uso ilimitado."
            : "Gratuito para estudantes / R$56 por mês para uso ilimitado.",
      url:
        ia.title === "ChatGPT"
          ? "https://chatgpt.com/"
          : ia.title === "Claude 3"
            ? "https://claude.ai"
            : "https://github.com/copilot",
    };

    setIaSelecionada(detalhes);
    setIaPopupLoading(false);
    setIaPopupVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/inicio")}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Descobrir</Text>
        <View style={styles.headerSpacer} />
      </View>
      {/* Busca */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Que tipo de IA você procura?"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalFiltrosVisible(true)}
        >
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>
      {/* Chips de Categorias */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
        contentContainerStyle={styles.chipsContent}
      >
        {CATEGORIAS_CHIPS.map((categoria) => (
          <TouchableOpacity
            key={categoria}
            style={[
              styles.chip,
              selectedCategory === categoria && styles.chipSelected,
            ]}
            onPress={() => handleCategorySelect(categoria)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === categoria && styles.chipTextSelected,
              ]}
            >
              {categoria}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Lista de IAs */}
      <FlatList
        data={iasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.iaItem}
            onPress={() => abrirDetalhesIA(item)}
          >
            <Image source={item.logo} style={styles.iaLogo} resizeMode="contain" />
            <View style={styles.iaInfo}>
              <Text style={styles.iaTitle}>{item.title}</Text>
              <Text style={styles.iaSubtitle}>{item.subtitle}</Text>
              <Text style={styles.iaCategorias}>
                {item.category.join(" • ")}
              </Text>
            </View>
            <TouchableOpacity style={styles.iaButton}>
              <Text style={styles.iaButtonText}>Conversacional</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma IA encontrada</Text>
          </View>
        }
      />
      {/* MODAL DE FILTROS */}
      <Modal
        visible={modalFiltrosVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalFiltrosVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Botão fechar */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalFiltrosVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filtros</Text>
            <Text style={styles.filterSectionTitle}>Por Categoria</Text>
            <View style={styles.filterOptionsRow}>
              {["Texto", "Imagem", "Código", "Áudio"].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterChip,
                    filtrosCategorias.includes(cat) &&
                    styles.filterChipSelected,
                  ]}
                  onPress={() => toggleFiltroCategoria(cat)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filtrosCategorias.includes(cat) &&
                      styles.filterChipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.filterSectionTitle}>Por Preço</Text>
            <View style={styles.filterOptionsRow}>
              {["Gratuitas", "Premium", "Freemium"].map((preco) => (
                <TouchableOpacity
                  key={preco}
                  style={[
                    styles.filterChip,
                    filtrosPrecos.includes(preco) && styles.filterChipSelected,
                  ]}
                  onPress={() => toggleFiltroPreco(preco)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filtrosPrecos.includes(preco) &&
                      styles.filterChipTextSelected,
                    ]}
                  >
                    {preco}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.limparButton}
                onPress={limparFiltros}
              >
                <Text style={styles.limparButtonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.aplicarButton}
                onPress={aplicarFiltros}
              >
                <Text style={styles.aplicarButtonText}>Aplicar Filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Popup de detalhes */}
      <IaPopup
        visible={iaPopupVisible}
        iaInfo={iaSelecionada}
        loading={iaPopupLoading}
        onClose={() => setIaPopupVisible(false)}
      />
    </View>
  );
}

// ====================== STYLES ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  filterButton: {
    marginLeft: 8,
    padding: 4,
  },
  filterIcon: {
    fontSize: 20,
    color: "#666",
  },
  chipsContainer: {
    maxHeight: 50,
    marginBottom: 16,
  },
  chipsContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#1a237e",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  iaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iaLogo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  iaInfo: {
    flex: 1,
  },
  iaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  iaSubtitle: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  iaCategorias: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontWeight: "500",
  },
  iaButton: {
    backgroundColor: "#40bff5",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  iaButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "85%",
    maxWidth: 340,
    padding: 24,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 10,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 22,
    color: "#333",
    fontWeight: "300",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    marginTop: 8,
  },
  filterOptionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  filterChip: {
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterChipSelected: {
    backgroundColor: "#1a237e",
  },
  filterChipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterChipTextSelected: {
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  limparButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  limparButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  aplicarButton: {
    flex: 1,
    backgroundColor: "#40bff5",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  aplicarButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
