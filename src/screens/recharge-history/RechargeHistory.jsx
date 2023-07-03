import { useEffect, useState } from "react";
import { dbObject } from "../../helper/constant";

const RechargeHistory = () => {

    const [rechargeList, setRechargeList] = useState([]);

    const fetchRechargeList = async () => {
        try {
            const { data } = await dbObject.get("/payment/deposit/history");
            if (!data.error) {
                // console.log(data);
                setRechargeList(data.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRechargeList();
    }, []);


    return (
        <>
            <h1>Recharge History Page</h1>
            <div>
                {rechargeList.map(items => {
                    return (
                        <div key={items.id}>
                            <h2>Id: {items.id}</h2>
                            <h2>OrderId: {items.orderId}</h2>
                            <h2>Amount: {items.amount}</h2>
                            <hr />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default RechargeHistory;