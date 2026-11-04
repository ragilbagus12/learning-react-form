function FormInput({ label, name, error, ...props }) {
    const inputId = `field-${name}`;
    const errorId = `${inputId}-error`;

    return (
        <div className="mb-4 grid gap-1.5">
            <label
            htmlFor={inputId}
            className="text-sm font-semibold text-gray-700"
            >
                {label}
            </label>

            <input 
                id={inputId}
                name={name}
                aria-invalid={error ? "true" : "false"} 
                aria-describedby={error ? errorId : undefined}
                {...props}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200 aria-invalid:border-red-600"
            />

            {error && (
                <p id={errorId} role="alert" className="text-xs font-semibold text-red-700">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormInput;