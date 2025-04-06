"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form"
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"

type DataObject = {
    id: string,
    description: string
}

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    data: DataObject[],
    className?: string,
}

export default function SelectWithLabel<S>({ fieldTitle, nameInSchema, className, data, ...props }: Props<S>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel className="text-base" htmlFor={nameInSchema}> {fieldTitle}</FormLabel>

                    <Select {...field} onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger id={nameInSchema} className={`w-full max-w-sx ${className}`}>
                                <SelectValue placeholder={`Select ${fieldTitle.toLowerCase()}`} />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                            {data.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}