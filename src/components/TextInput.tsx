import React from 'react'

interface TextInputProps {
    value: string
    onChange: (value: string) => void
    placeholder: string
    disabled?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    placeholder,
    disabled = false
}) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="input-field resize-none"
            rows={3}
            maxLength={500}
        />
    )
}

export default TextInput 