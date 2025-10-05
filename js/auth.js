function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function signOutUser() {
  firebase.auth().signOut().then(() => {
    window.location.href = 'index.html';
  });
}

function checkAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById('userName').textContent = user.displayName || user.email;
      loadUserProfile(user.uid);
      // Redireciona para o dashboard se estiver na página de login
      if (window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
      }
    } else {
      // Se não estiver logado, redireciona para a página de login
      if (!window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
      }
    }
  });

  document.getElementById('logoutBtn')?.addEventListener('click', signOutUser);
}

async function loadUserProfile(uid) {
  const db = firebase.firestore();
  const userDoc = await db.collection('users').doc(uid).get();
  
  if (!userDoc.exists) {
    await db.collection('users').doc(uid).set({
      isPremium: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById('userPlan').textContent = 'Gratuito';
  } else {
    const data = userDoc.data();
    document.getElementById('userPlan').textContent = data.isPremium ? 'Premium' : 'Gratuito';
  }
}
