import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const logoutUser = () => {
  firebase.auth().signOut();
}

export const signUpUser = async ({ name, email, password }) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

    // Update the user's display name
    await userCredential.user.updateProfile({
      displayName: name,
    });

    // Send email verification
    await userCredential.user.sendEmailVerification();

    return { user: userCredential.user };
  } 

  catch (error) {
    if (error.code === 'auth/network-request-failed') {
      return {
        error: 'network',
      };
    } else if (error.code === 'auth/email-already-in-use') {
      return {
        error: 'email-in-use',
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    
    // Check if the email is verified
    if (!userCredential.user.emailVerified) {
      throw new Error('Email not verified');
    }

    return { user: userCredential.user };
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const deleteUserAccount = async () => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      await user.delete();
      return {};
    } else {
      throw new Error('No user is currently logged in.');
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
