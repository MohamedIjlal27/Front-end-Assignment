import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Products,
  PageNotFound,
  Sales,
  Design,
  Office,
  Legal,
} from "./screens";
import DynamicPage from "./screens/dynamicpage/DynamicPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/design" element={<Design />} />
            <Route path="/office" element={<Office />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/:folderName" element={<DynamicPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
