import React from 'react';
import { db } from '@/lib/db';
import TransactionsDataTable from './_components/transactionsOrderTable';


const TransactionsPage = async () => {
  const Transactions = await db.transaction.findMany({
    include:{
      item:true
    }
  })

  return (
    <div className='px-20 py-8'>
      <TransactionsDataTable transactionsList={Transactions}/>
    </div>
  );
};

export default TransactionsPage;
