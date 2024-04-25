import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getOrderById } from '@/actions';
import { OrderStatus, PaypalButton, Title } from '@/components';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  const { order, ok } = await getOrderById(id);

  if (!ok || !order) {
    redirect('/orders');
  }

  const { id: orderId, itemsInOrder, subTotal, tax, total, isPaid } = order;
  const {
    firstName,
    lastName,
    address,
    address2,
    city,
    countryId,
    postalCode,
    phone,
  } = order.OrderAddress!;

  return (
    <div className='flex justify-center items-center mb-72'>
      <div className='flex flex-col w-[1000px]'>
        <Title
          title={`Order detail information`}
          subtitle={`You can see all the updated information of the order #${orderId
            .split('-')
            .at(-1)}.`}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={isPaid} />

            {/* Items*/}
            <div className='flex flex-col gap-5'>
              {order.OrderItem.map(
                ({
                  product: { title, ProductImage, slug },
                  price,
                  quantity,
                  size,
                }) => (
                  <div key={`${slug}-${size}`} className='flex'>
                    <Image
                      src={`/products/${ProductImage[0].url}`}
                      width={100}
                      height={100}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      alt={title}
                      className='mr-5 rounded'
                    />
                    <div>
                      <p>
                        {title} - {size}
                      </p>
                      <p className='font-bold'>
                        Subtotal: {price} x {quantity} = $
                        {currencyFormat(price * quantity)}
                      </p>

                      <button className='underline mt-3'>Remove</button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Order address</h2>
            <div className='mb-5'>
              <p className='text-xl'>
                {firstName} {lastName}
              </p>
              <p>{address}</p>
              <p>{address2}</p>
              <p>
                {city}, {countryId}
              </p>
              <p>{postalCode}</p>
              <p>{phone}</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-5' />

            <h2 className='text-2xl mb-2'>Order summary</h2>
            <div className='grid grid-cols-2'>
              <span>No. Products</span>
              <span className='text-right'>
                {itemsInOrder === 1 ? '1 article' : `${itemsInOrder} articles`}
              </span>

              <span>Subtotal</span>
              <span className='text-right'>{currencyFormat(subTotal)}</span>

              <span>Tax (15%)</span>
              <span className='text-right'>{currencyFormat(tax)}</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-2xl text-right'>
                {currencyFormat(total)}
              </span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              {isPaid ? (
                <OrderStatus isPaid={isPaid} />
              ) : (
                <PaypalButton amount={order.total} orderId={order.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
