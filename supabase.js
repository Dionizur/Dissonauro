// Inicialização do cliente Supabase
const SUPABASE_URL = 'https://mchcftjcljtmrrutbkux.supabase.co'; // Substitua pela URL do seu projeto Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaGNmdGpjbGp0bXJydXRia3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDE3ODAsImV4cCI6MjA3NDM3Nzc4MH0.qWl5LLePV4UHOR6PsKuZWSowUAMmnmm9-f_Lj3SNYi4';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exportar para uso em outros arquivos
window.supabase = supabaseClient;
