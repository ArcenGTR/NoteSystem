"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    message: string,
    disabled?: boolean,
}

export default function CheckBoxWithLabel<S>({ fieldTitle, nameInSchema, message, disabled = false }: Props<S>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                    <FormControl>
                        <Checkbox id={nameInSchema} checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                    </FormControl>
                    <FormLabel htmlFor={nameInSchema} className="text-base">
                        {fieldTitle}
                    </FormLabel>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}