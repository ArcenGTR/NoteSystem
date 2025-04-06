import { metadata } from './../app/layout';
import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"
import * as Sentry from "@sentry/nextjs"
import { error } from 'console';
import { Database } from 'lucide-react';
import { DatabaseError } from '@neondatabase/serverless';

export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        })
    },
    handleServerError(e, utils) {
        const { clientInput, metadata } = utils;

        Sentry.captureException(e, (scope) => {
            scope.clear();
            scope.setContext('serverError', {message: e.message});
            scope.setContext('metadata', {actionName: metadata?.actionName});
            scope.setContext('clientInput', {clientInput: clientInput});

            return scope;
        })

        if (e instanceof DatabaseError) {
            return "Database error, your data is not saved.";
        }

        return e.message;
    }
});