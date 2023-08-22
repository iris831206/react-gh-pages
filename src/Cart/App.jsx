import React, { useState, useEffect } from 'react';
import data from "./MenuData";
import Product from './Product';
import CartItem from './CartItem';
import Order from './Order';

function App() {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [order, setOrder] = useState({
    cart: []
  });
  const [message, setMessage] = useState('')

  //箭頭函數 (item) => { return item.name === product.name }
  //接受一個參數 item，表示 cart 陣列中的每個元素，然後檢查該元素的 name 屬性是否與傳入的 product 的 name 屬性相等。
  //如果相等，就返回 true，表示找到了匹配的商品，否則返回 false，表示沒有找到匹配的商品。
  //findIndex 方法會在陣列中找到第一個返回 true 的元素，並返回其索引。
  //findIndex 是陣列的method，用於查找滿足條件的元素在陣列中的索引，如果找不到滿足條件的元素，則返回 -1。
  const addToCart = (product) => {
    const searchIndex = cart.findIndex((item) => { return item.name === product.name });
    //(else)商品不存在時新增商品
    //(if)如果加入進來的商品有 id 相同就只更改商品數量
    if (searchIndex !== -1) {
      const targetItem = cart[searchIndex]
      targetItem.quantity = targetItem.quantity + 1
      targetItem.subtotal = targetItem.quantity * targetItem.price
      setCart([...cart])
    } else {
      setCart([...cart, {
        ...product,
        id: new Date().getTime(),
        quantity: 1,
        subtotal: product.price,
      }])
    }
  }

  const updateCart = (item, value) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: parseInt(value),
          subtotal: cartItem.price * parseInt(value)
        }
      }
      return cartItem
    })
    setCart(newCart)
  }
  const removeItem = (item) => {
    console.log(item)
    const newCart = cart.filter((cartItem) => {
      return cartItem.id !== item.id
    })
    setCart(newCart)
  }
  const createOrder = () => {
    setOrder({
      cart,
      message,
      cart,
      sum
    })
    setCart([])
    setMessage('')
  }
  useEffect(() => {
    const total = cart.reduce((pre, next) => {
      return pre + next.subtotal
    }, 0)
    setSum(total)
  }, [cart])


  return (
    <>
      <div className="container-fuild mt-5 mx-5">
        <div className="row">
          <div className="col-md-4">
            <div className="list-group">
              {
                data.map((item) => {
                  return (<Product product={item} addToCart={addToCart} />)
                })
              }
            </div>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" width="50">操作</th>
                  <th scope="col">品項</th>
                  <th scope="col">描述</th>
                  <th scope="col" width="90">數量</th>
                  <th scope="col">單價</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (<CartItem item={item} updateCart={updateCart} removeItem={removeItem} />)
                })}
              </tbody>
            </table>
            {cart.length === 0 ? <div className="alert alert-primary text-center" role="alert">
              請選擇商品
            </div> : <><div className="text-end mb-3">
              <h5>總計: <span>${sum}</span></h5>
            </div>
              <textarea
                className="form-control mb-3"
                rows="3"
                placeholder="備註"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
              ></textarea>
              <div className="text-end">
                <button className="btn btn-primary" onClick={createOrder}>送出</button>
              </div></>}

          </div>
        </div>
        <hr />
        <div className='col-12'>
          <Order order={order} />
        </div>
      </div>

    </>
  );
}

export default App;

