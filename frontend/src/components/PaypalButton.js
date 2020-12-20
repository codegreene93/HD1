import React from 'react';
  function PaypalButton(props){

    const [sdkReady, setSDKReady] = useState(false);

    const addPaypalSdk = async() => {
      const result = await axios.get("/api/config/paypal");
      const clientID = result.data;
      const script = document.createElement('script')
      script.type = 'text/javascript';
      script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID;
      script.async = true;
      script.onload = () => {
        setSDKReady(true);
      }
      document.body.appendChild(script);
    }

    useEffect(() => {
      if(!window.paypal){
        addPaypalSdk();
      }
      return () => {
        //
      };
    }, [])
    if(!skdReady){
      return <div>Loading ...</div>
    }
  }

export default PaypalButton;
