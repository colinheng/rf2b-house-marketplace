import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import OAuth from "./components/OAuth"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const {name, email, password} = formData
  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    })))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error("Miaow say something went wrong!")
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Miaow welcomes you!
          </p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="text" className="nameInput" placeholder="name" id="name" value={name} onChange={onChange} />
            <input type="email" className="emailInput" placeholder="email" id="email" value={email} onChange={onChange} />
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange} />
              <img src={visibilityIcon} alt="Show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState )} />
            </div>
            <Link to='/forgot-password' className="forgotPasswordLink">
              Forgot password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">
                Sign up
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to='/sign-in' className="registerLink">
            Sign in instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp