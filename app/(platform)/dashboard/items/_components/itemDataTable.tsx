"use client"

import { Item } from "@prisma/client";
import { DataTable } from "../../../../../components/dataTable";
import columns from "./columns";
import ItemDetail from "./itemDetail";
import { useState } from "react";

type ItemsPageProps = {
  itemList: Item[];
};

export const ItemDataTable = ({ itemList }: ItemsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Track selected item

  const handleClick = (item: Item) => {
    setSelectedItem(item); // Set the selected item when a row is clicked
  }

  return (
    <div>
      <DataTable columns={columns} data={itemList}   onRowClick={(original) => {handleClick(original)}}/>
      {selectedItem && (
        <ItemDetail item={selectedItem}/>
      )}
    </div>
  );
};

export default ItemDataTable;
