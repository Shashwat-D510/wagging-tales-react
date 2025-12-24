import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Sign_in.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import DogListing from "./pages/DogListing.jsx";
import Adoption from "./pages/AdoptionForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT PAGE */}
        <Route path="/" element={<Signin />} />

        {/* AUTH */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* MAIN SITE */}
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<DogListing />} />
        <Route path="/form" element={<Adoption />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
