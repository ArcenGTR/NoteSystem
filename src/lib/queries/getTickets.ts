import db from '@/db';
import { customers, tickets } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getTicket(id: number) {
  const ticket = await db.select().from(tickets).where(eq(tickets.id, id)).execute();

  return ticket[0];
    
}
