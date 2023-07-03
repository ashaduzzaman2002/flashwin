import { useEffect, useState } from "react";
import { dbObject } from "../../helper/constant";

const WithdrawHistory = () => {

    const [withdrawList, setWithdrawList] = useState([]);

    const fetchWithdrawList = async () => {
        try {
            const { data } = await dbObject.post("/withdraw/history");
            if (!data.error) {
                console.log(data);
                setWithdrawList(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWithdrawList();
    }, []);


    return (
        <>
            <h1>Withdraw History Page</h1>
            <div>
                {withdrawList.map(items => {
                    return (
                        <div key={items.id}>
                            <h2>Id: {items.id}</h2>
                            <h2>Request Id: {items.request_id}</h2>
                            <h2>Amount: {items.amount}</h2>
                            <h2>Is Approved: {items.is_approved}</h2>
                            <h2>User Id: {items.user_id}</h2>
                            <h2>Date: {items.date}</h2>
                            <hr />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default WithdrawHistory;