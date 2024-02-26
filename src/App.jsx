import {useState, useEffect} from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const [triviaData, setTriviaData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
          const data = await res.json();
          // console.log(data.results)
          return setTriviaData(data.results)
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()
    }, [])
    console.log(triviaData)
    return (
      <Router>
        <main className="flex justify-center min-h-screen bg-zinc-800 text-zinc-50 py-16">
          <Routes>
              <Route path="/" element={<Home triviaData={triviaData}/>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    );
}

export default App;