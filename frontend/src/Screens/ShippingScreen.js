import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {saveShipping} from '../actions/cartActions';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen(props){

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const dispatch = useDispatch();



const submitHandler = (e) => {
  e.preventDefault();
  dispatch(saveShipping(address,city, country,postCode));
  props.history.push('payment');
}
  return <div>
  <CheckoutSteps step1 step2></CheckoutSteps>

  <div className="form">
    <form onSubmit={submitHandler}>
      <ul className="form-container">
        <li>
          <h2>Shipping </h2>
        </li>
        <li>
          <label htmlFor="address">
            Address:
          </label>
          <input type="name" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="city">
            City:
          </label>
          <input type="name" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="country">
            Country:
          </label>
          <input type="name" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="postCode">
            Post Code:
          </label>
          <input type="name" name="postCode" id="postCode" onChange={(e) => setPostCode(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Continue to checkout</button>
        </li>

      </ul>
      </form>
  </div>
  </div>


}
export default ShippingScreen;
