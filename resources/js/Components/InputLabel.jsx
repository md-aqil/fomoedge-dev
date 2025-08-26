export default function InputLabel({ value, additionalInfo = '', isRequired = false, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 dark:text-gray-300 relative` + className}>
            {value ? value : children}
            {isRequired && <sup className="text-red-600">*</sup>} {additionalInfo && <small>{additionalInfo}</small>}
        </label>
    );
}
