import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

export const ticketInsertSchema = createInsertSchema(tickets, {
    id: z.union([z.number(), z.literal("(New)")]), 
    title: (schema) => schema.min(1, "Title is required"),
    description: (schema) => schema.min(1, "Description is required"),
    tech: (schema) => schema.email("Invalid email address"),
});

export const ticketSelectSchema = createSelectSchema(tickets);

export type insertTicketSchemaType = typeof ticketInsertSchema._type;
export type selectTicketSchemaType = typeof ticketSelectSchema._type;
