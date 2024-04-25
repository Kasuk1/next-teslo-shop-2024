'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100; // 123.33

  if (isPending) {
    return (
      <div className='animate-pulse mb-14'>
        <div className='h-11 bg-gray-300 rounded' />
        <div className='h-11 bg-gray-300 rounded mt-4' />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
            currency_code: 'USD',
          },
        },
      ],
    });

    const { ok } = await setTransactionId(transactionId, orderId);

    if (!ok) {
      throw new Error('Error when try to update the order');
    }

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    console.log('onApprove');
    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className='relative z-0'>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
