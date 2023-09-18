import { useState } from "react";
import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState({
    className: "navbar light-navbar",
    theme: "light",
  });
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Whether dark mode is enable or not
  const toggleMode = () => {
    if (mode.theme === "light") {
      setMode({
        className: "navbar navbar-dark navbar-expand-lg bg-body-tertiary",
        theme: "dark",
      });
      document.body.style.backgroundColor = "#16181c";
      showAlert("Dark mode has been enabled", "success");

      document.title = "TextUtils - Dark Mode";

      //To blink your title:
      // setInterval(() => {
      //   document.title = "TextUtils is Amazing";
      // }, 2000);
      // setInterval(() => {
      //   document.title = "Install TextUtils Now";
      // }, 1500);
    } else {
      setMode({ className: "navbar light-navbar", theme: "light" });
      document.body.style.backgroundColor = "white";
      showAlert("Light  mode has been enabled", "success");
      document.title = "TextUtils - Light Mode";
    }
  };
  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <Routes>
          {/*   /users--> Component1
                /users/home --> Component2
          */}
          <Route
            exact
            path="/"
            element={
              <TextForm
                heading="Enter the text to analyze below: "
                theme={mode.theme}
                showAlert={showAlert}
              />
            }
          />

          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
