import React, { useEffect, useState } from 'react';
import { Order, useMyOrdersQuery } from 'src/generated/graphql';

export const useMyOrders = () => {
  const { data, loading } = useMyOrdersQuery();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (loading) return;
    if (data?.myOrders?.orders) {
      setOrders(data?.myOrders?.orders as Order[]);
    } else {
      setOrders([]);
    }
  }, [data, loading]);
  return [orders, setOrders] as const;
};
