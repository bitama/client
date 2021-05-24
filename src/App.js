import 'bootstrap/dist/css/bootstrap.min.css'
import { Router } from "@reach/router"
import Main from "./views/Main"
import Show from "./views/Show"
import Edit from "./views/Edit"



function App() {
  


  return (
    <div className="App container col-5 mx-auto">
      <Router>
        <Main path="/" />
        <Show path="/product/:id" />
        <Edit path="/product/:id/edit" />
      </Router>
    </div>
  );
}

export default App;
