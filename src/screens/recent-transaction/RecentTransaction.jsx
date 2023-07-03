import { useEffect, useState } from "react";
import { dbObject } from "../../helper/constant";

const RecentTransaction = () => {

    const [transactionList, setTransactionList] = useState([]);

    const fetchTransactionList = async () => {
        try {
            const { data } = await dbObject.get("/wallet/transactions");
            // console.log(data);
            if (!data.error) {
                setTransactionList(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTransactionList();
    }, []);

    return (
        <>
            <h1>Recent Transaction Page</h1>
            <div>
                {transactionList.map(items => {
                    return (
                        <div key={items.id}>
                            <h2>Id: {items.id}</h2>
                            <h2>Source: {items.source}</h2>
                            <h2>Txn Id: {items.transaction_id}</h2>
                            <h2>Amount: {items.amount}</h2>
                            <h2>Type: {items.type}</h2>
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

export default RecentTransaction;