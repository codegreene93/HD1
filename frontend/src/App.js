import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import {useSelector} from 'react-redux';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';

function App() {
  const userSignin = useSelector(state => state.userSignin);

  const { userInfo } = userSignin;

  const openMenu = () => {
     document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
  }
  return (
  <BrowserRouter>
    <div className="grid-container">
        <header className= "header">
          <div className= "brand">
          <button onClick={openMenu}>
            &#9776;
          </button>
          <Link to="/">Honeyman Designs</Link>
              <img src="/images/logo.jpg" alt="company logo"/>
           </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>

            {
               userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                 <Link to="/signin">Sign In</Link>
             }
          </div>
        </header>

        <aside className="sidebar">
          <h3>Shopping categories</h3>
          <button className="sidebar-close" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="products.html">Lighting</a>
            </li>
            <li>
              <a href="products.html">Mirrors</a>
            </li>
            <li>
              <a href="products.html">Rugs</a>
            </li>
            <li>
              <a href="products.html">Coffee table</a>
            </li>
          </ul>
        </aside>


      <main className="main">
        <div class = "content">
        <Route path="/products" component={ProductsScreen}/>
        <Route path="/signin" component={SigninScreen}/>
        <Route path="/register" component={RegisterScreen}/>
        <Route path="/product/:id" component={ProductScreen}/>
        <Route path="/cart/:id?" component={CartScreen}/>
        <Route path="/" exact={true} component={HomeScreen}/>

      </div>
    </main>
    <footer className= "footer">
      <p>All rights reserved</p>
    </footer>
  </div>
  </BrowserRouter>

  );
}

export default App;
