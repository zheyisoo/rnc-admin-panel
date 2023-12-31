"use server";

import { db } from '@/lib/db';
import { Item } from '@prisma/client';
import { revalidatePath } from 'next/cache'

const addNewItem = async (item:Item) => {
    try {
        const newItem = await db.item.create({
            data: {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
                imageUrls: item.imageUrls,
            },
        });
        revalidatePath('/dashboard/items')
        return newItem;
    } catch (error) {
        console.error('Error adding new item:', error);
        throw error;
    }
};

export default addNewItem;
