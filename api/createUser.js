import auth from "@react-native-firebase/auth"

export const createUser = async (fullName, email, password) => {
    try{
        const response = await auth().createUserWithEmailAndPassword(email, password);
        console.log(response);
        await response.user.updateProfile({displayName : fullName});
        return response;
    }
    catch(error)
    {
        

  if (error.code === 'auth/email-already-in-use') {
    return { error: 'The email you entered is already in use.' };
  } else if (error.code === 'auth/invalid-credential') {
    return { error: 'Please enter a valid credentials.' };
  }

  return { error: 'Something went wrong with your request.' };
    }
}


export const logInUser = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();

    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token: token,
      },
    };
  } catch (error) {
    console.log('🔥 Firebase login error:', error.code);

    if (error.code === 'auth/invalid-email') {
      return { status: false, error: 'Please enter a valid email address.' };
    } else if (error.code === 'auth/invalid-credential') {
      return {
        status: false,
        error: 'Please check the credentials',
      };
    } else if (error.code === 'auth/wrong-password') {
      return { status: false, error: 'Please enter a correct password.' };
    }

    return { status: false, error: 'Something went wrong' };
  }
};



export const signOutUser = async () => {
    await auth().signOut();
}