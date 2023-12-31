import { db } from "./db";
import {OrderWithFullDetails} from "./type"; 

export const getOrdersWithCartItemsAndItems = async () => {
    try {
        const orders = await db.order.findMany({
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
                user: true,
            },
        });
        return orders as OrderWithFullDetails[];
    }catch
    (error) {
        return []
    }
}
