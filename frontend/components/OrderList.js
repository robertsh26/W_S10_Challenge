// src/components/OrderList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, setSizeFilter } from '../state/actions';

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const sizeFilter = useSelector((state) => state.sizeFilter);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => sizeFilter === 'All' || order.size === sizeFilter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
      {
        filteredOrders.map((order) => (
          <li key={order?.id}>
            <div>
            {order?.customer} ordered a size {order?.size} with {order?.toppings ? (order?.toppings?.length === 0 ? 'no toppings' : `${order?.toppings?.length} topping${order?.toppings?.length === 1 ? '' : 's'}`) : 'no toppings'}
            </div>
          </li>
          ))
      }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => {
          const className = `button-filter${size === sizeFilter ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(setSizeFilter(size))}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
