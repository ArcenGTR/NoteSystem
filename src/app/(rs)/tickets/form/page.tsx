import { getCustomer } from '@/lib/queries/getCustomers'; 
import { getTicket } from '@/lib/queries/getTickets';
import BackButton from "@/components/BackButton";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init as kindeInit } from '@kinde/management-api-js';
import { get } from 'http';
import { desc, is } from 'drizzle-orm';

export const generateMetadata = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined}> }) => {
    const { customerId, ticketId } = await searchParams;
    const title = customerId ? `Customer ${customerId}` : ticketId ? `Ticket ${ticketId}` : "New Ticket Form";
    return {
        title: title,
        description: "Create a new ticket or edit an existing one",
    }
}

export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined}>;
}) {
    try {

        const { customerId, ticketId } = await searchParams;

        if (!customerId && !ticketId) {
            return (
                <div className="flex flex-col items-center h-screen">
                    <h2 className="text-2xl mb-2">Ticket not found</h2>
                    <p className="mb-4">Ticket ID or Customer Id is requred</p>
                    <BackButton title="Go Back" variant={"default"}></BackButton>
                </div>
            )
        }

        const { getPermission, getUser } = getKindeServerSession();
        const [managerPermission, user] = await Promise.all([
            getPermission("manager"),
            getUser()
        ]);

        const isManager = managerPermission?.isGranted ?? false;

        if (customerId) {

            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <div className="flex flex-col items-center h-screen">
                        <h2 className="text-2xl mb-2">Customer not found</h2>
                        <p className="mb-4">No customer found with ID {customerId}</p>
                        <BackButton title="Go Back" variant={"default"}></BackButton>
                    </div>
                )
            }

            if (!customer.active) {
                return (
                    <div className='flex flex-col items-center h-screen'>
                        <h2 className="text-2xl mb-2">Customer is not active</h2>
                        <p className="mb-4">Customer with ID {customerId} is not active</p>
                        <BackButton title="Go Back" variant={"default"}></BackButton>
                    </div>
                )
            }

            console.log(customer);

            if (isManager) {
                kindeInit();
                const { users } = await Users.getUsers();

                const techs = users ? users.map((user) => {
                    return {
                        id: user.email!,
                        description: user.email!,
                    }
                }) : [];

                return <TicketForm customer={customer} techs={techs} />

            } else {
                return <TicketForm customer={customer} />
            }
        }

        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));
            console.log(ticket);

            if (!ticket) {
                return (
                    <div className="flex flex-col items-center h-screen">
                        <h2 className="text-2xl mb-2">Ticket not found</h2>
                        <p className="mb-4">No ticket found with ID {ticketId}</p>
                        <BackButton title="Go Back" variant={"default"}></BackButton>
                    </div>
                )
            }

            const customer = await getCustomer(ticket.customerId);


            if (isManager) {
                kindeInit(); // Kinde init is required to use the Kinde API
                const { users } = await Users.getUsers();

                const techs = users ? users.map((user) => {
                    return {
                        id: user.email!,
                        description: user.email!,
                    }
                }) : [];

                return <TicketForm customer={customer} ticket={ticket} techs={techs} />

            } else {
                const isEditable = ticket.tech.toLowerCase() === user.email?.toLowerCase();
                
                return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable}/>

                
            }
        }

    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }
}