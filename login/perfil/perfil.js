// Perfil do usuário
document.addEventListener('DOMContentLoaded', async function() {
    // Verificar se usuário está logado
    const { data: { session } } = await window.supabase.auth.getSession();
    if (!session) {
        window.location.href = '/login/login.html';
        return;
    }

    // Carregar informações do usuário
    loadUserInfo();

    // Event listeners
    document.getElementById('updateProfileBtn').addEventListener('click', showUpdateProfileModal);
    document.getElementById('changePasswordBtn').addEventListener('click', showChangePasswordModal);
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Modal de atualizar perfil
    document.getElementById('updateProfileForm').addEventListener('submit', updateProfile);

    // Modal de alterar senha
    document.getElementById('changePasswordForm').addEventListener('submit', changePassword);

    // Fechar modais
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.getElementById('updateProfileModal').classList.add('hidden');
            document.getElementById('changePasswordModal').classList.add('hidden');
        });
    });
});

async function loadUserInfo() {
    const { data: { user } } = await window.supabase.auth.getUser();
    if (user) {
        const userInfoDiv = document.getElementById('userInfo');
        userInfoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${user.user_metadata?.name || 'Não informado'}</p>
            <p><strong>E-mail:</strong> ${user.email}</p>
            <p><strong>Data de criação:</strong> ${new Date(user.created_at).toLocaleDateString('pt-BR')}</p>
            <p><strong>Último login:</strong> ${new Date(user.last_sign_in_at).toLocaleDateString('pt-BR')}</p>
        `;

        // Preencher formulário de atualização
        document.getElementById('updateName').value = user.user_metadata?.name || '';
        document.getElementById('updateEmail').value = user.email;
    }
}

function showUpdateProfileModal() {
    document.getElementById('updateProfileModal').classList.remove('hidden');
}

function showChangePasswordModal() {
    document.getElementById('changePasswordModal').classList.remove('hidden');
}

async function updateProfile(e) {
    e.preventDefault();

    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;

    try {
        const { data, error } = await window.supabase.auth.updateUser({
            email: email,
            data: { name: name }
        });

        if (error) {
            showMessage('Erro ao atualizar perfil: ' + error.message);
        } else {
            showMessage('Perfil atualizado com sucesso!', 'success');
            document.getElementById('updateProfileModal').classList.add('hidden');
            loadUserInfo(); // Recarregar informações
        }
    } catch (err) {
        showMessage('Erro inesperado: ' + err.message);
    }
}

async function changePassword(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        showMessage('As senhas não coincidem.');
        return;
    }

    try {
        // Primeiro, verificar a senha atual fazendo login temporário
        const { data: { user } } = await window.supabase.auth.getUser();
        const { error: signInError } = await window.supabase.auth.signInWithPassword({
            email: user.email,
            password: currentPassword
        });

        if (signInError) {
            showMessage('Senha atual incorreta.');
            return;
        }

        // Atualizar para nova senha
        const { error } = await window.supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            showMessage('Erro ao alterar senha: ' + error.message);
        } else {
            showMessage('Senha alterada com sucesso!', 'success');
            document.getElementById('changePasswordModal').classList.add('hidden');
        }
    } catch (err) {
        showMessage('Erro inesperado: ' + err.message);
    }
}

async function logout() {
    const { error } = await window.supabase.auth.signOut();
    if (error) {
        showMessage('Erro ao sair: ' + error.message);
    } else {
        window.location.href = '/index.html';
    }
}
