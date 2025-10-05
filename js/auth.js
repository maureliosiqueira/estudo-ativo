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
      // Usuário está logado → redireciona para o dashboard
      if (window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
      }
    } else {
      // Usuário não está logado → redireciona para login
      if (!window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
      }
    }
  });
}

async function loadUserProfile(uid) {
  const db = firebase.firestore();
  const userDoc = await db.collection('users').doc(uid).get();
  
  if (!userDoc.exists) {
    await db.collection('users').doc(uid).set({
      isPremium: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}
