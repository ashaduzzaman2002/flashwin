import React, { useContext } from "react";
import "./commisionHistory.css";
import CommissionCard from "../../components/commission/CommissionCard";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import { emptyBox } from "../../assets";

const CommisionHistory = () => {
  const { commissionHistory } = useContext(AuthContext);
  return (
    <div className="container">
      <div className="commission-container">
        <Header path={"/invite"} title={"Commission History"} />
        {commissionHistory?.length ? (
          commissionHistory?.map((item) => (
            <CommissionCard key={item.id} data={item} />
          ))
        ) : (
          <div className="emptyImage">
            <img src={emptyBox} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommisionHistory;
