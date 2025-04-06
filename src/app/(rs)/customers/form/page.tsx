import { getCustomer } from "@/lib/queries/getCustomers";
import BackButton from "@/components/BackButton";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";


export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined}> }) {
    const { customerId } = await searchParams;
    
    if (customerId) {
        return {
            title: `Edit Customer ${customerId}`,
            description: `Edit customer with ID ${customerId}`,
        };
    } else {
        return {
            title: "Add Customer",
            description: "Add a new customer",
        };
    }
}

export default async function CustomerFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined}>;
}) {

    try {

        const { customerId } = await searchParams;

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
            
            console.log(customer); 

            return <CustomerForm customer={customer}/>

        } else {
            return <CustomerForm />
        }
        
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }
}