import db from "@/db"
import { customers } from "@/db/schema"
// insensitive like
import { ilike, or, sql } from "drizzle-orm"

export async function getCustomerSearchResult(searchText: string) {

    const result = await db.select()
        .from(customers)
        .where(
            or(
                ilike(customers.firstName, `%${searchText}%`),
                ilike(customers.lastName, `%${searchText}%`),
                ilike(customers.email, `%${searchText}%`),
                ilike(customers.phone, `%${searchText}%`),
                //ilike(customers.address1, `%${searchText}%`),
                //ilike(customers.address2, `%${searchText}%`),
                ilike(customers.city, `%${searchText}%`),
                //ilike(customers.state, `%${searchText}%`),
                ilike(customers.zip, `%${searchText}%`),
                //ilike(customers.notes, `%${searchText}%`),
                sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`
            ))

    return result;
}