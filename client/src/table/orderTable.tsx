import React, {useEffect, useState} from 'react';
import {buildLunchOrder, LunchOrder} from "../order/order";
import faker from "faker";



export function OrderTable(props:{client: WebSocket}) {
  const {client} = props;

  const defaultOrders: LunchOrder[] = [buildLunchOrder(faker.name.firstName(), faker.random.alphaNumeric(10))];
  const [lunchOrders, setLunchOrders] = useState(defaultOrders);


  useEffect(() => {
    client.onopen = () => {
      console.log("Connection Established");
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(`Message Found: ${data.lead.name}`);

      setLunchOrders(titleOrders => [
        ...titleOrders,
        buildLunchOrder(data.lead.name, data.lead.lunchOrderId)
      ]);
    }
  });

  return (
    <>
      <h3>Order Table</h3>
      <table>
        <thead>
        <tr>
          <th>OrderId</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {lunchOrders.map((item) => (
          <tr key={item.orderId}>
            <td>{item.orderId}</td>
            <td>{item.name}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </>
  )
}

