import { router } from "expo-router";
import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Favoritos() {
  const [modalNotificacaoVisible, setModalNotificacaoVisible] = useState(false);

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
        <Text style={styles.headerTitle}>Favoritos</Text>
        <TouchableOpacity onPress={() => setModalNotificacaoVisible(true)}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Texto central */}
      <View style={styles.contentCenter}>
        <Text style={styles.infoText}>
          IAs que você salvou para acessar rapidamente
        </Text>
        <Text style={styles.breveText}>
          Funcionalidade completa chegará em breve!
        </Text>
      </View>
      
      {/* Modal de Notificação */}
      <Modal
        visible={modalNotificacaoVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalNotificacaoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificacaoModalBox}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalNotificacaoVisible(false)}
            >
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.notificacaoTitle}>Configurações de Notificação</Text>
            <Text style={styles.notificacaoText}>
              Configure quando e como receber notificações sobre:
              {"\n\n"}
              - Novas IAs adicionadas
              {"\n"}
              - Atualizações das suas favoritas
              {"\n"}
              - Tutoriais recomendados
              {"\n"}
              - Ofertas especiais
              {"\n\n"}
              Em breve!
            </Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalNotificacaoVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingTop: 5,
    paddingBottom: 15,
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
  notificationIcon: {
    fontSize: 22,
    marginLeft: 12,
    color: "#111",
  },
  contentCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    marginBottom: 10,
  },
  breveText: {
    fontSize: 15,
    color: "#2460ef",
    textAlign: "center",
    marginTop: 6,
    fontWeight: "600",
  },
  notificacaoModalBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    width: 280,
    padding: 20,
    alignItems: "flex-start",
    position: "relative",
  },
  notificacaoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  notificacaoText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 24,
  },
  okButton: {
    alignSelf: "flex-end",
    backgroundColor: "#40bff5",
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 10,
    padding: 4,
  },
});

