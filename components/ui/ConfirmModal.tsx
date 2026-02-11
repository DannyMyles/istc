'use client'

import { useEffect, useCallback } from 'react'
import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  HelpCircle,
  Loader2 
} from 'lucide-react'

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info' | 'success'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  loading?: boolean
  hideCancelButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  closeOnConfirm?: boolean
}

const iconMap = {
  danger: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
}

const variantStyles = {
  danger: {
    icon: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    confirmBtn: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-red-500/30',
  },
  warning: {
    icon: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    confirmBtn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/30',
  },
  info: {
    icon: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    confirmBtn: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/30',
  },
  success: {
    icon: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    confirmBtn: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/30',
  },
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  size = 'md',
  showIcon = true,
  loading = false,
  hideCancelButton = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  closeOnConfirm = false,
}: ConfirmModalProps) {
  const IconComponent = iconMap[variant]

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose()
    }
    if (e.key === 'Enter' && closeOnConfirm) {
      onConfirm()
    }
  }, [closeOnEscape, closeOnConfirm, onClose, onConfirm])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const currentVariant = variantStyles[variant]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full ${sizeStyles[size]} bg-white rounded-2xl shadow-2xl animate-scale-in overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Border Top */}
        <div className="h-1 bg-gradient-to-r from-[#771440] via-[#B0406B] to-[#039AC5]" />

        {/* Close Button */}
        {!loading && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Modal Content */}
        <div className="p-6">
          {/* Icon */}
          {showIcon && (
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${currentVariant.bg} ${currentVariant.border} border`}>
                {loading ? (
                  <Loader2 className={`h-8 w-8 animate-spin ${currentVariant.icon}`} />
                ) : (
                  <IconComponent className={`h-8 w-8 ${currentVariant.icon}`} />
                )}
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <div className="text-gray-600 text-center mb-6">
            {typeof message === 'string' ? (
              <p>{message}</p>
            ) : (
              message
            )}
          </div>

          {/* Actions */}
          <div className={`flex gap-3 ${hideCancelButton ? 'justify-center' : ''}`}>
            {!hideCancelButton && (
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
            )}
            
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 px-4 py-2.5 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg ${currentVariant.confirmBtn}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>

        {/* Footer Decorative */}
        <div className="h-1 bg-gradient-to-r from-[#771440] via-[#B0406B] to-[#039AC5] opacity-50" />
      </div>
    </div>
  )
}

// Convenience function for delete confirmation
export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
  loading = false,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
  loading?: boolean
}) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete User"
      message={
        <div className="text-center">
          <p>Are you sure you want to delete this user?</p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold text-gray-700">{userName}</span> will be permanently removed.
          </p>
        </div>
      }
      confirmText="Delete User"
      cancelText="Cancel"
      variant="danger"
      loading={loading}
    />
  )
}

// Convenience function for bulk delete confirmation
export function BulkDeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  count,
  loading = false,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  count: number
  loading?: boolean
}) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Multiple Users"
      message={
        <div className="text-center">
          <p>Are you sure you want to delete {count} selected user{count > 1 ? 's' : ''}?</p>
          <p className="text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </div>
      }
      confirmText={`Delete ${count} User${count > 1 ? 's' : ''}`}
      cancelText="Cancel"
      variant="danger"
      loading={loading}
    />
  )
}

