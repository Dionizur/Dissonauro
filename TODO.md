# TODO: Implementar Autenticação com Supabase

## Passos para Implementação
- [x] Criar supabase.js com inicialização do cliente Supabase
- [x] Criar auth.js com funções comuns de autenticação
- [x] Editar login/login.js para função de login
- [x] Editar login/registrar/registrar.js para função de registro
- [x] Editar login/esqueci/esqueci.js para função de reset de senha
- [x] Editar login/esqueci/esqueci.html para adicionar script CDN do Supabase

## Configuração no Supabase
- [ ] Criar projeto no supabase.com
- [ ] Habilitar autenticação por email em Authentication > Providers
- [ ] Obter Project URL e anon public key em Settings > API
- [ ] Configurar Site URL em Authentication > URL Configuration (adicione http://localhost:8000 para testes locais)
- [ ] Substituir placeholders em supabase.js com valores reais

## Testes
- [ ] Testar login, registro e reset de senha no browser (abra http://localhost:8000/login/login.html após servir o site)
- [ ] Verificar console para erros
- [ ] Confirmar emails de confirmação/reset no dashboard Supabase
