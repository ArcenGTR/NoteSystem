import { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

type props = {
    icon: LucideIcon;
    label: string;
    href?: string;

}

export default function NavButton({ icon: Icon, label, href }: props) {
    return ( 
        <Button variant="ghost"
                size="icon" 
                aria-label={label} 
                title={label} 
                className="rounded-full"
                asChild>

            {href ? (
                <Link href={href ? href : '/'}>
                    <Icon className="mr-2 h-4 w-4" />
                </Link>
            ) : (
                <Icon />
            ) }
        </Button>
    );
}