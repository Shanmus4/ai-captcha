import React from 'react'

interface TextInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
    onSubmit?: () => void // New prop for handling submission
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    placeholder,
    disabled = false,
    onSubmit
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            onSubmit && onSubmit(); // Call onSubmit prop if it exists
        }
    };

    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown} // Add onKeyDown handler
            placeholder={placeholder}
            disabled={disabled}
            className="input-field resize-none"
            rows={3}
            maxLength={500}
        />
    )
}

export default TextInput 