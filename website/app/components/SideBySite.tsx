

export function SideBySide({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                {children}
            </div>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}