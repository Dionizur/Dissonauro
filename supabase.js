// supabase-client.js
class SupabaseClient {
    constructor() {
        this.url = this.getUrl()
        this.key = this.getKey()
        this.client = supabase.createClient(this.url, this.key)
    }
    
    getUrl() {
        return 'https://mchcftjcljtmrrutbkux.supabase.co'
    }
    
    getKey() {
        // Em produção, busque de um endpoint seguro
        if (window.location.hostname === 'localhost') {
            return '9egCFdlM7I6IwPrkHJ1MoFD7WugydxkK2MrqpHJvEkhip7ZYbRKVb7SU1ivjGYclISTmmdgnPaB3oqtXZioSpw=='
        }
        
        // Para produção, implementar busca segura
        return 'sua-chave-de-producao'
    }
    
    // Métodos seguros
    async secureQuery(table, query) {
        try {
            const { data, error } = await this.client
                .from(table)
                .select(query)
            
            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro seguro:', error)
            return null
        }
    }
}

window.supabaseClient = new SupabaseClient()
