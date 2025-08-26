export function TextMuted({ children, className = "" }) {
    return (
        <span className={`text-sm text-muted-foreground ` + className}>
            {children}
        </span>
    );
}
export function TextLarge({ children, className = "" }) {
    return (
        <div className={`font-bold capitalize ` + className}>{children}</div>
    );
}
