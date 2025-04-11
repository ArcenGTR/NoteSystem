import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets"
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults"

export const metadata = {
    title: 'Ticket Search',
}

export default async function Tickets({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined}>;
}) {
    const { searchText } = await searchParams;

    if (!searchText) {

        const result = await getOpenTickets()

        return (
            <>
                {console.log("21321231312")}
                <TicketSearch />
                <p>{JSON.stringify(result)}</p>
            </>
        )
    }

    const result = await getTicketSearchResults(searchText)

    return (
        <>
            <TicketSearch />
            <p>{JSON.stringify(result)}</p>
        </>
    )
}