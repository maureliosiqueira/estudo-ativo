function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function signOutUser() {
  firebase.auth().signOut().then(() => {
    window.location.href = 'index.html';
  });
}

// 🔥 Função que verifica o estado de autenticação
function checkAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Está logado → vai para o dashboard
      if (window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
      }
    } else {
      // Não está logado → fica na página de login
      if (!window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
      }
    }
  });
}
