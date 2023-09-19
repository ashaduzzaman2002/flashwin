import { useEffect, useState } from 'react';
import { dbObject } from '../../helper/constant';
import './recentTransaction.css';
import { bomb, check, dice, fortuneWheel, rocket } from '../../assets';
import Header from '../../components/Header';

const RecentTransaction = () => {
  const [transactionList, setTransactionList] = useState([]);

  const fetchTransactionList = async () => {
    try {
      const { data } = await dbObject.get('/wallet/transactions');
      if (!data.error) {
        setTransactionList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionList();
  }, []);

  return (
    <div className="container">
      <div className="transaction-history-container" style={{marginBottom: '-65px'}}>
        <Header path='/profile' title='Recent Transaction'/>

        <div className="transaction-history-card-group">
          {transactionList.map((items) => (
            <Card
              key={items.id}
              source={items.source}
              date={items.date}
              type={items.type}
              amount={items.amount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ source, date, type, amount }) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-GB'); // dd/mm/yyyy
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formattedTime = `${hours}:${minutes}`;

  const img = source === 'checkin' ? check: source === 'circle'? fortuneWheel: source === 'minesweeper'? bomb : source === 'fastparity'? rocket: dice

  return (
    <div className="transaction-history-card">
      <div className="info">
        <img src={img} width={50} alt="" />
        <div>
          <p>{source}</p>
          <p>{`${formattedDate} ${formattedTime}`}</p>
        </div>
      </div>

      <div style={{ color: type === 'credit' ? '#3bd146' : '#ee979f' }}>
        <p className="amount">
          {type === 'credit' ? '+' : '-'}
          {Number(amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
export default RecentTransaction;
