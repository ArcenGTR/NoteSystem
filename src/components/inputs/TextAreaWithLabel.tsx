"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage  } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { TextareaHTMLAttributes } from "react"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    className?: string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function TextAreaWithLabel<S>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className={`mb-12 ${className}`}>
                    <FormLabel className="text-base" htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
                    <FormControl>
                        <Textarea id={nameInSchema} className={`disabled:text-blue-500 dark:disabled:text-yellow-300 resize-none ${className}`} {...field} {...props} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}