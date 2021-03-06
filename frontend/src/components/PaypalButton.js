import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



  function PaypalButton(props){

    const [sdkReady, setSdkReady] = useState(false);

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    const createOrder = (data, actions) => actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: props.amount
          }
        }
      ]
    });

    const onApprove = (data, actions) => actions.order.capture().then(details => props.onSuccess(data,details))
    .catch(err => console.log(err));

    useEffect(() => {
      if(!window.paypal){
        addPaypalScript();
      }
      return () => {
        //
      };
    }, []);

    if(!sdkReady){
      return <div>Loading ...</div>
    }

    const Button = window.paypal.Buttons.driver('react', {React, ReactDOM});

    return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}/>
  }

export default PaypalButton;
