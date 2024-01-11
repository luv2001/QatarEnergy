import React, { useState } from "react";
import Fields from "./components/Fields";
import Service from "./components/Service/Service";
import { Route, Routes } from "react-router-dom";
import Record from "./components/Record/Record";
import DisplayService from "./components/DisplayService/DisplayService";

function App() {

  const [field, setField] = useState(null);

  return (
    <div className="App">

      <Routes>
        {/* <Route path="/" element={ <Fields setField={setField}/> } /> */}
        <Route path="/" element={ <Service field={field} setField={setField}/> } />
        <Route path="/record" element={ <Record field={field} setField={setField}/> } />
        <Route path="/displayservice" element={ <DisplayService field={field} setField={setField}/> } />
      </Routes>
    </div>
  );
}

export default App;
