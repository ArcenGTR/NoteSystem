"use client"    

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ButtonHTMLAttributes } from 'react';

type Props = {
    title: string,
    className?: string,
    variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link" | null | undefined,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({ title, className, variant, ...props }: Props) {
    const router = useRouter();

    return (
        <Button
            variant={variant}
            className={className}
            onClick={() => router.back()}
            {...props}
        >
            {title}
        </Button>
    )
}