import "./App.css";
import Homepage from "./Pages/Homepage";
import { BrowserRouter  ,  Switch } from "react-router-dom";
import { Route} from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import ChatProvider from "./Context/ChatProvider";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ChatProvider>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
      </ChatProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;