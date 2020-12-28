import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {register} from '../actions/userActions';
import {Link} from 'react-router-dom';


function RegisterScreen(props){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const {loading, userInfo, error} = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search?props.location.search.split("=")[1]: "/";

  useEffect(() => {
    if(userInfo){
        //redirect for shipping
      props.history.push("/")
    }
    return() => {
      //
    };
  }, [userInfo]);

const submitHandler = (e) => {
  e.preventDefault();
  dispatch(register(name,email,password));
}
  return  <div className="form">
    <form onSubmit={submitHandler}>
      <ul className="form-container">
        <li>
          <h2>Create an Account </h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">
          Password
          </label>
          <input type="password" name="password" is="password" onChange={(e) => setPassword(e.target.value)} >
          </input>
        </li>
        <li>
          <label htmlFor="rePassword">
          Reenter password
          </label>
          <input type="password" name="rePassword" is="rePassword" onChange={(e) => setRePassword(e.target.value)} >
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>

        <li>
          Already a member?
          <Link to={redirect === "/" ? "signin": "signin?redirect=" + redirect} className= "button secondary text-center"> Log in</Link>
        </li>
      </ul>
      </form>
  </div>
}
export default RegisterScreen;
