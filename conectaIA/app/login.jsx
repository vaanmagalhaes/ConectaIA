import { useState } from "react";
import {View, TextInput, Text, Button, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image} from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'https://backend-conectaai.com/api/auth/login';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email, password})
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Erro', errorData.message || "Não foi possível efetuar o login.");
                setLoading(false);
                return;
            }
            
            const data = await response.json();

            Alert.alert('Bem-vindo!');

        } catch (err){
            Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../assets/images/background_tela_login.jpg')} style={StyleSheet.background}>
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.jpg')} style={styles.logo}/>
                <Text style={styles.titulo}>
                    Entrar
                </Text>
                <TextInput
                placeholder="E-mail"
                keyboardType="email-adress"
                value = {email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                />
                <TextInput
                placeholder="Senha"
                secureTextEntry
                value = {password}
                onChangeText={setPassword}
                style={styles.input}
                />
                <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} color="#53A0FD" disabled={loading} />
                <View style={styles.links}>
                    <TouchableOpacity onPress={() => router.push('/cadastro')}>
                        <Text style={styles.linkText}>
                            Criar conta
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        marginHorizontal: 20,
        marginTop: 250,
        borderRadius: 8,
        padding: 20,
        elevation: 5,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 12
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    linkText: {
        color: '#53A0FD'
    }
})