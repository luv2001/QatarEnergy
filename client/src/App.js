import React, { useState } from "react";
import Fields from "./components/Fields";
import Service from "./components/Service";
import { Route, Routes } from "react-router-dom";
import Record from "./components/Record";
import DisplayService from "./components/DisplayService";

function App() {

  const [field, setField] = useState("");

  return (
    <div className="App">

      {/* <MyComponent /> */}

      <Routes>
        <Route path="/" element={ <Fields setField={setField}/> } />
        <Route path="/service" element={ <Service field={field}/> } />
        <Route path="/record" element={ <Record field={field}/> } />
        <Route path="/displayservice" element={ <DisplayService field={field}/> } />
      </Routes>
    </div>
  );
}

export default App;
