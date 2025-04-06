import { pgTable, serial, varchar, boolean, timestamp, integer, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone', { length: 20 }).unique(),
    address1: varchar('address1', { length: 255 }).notNull(),
    address2: varchar('address2', { length: 255 }),
    city: varchar('city', { length: 255 }).notNull(),
    state: varchar('state', { length: 2 }).notNull(),
    zip: varchar('zip', { length: 10 }).notNull(),
    notes: text('notes'),
    active: boolean('active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
})

export const tickets = pgTable('tickets', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    completed: boolean('completed').default(false).notNull(),
    tech: varchar('tech', { length: 255 }).default("Unassigned").notNull(),
    customerId: integer('customer_id').notNull().references(() => customers.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
})

// Relations

export const customersRelations = relations(customers, ({ many }) => ({
    tickets: many(tickets),
}))

export const ticketsRelations = relations(tickets, ({ one }) => ({
    customer: one(customers, {
        fields: [tickets.customerId],
        references: [customers.id],
    }),
}))