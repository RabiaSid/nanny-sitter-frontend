import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css";
import { H1 } from "@/config/typography";
import ConditionalLayout from "@/config/conditionalLayout";
import AppRoutes from "@/route";
import { Provider } from "react-redux";
import Store from "./redux/store/store"

function App() {
  return (
    <>
    <Provider store={Store}>
      <Router>
        <ConditionalLayout>
          <AppRoutes />
        </ConditionalLayout>
      </Router>
      </Provider>
    </>
  );
}

export default App;
