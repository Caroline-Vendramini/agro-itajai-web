export const getDataFromCaixa = (caixa) => {
  const orders = caixa.Orders;
  let moneyOrders = 0;
  let discount = 0;
  const totalPrice = caixa.amount;
  let totalCost = 0;
  const ordersByPaymentMethod = orders.reduce((acc, curr) => {
    const paymentMethod = curr.PaymentType?.name;
    if (!acc[paymentMethod]) {
      acc[paymentMethod] = 0;
    }
    if (paymentMethod === "Dinheiro") {
      moneyOrders += curr.total;
    }
    totalCost = curr.Items?.reduce((a, c) => a + c.unitCost * c.quantity, 0);
    discount += curr.discount;
    acc[paymentMethod] += curr.total;
    return acc;
  }, {});

  const debitPaymentsToday = caixa.DebitPayment.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const ordersByPaymentMethodForTheDay = Object.entries(
    ordersByPaymentMethod
  ).map(([item, value]) => ({
    item,
    value,
  }));
  return {
    totalPrice,
    totalCost,
    discount,
    debitPaymentsToday,
    moneyOrders,
    ordersByPaymentMethodForTheDay,
  };
};

export const seeBalanceDetails = (caixa) => {
  console.log(caixa);
  const {
    totalPrice,
    totalCost,
    discount,
    debitPaymentsToday,
    moneyOrders,
    ordersByPaymentMethodForTheDay,
  } = getDataFromCaixa(caixa);
  return {
    totalPrice,
    totalCost,
    discount,
    date: caixa.date,
    debitPaymentsToday,
    moneyOrders,
    ordersByPaymentMethodForTheDay,
    balanceId: caixa.id,
    closed: caixa.closed,
  };
};
