import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Analytics from "./pages/analytics/Analytics";
import Login from "./pages/login/Login";
import Na from "./pages/login/Na";
import Users from "./pages/users/Users";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) =>
    state.user.currentUser != null ? true : false
  );
  const admin = useSelector((state) =>
    user ? (state.user.currentUser.isAdmin ? true : false) : false
  );
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/website">
          {() => {
            window.location.replace("http://localhost:4000/");
            return null;
          }}
        </Route>
        <Route path="/na">{user ? <Na /> : <Redirect to="/login" />}</Route>
        {user ? (
          admin ? (
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/analytics">
                  <Analytics />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
              </div>
            </>
          ) : (
            <Redirect to="/na" />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
