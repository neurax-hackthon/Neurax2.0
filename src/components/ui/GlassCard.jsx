export default function GlassCard({ children, className = '', style = {} }) {
    return (
        <div className={`shadow-card ${className}`} style={style}>
            {children}
        </div>
    );
}
