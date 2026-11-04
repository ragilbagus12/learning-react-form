function FormInput({ label, name, error, ...props }) {
    const inputId = `field-${name}`;
    const errorId = `${inputId}-error`;

    return (
        <div>
            <label
            htmlFor={inputId}
            >
                {label}
            </label>
        </div>
    )
}