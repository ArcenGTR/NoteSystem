import CustomerSearch from "./customerSeach";
import { getCustomerSearchResult } from "@/lib/queries/getCustomerSearchResults";
import * as Senty from "@sentry/nextjs"
import CustomerTable from "./CustomerTable";

export const metadata = {
    title: 'Customer search',
}

export default async function Customers({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined}>;
}) {

    const { searchText } = await searchParams;

    if (!searchText) {
        return <CustomerSearch />
    }

    const span = Senty.startInactiveSpan({
        name: 'getCustomerSearchResult-2'   
    })

    const results = await getCustomerSearchResult(searchText);
    
    span.end();

    return (
        <>
            <CustomerSearch />
            {results.length ? <CustomerTable data={results} /> : (<p className="mt-4">No results found</p>)}
        </>
        
    );
}