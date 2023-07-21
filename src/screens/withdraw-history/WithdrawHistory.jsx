import { useEffect, useState } from 'react';
import { dbObject } from '../../helper/constant';
import HeaderSecondar from '../../components/HeaderSecondar';
import './withdrawHistory.css';

const WithdrawHistory = () => {
  const [withdrawList, setWithdrawList] = useState([]);

  const fetchWithdrawList = async () => {
    try {
      const { data } = await dbObject.post('/withdraw/history');
      if (!data.error) {
        setWithdrawList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWithdrawList();
  }, []);

  return (
    <div className="container">
      <div className="withdraw-history-container">
        <h2>Withdraw History</h2>

        <div className="withdraw-history-card-group">
          {withdrawList.map((items) => {
            const dateString = items.date;
            const date = new Date(dateString);
            const formattedDate = date.toLocaleDateString('en-GB'); // dd/mm/yyyy
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedTime = `${hours}:${minutes}`;

            return (
              <div className="withdraw-history-card" key={items.id}>
                <div className="top">
                  <div>
                    <p>Points</p>
                    <p>₹{items.amount}</p>
                  </div>

                  <div>
                    <p>Time</p>
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                  </div>

                  <div>
                    <p>State</p>
                    <p style={{ color: '#c3c37b' }}>
                      {items.is_approved ? 'Approved' : 'Proccessing'}
                    </p>
                  </div>
                </div>

                <div style={{ borderBottom: '1px solid gray' }} />
                <div className='middle'>
                  <p>Actually Arrived: ₹{items.amount}</p>
                  <p>Fees: ₹0.0</p>
                </div>

                <div className='bottom'>
                  <p>{items.user_id}</p>
                  <p>{items.request_id}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WithdrawHistory;
