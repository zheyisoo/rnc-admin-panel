import { DataTable } from "../../../../../components/dataTable";
import columns from "./columns";
import {TransactionWithFullDetails} from "@/lib/type";

type ItemsPageProps = {
  transactionsList: TransactionWithFullDetails[];
};

export const TransactionsDataTable = ({ transactionsList }: ItemsPageProps) => {

  return (
    <div>
      <DataTable columns={columns} data={transactionsList} />
    </div>
  );
};

export default TransactionsDataTable;
