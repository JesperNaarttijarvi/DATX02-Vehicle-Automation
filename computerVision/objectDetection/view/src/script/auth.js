import logFile from '@/script/log'
import store from '@/store'
const log = logFile('auth.js')

export const loginAsync = async (email, password) => {
  try {
    // eslint-disable-next-line
    await firebase.auth().signInWithEmailAndPassword(email, password)
    store.commit('setLoggedIn', true)
  } catch (err) {
    store.commit('setLoggedIn', false)
    let msg = 'Okänt fel vid inloggning'
    if (err.code) {
      switch (err.code) {
        case 'auth/invalid-email':
        case 'auth/argument-error':
          msg = 'Ogiltig email'
          break
        case 'auth/user-not-found':
          msg = 'Ingen användare hittades'
          break
        case 'auth/wrong-password':
          msg = 'Felaktigt lösenord'
          break
        case 'auth/too-many-requests':
          msg = 'Du har försökt för många gånger. Vänta en stund'
          break
      }
    }
    log.error(err)
    throw new Error(msg)
  }
}

export const logoutAsync = async () => {
  try {
    // eslint-disable-next-line
    await firebase.auth().signOut()
    store.commit('setLoggedIn', false)
  } catch (err) {
    log.error(err)
    throw new Error('Kunde inte logga ut')
  }
}

export const resetPasswordAsync = async email => {
  try {
    // eslint-disable-next-line
    return await firebase.auth().sendPasswordResetEmail(email)
  } catch (err) {
    let msg = 'Kunde inte återställa lösenord'
    if (err.code) {
      switch (err.code) {
        case 'auth/invalid-email':
        case 'auth/argument-error':
          msg = 'Ogiltig email'
          break
        case 'auth/user-not-found':
          msg = 'Ingen användare hittades'
          break
        case 'auth/wrong-password':
          msg = 'Felaktigt lösenord'
          break
        case 'auth/too-many-requests':
          msg = 'Du har försökt för många gånger. Vänta en stund'
          break
      }
    }
    log.error(err)
    throw new Error(msg)
  }
}

export const changeUserPasswordAsync = async (
  email,
  oldPw,
  newPw,
  newPwConf
) => {
  try {
    if (newPw !== newPwConf) {
      throw new Error('De nya lösenorden stämmer inte överens')
    }
    // eslint-disable-next-line
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, oldPw)
    // eslint-disable-next-line
    await response.user.updatePassword(newPw)
  } catch (err) {
    let msg = err.message || 'Okänt fel vid ändring av lösenord'
    if (err.code) {
      switch (err.code) {
        case 'auth/invalid-email':
          msg = 'Kunde ej logga in. Felaktig email'
          break
        case 'auth/invalid-password':
          msg = 'Nuvarande lösenord är inkorrekt'
          break
        case 'auth/weak-password':
          msg = 'Nytt lösenord måste vara minst 6 karaktärer'
          break
      }
    }
    log.error(err)
    throw new Error(msg)
  }
}
