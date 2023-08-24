import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Explore from "./pages/Explore"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Offers from "./pages/Offers"
import ForgotPassword from "./pages/ForgotPassword"

function App() {
  return (
    <>
      <h1> App! </h1>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
