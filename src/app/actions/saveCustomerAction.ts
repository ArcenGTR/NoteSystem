"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
import { redirect } from "next/navigation"

// import { db } from "@/db"
import { customers } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import { type insertCustomerSchemaType, customerInsertSchema } from "../zod-schemas/customer"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const saveCustomerAction = actionClient
    .metadata({actionName: "saveCustomerAction"})
    .schema(customerInsertSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: customer
    } : {
        parsedInput: insertCustomerSchemaType
    }) => {

        const { isAuthenticated } = await getKindeServerSession()
        const isAuth = await isAuthenticated();

        if (!isAuth) {
            redirect("/login")
        }


    })
