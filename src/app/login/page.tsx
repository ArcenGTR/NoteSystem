import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <main>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Note System</h1>
                <p className="mb-4">Please log in to continue.</p>
                <LoginLink>
                    <Button>Login with e-mail</Button>
                </LoginLink>
            </div>
        </main>
        
    );
    }