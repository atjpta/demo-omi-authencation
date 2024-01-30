import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import LoginFb from "./components/login-fb";
import LoginGg from "./components/login-gg";
import LoginZalo from "./components/login-zl";
initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <div className="mx-auto w-1/2 text-center space-y-20 m-20">
        <LoginGg />
        <LoginFb />
        <LoginZalo />
      </div>
    </div>
  );
}

export default App;
