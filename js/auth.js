function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

// Não é necessário checkAuth() aqui para o redirecionamento inicial
