"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { insertTicketSchemaType, selectTicketSchemaType, ticketInsertSchema, ticketSelectSchema } from "@/app/zod-schemas/ticket"
import { selectCustomerSchemaType } from "@/app/zod-schemas/customer"

import { useAction } from "next-safe-action/hooks"
import { saveTicketAction } from "@/app/actions/saveTicketAction"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

import InputWithLable from "@/components/inputs/InputWithLabel"
import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel"
import SelectWithLabel from "@/components/inputs/SelectWithLabel"
import CheckBoxWithLabel from "@/components/inputs/CheckBoxWithLable"

type Props = {
    customer?: selectCustomerSchemaType,
    ticket?: selectTicketSchemaType,
    techs?: {
        id: string,
        description: string,
    }[]
    isEditable? : boolean,
}

export default function TickertForm({customer, ticket, techs, isEditable = true}: Props) {

    const isManager = Array.isArray(techs);

    const defaultValues: insertTicketSchemaType = {
        id: ticket?.id ?? "(New)",
        customerId: ticket?.customerId ?? customer?.id ?? 0, 
        title: ticket?.title ?? "",
        description: ticket?.description ?? "",
        completed: ticket?.completed ?? false,
        tech: ticket?.tech ?? "new-ticket@example.com",
    }

    const form = useForm<insertTicketSchemaType>({
        resolver: zodResolver(ticketInsertSchema),
        defaultValues: defaultValues,
        mode: "onBlur",
    });

    async function onSubmit(data: insertTicketSchemaType) {
        console.log("Ticket data", data);
        executeSave(data);
    }

    const { execute: executeSave,
                result: saveResult,
                isExecuting: isSaving,
                reset: resetSaveAtion 
            } = useAction(saveTicketAction, { 
                onSuccess({ data }) {
                    toast("Success!", {
                        description: data?.message
                    });
                },
                onError({ error }) {
                    toast.error("Error", {
                        description: "Save failed"
                    });
                }
            
            })


    return (
        <>
            <div className="flex flex-col gap-1 sm:px-8">
                <DisplayServerActionResponse result={saveResult} />
                <div className="text-2xl font-bold">
                    {ticket?.id && isEditable ? `Edit Ticket # ${ticket.id}` : ticket?.id ? `View ticket # ${ticket.id}` : "New Ticket Form"}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 md:gap-8">

                        <div className="flex flex-col gap-2 w-full max-w-xs">
                            <InputWithLable<insertTicketSchemaType> fieldTitle="Title" nameInSchema="title" className="w-full max-w-xs" disabled={!isEditable} />  

                            {isManager ? (
                                <SelectWithLabel<insertTicketSchemaType> 
                                fieldTitle="Tech" 
                                nameInSchema="tech" 
                                data={[{ id: 'new-ticket@example.com', description: 'new-ticket@example.com' }, ...techs!]} 
                                className="w-full max-w-xs" 
                                />
                            ) : (
                                <InputWithLable<insertTicketSchemaType> 
                                fieldTitle="Tech" 
                                nameInSchema="tech" 
                                className="w-full max-w-xs" 
                                disabled={true} />  
                            )} 
                            
                            {ticket?.id ? (
                                <CheckBoxWithLabel<insertTicketSchemaType> 
                                fieldTitle="Completed" 
                                nameInSchema="completed" 
                                message="Yes"
                                disabled={!isEditable}
                                />
                            ) : null}
                            
                            <div className="mt-2 space-y-2">
                                <h3 className="text-lg">Customer info</h3>
                                <hr className="w-4/5" />
                                <p>{customer?.firstName} {customer?.lastName}</p>
                                <p>{customer?.address1}</p>
                                {customer?.address2 ? <p>{customer.address2}</p> : null}
                                <p>{customer?.city}, {customer?.state} {customer?.zip}</p>
                                <hr className="w-4/5" />
                                <p>Phone: {customer?.phone}</p>
                            </div> 
                        </div>     

                        <div className="flex flex-col gap-2 w-full max-w-xs">
                            <TextAreaWithLabel<insertTicketSchemaType> 
                            fieldTitle="Description" 
                            nameInSchema="description" 
                            className="w-full max-w-xs h-96" 
                            rows={4} 
                            disabled={!isEditable}/>   
                            
                            {isEditable ? (
                                <div className="flex gap-2">
                                <Button type="submit" className="w-3/4" variant="default" title="Save" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <LoaderCircle className="animate-spin" /> Saving
                                        </>
                                    ) : "Save"}
                                </Button>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    title="Reset"
                                    onClick={() => {
                                        form.reset(defaultValues)
                                        resetSaveAtion()
                                    }}>
                                    Reset
                                </Button>
                            </div> 
                            ) : null}
                                        
                        </div>


                    </form>
                </Form>
            </div>

            
        </>
    )

}