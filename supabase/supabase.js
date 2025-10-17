// supabase.js
console.log('Carregando Supabase...');

// Verificar se supabase está disponível
if (typeof supabase === 'undefined') {
    console.error('Supabase não foi carregado pelo CDN');
} else {
    console.log('Supabase CDN carregado');
}

// Inicialização do cliente Supabase
const SUPABASE_URL = 'https://mchcftjcljtmrrutbkux.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaGNmdGpjbGp0bXJydXRia3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDE3ODAsImV4cCI6MjA3NDM3Nzc4MH0.qWl5LLePV4UHOR6PsKuZWSowUAMmnmm9-f_Lj3SNYi4';

try {
    // Verificar se createClient existe
    if (typeof createClient === 'undefined' && typeof supabase !== 'undefined') {
        console.log('Usando supabase.createClient');
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabase = supabaseClient;
    } else if (typeof createClient !== 'undefined') {
        console.log('Usando createClient direto');
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabase = supabaseClient;
    } else {
        console.error('Nenhum método de criação do cliente encontrado');
        // Criar um objeto vazio para evitar erros
        window.supabase = {
            auth: {
                signInWithPassword: () => ({ data: null, error: new Error('Supabase não carregado') }),
                signUp: () => ({ data: null, error: new Error('Supabase não carregado') }),
                resetPasswordForEmail: () => ({ data: null, error: new Error('Supabase não carregado') }),
                getSession: () => ({ data: { session: null }, error: new Error('Supabase não carregado') }),
                onAuthStateChange: () => ({})
            }
        };
    }
    
    console.log('Supabase inicializado com sucesso');
} catch (error) {
    console.error('Erro ao inicializar Supabase:', error);
    // Criar objeto fallback
    window.supabase = {
        auth: {
            signInWithPassword: () => ({ data: null, error: new Error('Supabase não carregado') }),
            signUp: () => ({ data: null, error: new Error('Supabase não carregado') }),
            resetPasswordForEmail: () => ({ data: null, error: new Error('Supabase não carregado') }),
            getSession: () => ({ data: { session: null }, error: new Error('Supabase não carregado') }),
            onAuthStateChange: () => ({})
        }
    };
}