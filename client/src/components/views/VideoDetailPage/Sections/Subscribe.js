import React, { useEffect, useState }from 'react';
import Axios from "axios";

function Subscribe(props) {

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo }

    Axios.post('/api/subscribe/subscribeNumber', variable)
      .then(response => {
        if(response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('Failed to get Subscriber Number')
        }
      })

    let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }

    Axios.post('/api/subscribe/subscribed', subscribedVariable)
      .then(response => {
        if(response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("Failed to subscribe")
        }
      })
  }, []);

  const onSubscribe = () => {

    let subscribedValriable = {
      userTo: props.userTo,
      userFrom: props.userFrom
    }
    // if already subscribed
    if(Subscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribedValriable)
        .then(response => {
          if(response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to Unsubscribe")
          }
        })
    } else {
      // if not subscribed yet
      Axios.post('/api/subscribe/subscribe', subscribedValriable)
        .then(response => {
          if(response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to Subscribe")
          }
        })
    }
  }

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? '#AAAAAA' : '#cc0000'}`,
          borderRadius: '4px', color: 'white',
          padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
        }}>

        { SubscribeNumber } { Subscribed ? 'Subscribed' : 'Subscribe' }

      </button>
    </div>
  );
}

export default Subscribe;