import React from 'react'
import { ButtonState } from '../types/captcha'
import { Check, X, Loader2 } from 'lucide-react'

interface SubmitButtonProps {
    onClick: () => void
    state: ButtonState
    isLoading: boolean
    disabled: boolean
    buttonText: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    onClick,
    state,
    isLoading,
    disabled,
    buttonText
}) => {
    const getButtonIcon = () => {
        if (isLoading) return <Loader2 className="w-5 h-5 animate-spin" />
        if (state === 'success') return <Check className="w-5 h-5" />
        if (state === 'error') return <X className="w-5 h-5" />
        return null
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`submit-button ${state} flex items-center justify-center space-x-2`}
        >
            {getButtonIcon()}
            <span>{buttonText}</span>
        </button>
    )
}

export default SubmitButton 