import React, { useEffect } from 'react';
import { db } from '@/lib/db';
import CartItemList from './_components/cartItemList';
  
const ItemsPage = async () => {

    const items = await db.item.findMany()
    const orderWithCartItemsAndItems = await db.order.findMany({
      include: {
        items: {
          include: {
            item: {
            },
          },
        },
      },
    });

    console.log("orderWithCartItemsAndItems", orderWithCartItemsAndItems)

    return (
    <div className='flex-col'>
        <div className="flex">
            <div className="flex-grow">
            </div>
      </div>
      <div className='px-20 py-8'>
        <CartItemList itemList={orderWithCartItemsAndItems}/>
      </div>
    </div>
    );
  };
  
export default ItemsPage;
