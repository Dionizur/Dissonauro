// Sistema de Autenticação DinoVerse com Supabase
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.supabase = window.supabaseClient.client;
        this.init();
    }

    async init() {
        await this.checkSession();
    }

    async register(userData) {
        // Validar dados
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('Todos os campos são obrigatórios');
        }

        if (userData.password.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres');
        }

        const { data, error } = await this.supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                data: {
                    name: userData.name,
                    role: 'user'
                }
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        // Para usuários novos, definir como user
        const newUser = {
            id: data.user.id,
            name: userData.name,
            email: userData.email,
            role: 'user'
        };

        this.currentUser = newUser;
        localStorage.setItem('dinoUser', JSON.stringify(this.currentUser));

        return newUser;
    }

    async login(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw new Error(error.message);
        }

        const user = data.user;
        this.currentUser = {
            id: user.id,
            name: user.user_metadata.name || 'Usuário',
            email: user.email,
            role: user.user_metadata.role || 'user'
        };

        localStorage.setItem('dinoUser', JSON.stringify(this.currentUser));

        return this.currentUser;
    }

    async logout() {
        const { error } = await this.supabase.auth.signOut();
        if (error) {
            console.error('Erro ao fazer logout:', error);
        }
        this.currentUser = null;
        localStorage.removeItem('dinoUser');
    }

    async checkSession() {
        const { data: { user } } = await this.supabase.auth.getUser();
        if (user) {
            this.currentUser = {
                id: user.id,
                name: user.user_metadata.name || 'Usuário',
                email: user.email,
                role: user.user_metadata.role || 'user'
            };
            localStorage.setItem('dinoUser', JSON.stringify(this.currentUser));
        } else {
            // Fallback para localStorage se Supabase não tiver sessão
            const userData = localStorage.getItem('dinoUser');
            if (userData) {
                this.currentUser = JSON.parse(userData);
            }
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Instância global do sistema de autenticação
const auth = new AuthSystem();
