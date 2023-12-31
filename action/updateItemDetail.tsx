"use server";

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { Item } from '@prisma/client';
import { revalidatePath } from 'next/cache'
import { getSelf } from '@/lib/authService';

const updateItemDetail = async (item:Item,userId:string) => {
    try {
        const curItem = await db.item.findUnique({
            where: {
                id: item.id
            }
        })
        let quantityDiff = 0
        if(curItem && curItem.quantity !== null){
            quantityDiff = item.quantity - curItem.quantity
        }
        const newItem = await db.item.update({
            where: {
                id: item.id
            },
            data: {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
                imageUrls: item.imageUrls,
            },
        });
        if(quantityDiff !== 0){
            const newTransaction = await db.transaction.create({
                data: {
                    itemId: item.id,
                    quantity: quantityDiff,
                    updatedBy: userId || "unknown",
                    updatedById: 1,
                },
            });
        }
        revalidatePath('/dashboard/transactions')
        revalidatePath('/dashboard/items')
        return newItem;
    } catch (error) {
        console.error('Error update item:',item.id, error);
        throw error;
    }
};

export default updateItemDetail;
