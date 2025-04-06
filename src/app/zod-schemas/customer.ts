import { createInsertSchema,  createSelectSchema} from 'drizzle-zod';
import { customers } from "@/db/schema";

export const customerInsertSchema = createInsertSchema(customers, {
    firstName: (schema) => schema.min(1, "First name is required"),
    lastName: (schema) => schema.min(1, "Last name is required"),
    address1: (schema) => schema.min(1, "Address is required"),
    city: (schema) => schema.min(1, "City is required"),
    state: (schema) => schema.length(2, "State must be 2 characters"),
    email: (schema) => schema.email("Invalid email address"),
    zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, "Invalid zip code, use XXXXX or XXXXX-XXXX format"),
    phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}?$/, "Invalid phone number, use XXX-XXX-XXXX format"),
});

export const customerSelectSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof customerInsertSchema._type;
export type selectCustomerSchemaType = typeof customerSelectSchema._type;
