import React from 'react';
import './App.css';
import { OrderTable } from "./table/orderTable";

const client = new WebSocket("ws://localhost:8000");
client.onopen = () => {
  console.log("Connection Started");
  client.send(JSON.stringify({userName: "ryan1"}));
}

function App() {
  return (
    <div className="App">
      <h1>Hi :)</h1>
      <OrderTable client={client}></OrderTable>
    </div>
  );
}

export default App;
