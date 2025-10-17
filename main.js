// Importe o SDK do Supabase (assumindo que você tem o pacote instalado ou use um CDN)
// Se usar npm, certifique-se de que @supabase/supabase-js está instalado.
// Para este exemplo, usamos import direto.

import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js'; // CDN para Supabase

const supabaseUrl = 'https://yhhslysjgiwfgszdmmti.supabase.co'; // Substitua pela sua URL do Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloaHNseXNqZ2l3ZmdzemRtbXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2ODg0ODIsImV4cCI6MjA3NjI2NDQ4Mn0.zzDibZtIIaLICiRt2pJ694yQLbT8dY3Cy_C5OrPOaqs'; // Substitua pela sua anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para registrar um usuário
async function registrarUsuario(email, senha) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
            options: {
                data: {
                    nome: 'Nome do Usuário', // Exemplo; você pode personalizar
                }
            }
        });

        if (error) {
            console.error('Erro no registro:', error.message);
            alert('Erro ao registrar: ' + error.message);
        } else {
            console.log('Usuário registrado com sucesso!', data);
            alert('Registro bem-sucedido! Verifique seu email para confirmar.');
        }
    } catch (err) {
        console.error('Erro inesperado:', err);
        alert('Ocorreu um erro inesperado.');
    }
}

// Função para fazer login
async function fazerLogin(email, senha) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            console.error('Erro no login:', error.message);
            alert('Erro ao logar: ' + error.message);
        } else {
            console.log('Login bem-sucedido!', data);
            alert('Logado com sucesso!');
            window.location.href = '/dashboard';  // Redireciona para uma página de dashboard (ajuste conforme necessário)
        }
    } catch (err) {
        console.error('Erro inesperado:', err);
        alert('Ocorreu um erro inesperado.');
    }
}

// Função para resetar senha
async function resetarSenha(email) {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5500/reset-senha.html',  // Ajuste para a URL real da sua página
        });

        if (error) {
            console.error('Erro no reset:', error.message);
            alert('Erro ao enviar email: ' + error.message);
        } else {
            console.log('Email de reset enviado!');
            alert('Verifique seu email para resetar a senha.');
        }
    } catch (err) {
        console.error('Erro inesperado:', err);
        alert('Ocorreu um erro inesperado.');
    }
}

// Exporte as funções se necessário, mas como estamos usando em HTML, não é obrigatório.
export { registrarUsuario, fazerLogin, resetarSenha };