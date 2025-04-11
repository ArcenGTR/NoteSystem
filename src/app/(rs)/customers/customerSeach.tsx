import Form from "next/Form"
import { Input } from "@/components/ui/input" 
import searchButton from "@/components/SearchButton"
import SearchButton from "@/components/SearchButton"

export default function CustomerSearch() {
    return (
        <Form 
            action="/customers"
            className="flex gap-2 items-center"    
        >
            <Input 
                name="searchText"
                type="text"
                placeholder="Search Customers"
                className="w-full"

            />
            <SearchButton />

        </Form>
    )
}
