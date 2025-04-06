export default function RootTemplate({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <div className="animate-appear">
            { /* Header */ } 
            <div className="px-4 py-2">
                {children}
            </div>

        </div>
    );
    }