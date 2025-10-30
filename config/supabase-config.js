// config/supabase-config.js

// Configurações do Supabase
const SUPABASE_URL = 'https://nazfptanttjthhsiloau.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hemZwdGFudHRqdGhoc2lsb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NjE4ODAsImV4cCI6MjA3NzEzNzg4MH0.zHNyZfZuYftOGEqGsqXM_PO5r5IqlZT3WBJ66XxPm10';

// Inicializar cliente Supabase
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase configurado com sucesso');
