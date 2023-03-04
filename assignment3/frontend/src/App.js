import "./App.css";
import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Route} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <ChakraProvider theme={theme}>
    <ChatProvider>
    <div className="App">
    <Route path="/" component={Homepage} exact />
    <Route path="/chats" component={Chatpage} />
    </div>
    </ChatProvider>
    </ChakraProvider>
  );
}

export default App;
