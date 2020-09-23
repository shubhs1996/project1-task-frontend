import React, { useState } from 'react'
import SignUp from '../Components/Auth/SignUp'


import './LandingPage.css'
import Login from '../Components/Auth/Login'

function LandingPage(props) {

    const [login, setLogin] = useState(true)
    const btn = login ? <div onClick={() => setLogin(false)} className="button">sign up</div> : <div onClick={() => setLogin(true)} className="button">login</div>


    return (

        <div className="landingPage_Container">

            {login ? <Login /> : <SignUp onSuccessful={() => setLogin(true)} />}

            <div className="choice_container">
                {login ? 'Create a new account?' : 'Already have a account?'}{btn}
            </div>
        </div>
    )
}

export default LandingPage
