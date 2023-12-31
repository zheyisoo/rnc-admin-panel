import React from 'react';
import { db } from '@/lib/db';
import { AddNewItem } from './_components/addNewItem';
import ItemList from './_components/ItemList';
import ItemDataTable from './_components/itemDataTable';
  
const ItemsPage = async () => {

    const items = await db.item.findMany()

    return (
    <div className='flex-col'>
        <div className="flex">
            <div className="flex-grow">
            </div>
            <div className='pr-8'>
                <AddNewItem/>
            </div>
      </div>
      <div className='px-20 py-8'>
        <ItemDataTable itemList={items}/>
      </div>
    </div>
    );
  };
  
export default ItemsPage;
