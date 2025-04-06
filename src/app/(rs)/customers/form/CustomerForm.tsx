"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { insertCustomerSchemaType, customerInsertSchema, customerSelectSchema, selectCustomerSchemaType } from "@/app/zod-schemas/customer"
import InputWithLable from "@/components/inputs/InputWithLabel"
import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel"
import SelectWithLabel from "@/components/inputs/SelectWithLabel"
import CheckBoxWithLabel from "@/components/inputs/CheckBoxWithLable"
import { StatesArray } from "@/app/constants/StatesArray"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { is } from "drizzle-orm"

type Props = {
    customer?: selectCustomerSchemaType
}

export default function CustomerForm({ customer }: Props) {

    const { getPermission, getPermissions, isLoading } = useKindeBrowserClient()
    const isManager = !isLoading && getPermission("manager")?.isGranted;

    const defaultValues: insertCustomerSchemaType = {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true,
    }

    const form = useForm<insertCustomerSchemaType>({
        resolver: zodResolver(customerInsertSchema),
        defaultValues: defaultValues,
        mode: "onBlur",
    });

    async function onSubmit(data: insertCustomerSchemaType) {
        console.log("Customer data", data);
    }


    return (
        <>
            <div className="flex flex-col gap-4 sm:px-8 pb-4">
                <div>
                    <h2 className="text-2xl font-bold">
                        {customer?.id ? "Edit" : "New"} Customer {customer?.id ? `# ${customer.id}` : "Form"}
                    </h2>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 md:gap-8">

                        <div className="flex flex-col gap-2 w-full max-w-xs">
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="First Name" nameInSchema="firstName" className="w-full max-w-xs" />
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="Last Name" nameInSchema="lastName" className="w-full max-w-xs" />
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="Address 1" nameInSchema="address1" className="w-full max-w-xs" />
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="Address 2" nameInSchema="address2" className="w-full max-w-xs" />
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="City" nameInSchema="city" className="w-full max-w-xs" />
                            <SelectWithLabel fieldTitle="State" nameInSchema="state" data={StatesArray} />
                        </div>

                        <div className="flex flex-col gap-2 w-full max-w-xs">
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="Zip Code" nameInSchema="zip" className="w-full max-w-xs" />
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="Email" nameInSchema="email" className="w-full max-w-xs" />
                            <InputWithLable<insertCustomerSchemaType> fieldTitle="Phone" nameInSchema="phone" className="w-full max-w-xs" />

                            <TextAreaWithLabel<insertCustomerSchemaType> fieldTitle="Notes" nameInSchema="notes" className="h-20" />


                            {isManager ? <CheckBoxWithLabel<insertCustomerSchemaType> fieldTitle="Active" nameInSchema="active" message={""} /> : null}

                            <div className="flex gap-2">
                                <Button type="submit" className="w-3/4" variant="default" title="Save">
                                    Save
                                </Button>

                                <Button type="button" variant="destructive" title="Reset" onClick={() => form.reset(defaultValues)}>
                                    Reset
                                </Button>
                            </div>
                        </div>

                    </form>
                </Form>
            </div>

            
        </>
        
    )
}
