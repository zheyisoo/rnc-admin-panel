"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../../components/dataTableColumnHeader";
import { Order, CartItem, Item, User } from "@prisma/client";
import {CartItemswithItemsType} from "@/lib/type"
import { Checkbox } from "@/components/ui/checkbox";
import { statuses } from "@/lib/data";
import Image from "next/image"
import { cn } from "@/lib/utils"


const columns: ColumnDef<Item>[] = 
[
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("category")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("price")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("quantity")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "imageUrls",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => <div className="w-[100px]">
      {/* <img src={row.getValue("imageUrls")}/> */}
      <Image
        src={row.getValue("imageUrls")}
        alt={row.getValue("imageUrls")}
        width={200}
        height={200}
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105",
          // aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      />
      </div>,
    enableSorting: true,
    enableHiding: true,
  }
];

export default columns;
