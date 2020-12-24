import React, {useState, useEffect} from 'react';
import {logout, update} from '../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {listMyOrders} from '../actions/orderActions';

function ProfileScreen(props){

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({userId: userInfo._id,email, name, password}))
  }

  const userUpdate = useSelector(state => state.userUpdate);
  const {loading, success, error} = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const {loading: loadingOrders, orders, error: errorOrders} = myOrderList;

  useEffect(() => {
    if (userInfo) {
         setEmail(userInfo.email);
         setName(userInfo.name);
         setPassword(userInfo.password);
       }
       dispatch(listMyOrders());
    return () => {

    };
  }, []);

  return <div className="profile">
    <div className="profileInfo">
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2> User Profile</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {success && <div>Profile Update Saved!!</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
              </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
              </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">
              Password
              </label>
              <input value={password} type="password" name="password" is="password" onChange={(e) => setPassword(e.target.value)} >
              </input>
            </li>
            <li>
              <button type="submit" className="button primary">Update</button>
            </li>

            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Log Out </button>
            </li>
          </ul>
          </form>
      </div>
       </div>
    <div className="profileOrders"> </div>
  </div>
}

export default ProfileScreen;
