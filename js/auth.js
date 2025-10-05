function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function signOutUser() {
  firebase.auth().signOut().then(() => {
    window.location.href = 'índice.html';
  });
}

function checkAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById('userName').textContent = user.displayName || user.email;
      loadUserProfile(user.uid);
    } else {
      window.location.href = 'índice.html';
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
