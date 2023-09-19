import { useEffect, useState } from "react";
import { dbObject } from "../../helper/constant";
import "./rechargehistory.css";
import { upi } from "../../assets";
import Header from "../../components/Header";

const RechargeHistory = () => {
  const [rechargeList, setRechargeList] = useState([]);

  const fetchRechargeList = async () => {
    try {
      const { data } = await dbObject.get("/payment/deposit/history");
      if (!data.error) {
        setRechargeList(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRechargeList();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: "0px" }}>
      <div className="recharge-history-container">
        <Header path="/recharge" title="Recharge" />
        <div className="recharge-history-card-group">
          {rechargeList.map((items) => (
            <Card
              key={items.id}
              orderId={items.orderId}
              amount={items.amount}
              date={items.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ orderId, amount, date }) => (
  <div className="recharge-history-card">
    <div className="top">
      <div>
        <p>{orderId}</p>
      </div>

      <img src={upi} alt="" />
    </div>

    <div className="bottom">
      <div className="amount">
        <p>{Number(amount).toFixed(2)}</p>points
      </div>
      <p style={{ color: "#dbdbdb" }}>{date}</p>
    </div>
  </div>
);

export default RechargeHistory;
