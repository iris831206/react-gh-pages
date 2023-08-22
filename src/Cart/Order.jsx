const Order = ({ order }) => {
    return (
        <>
            {order.cart && order.cart.length > 0 ? (
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h5>訂單</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">品項</th>
                                        <th scope="col">數量</th>
                                        <th scope="col">小計</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.cart.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.subtotal}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="text-end mb-3">
                                備註：
                                <span className="ms-2">
                                    {order.message ? order.message : "無"}
                                </span>
                            </div>
                            <div className="text-end">
                                <h5>
                                    總計：<span>${order.sum}</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-primary text-center" role="alert">
                    尚未建立訂單！
                </div>
            )}
        </>
    );
};


export default Order;