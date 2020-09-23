
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const LOGINERROR = 'LOGINERR';
export const SIGNUP = 'SIGNUP';
export const SIGNUPERR= 'SIGNUPERR'

//login part
export const authenticate = (user, token, err) => {
  return dispatch => {
    
    dispatch({ type: AUTHENTICATE, user: user, token: token, authErr: err });
  };
};


//logging
export const login = (credential) => {
  return async dispatch => {

    const response = await fetch('http://localhost:8000/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password
        })
      }
    );

    const resData = await response.json();
   //saving data to local storage
    saveDataToStorage(resData.user);

    dispatch(
      authenticate(
        resData.user,
        resData.token,
        resData.message,
      )
    );
   
   
  };
};




//saving data to localStorage
const saveDataToStorage = ( user) => {
 
  const userId=JSON.stringify(user)
  localStorage.setItem(
    'userData',
   userId
  );
};


//logout
export const logout = () => {
  localStorage.clear();
  return { type: LOGOUT };
};



//signup
export const signUp = (inputs) => {
 return async dispatch=> {

  const response = await fetch('http://localhost:8000/users/signup',{
    method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
          name:inputs.firstname
        })
  })

  const resData = await response.json();

  if(resData.error){
    dispatch(
      {type:SIGNUPERR , Err:resData.error}
    )
  }else{
    dispatch(
      {
        type:SIGNUP,
        Msg:resData.message
      }
    )
    
  }
 }
}