function CartItem({item,updateCart,removeItem}) {
    return (<tr>
                <td><button type="button" className="btn btn-sm" onClick={()=>{removeItem(item)}}>x</button></td>
                <td>{item.name}</td>
                <td><small>{item.description}</small></td>
                <td>
                  <select className="form-select" value={item.quantity} onChange={(e)=>{
                      item.quantity = e.target.value
                      updateCart(item,e.target.value)
                    }}>
                     {[...Array(10).keys()].map((item) => {
                      return (<option value={item + 1} key={item}>{item + 1}</option>)
                    })}
                  </select>
                </td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
              </tr>)
  }

  export default CartItem;