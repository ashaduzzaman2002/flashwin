import React, { useContext } from 'react';
import './commisionHistory.css';
import CommissionCard from '../../components/commission/CommissionCard';
import { AuthContext } from '../../context/AuthContext';

const CommisionHistory = () => {
    const { commissionHistory } = useContext(AuthContext);
  return (
    <div className="container">
    <div className="commission-container">
        <h2>Commission History</h2>
        {
            commissionHistory?.map(item => <CommissionCard key={item.id} data={item} />)
        }
      
    </div>
    </div>
  );
};

export default CommisionHistory;
