'use client'

import { useState, useEffect } from 'react'
import { Mail, AlertCircle } from 'lucide-react'
import { contactService, Contact } from '@/app/api_services/contactService'

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await contactService.getAllContacts()
        setContacts(response.contacts || [])
      } catch {
        setError('Failed to load contact form submissions')
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  if (loading) {
    return (
      <div className="adventure-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Contact Submissions</h2>
            <p className="text-sm text-gray-600 mt-1">Messages sent through the contact form</p>
          </div>
          <Mail className="h-6 w-6 text-accent-500 animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="adventure-card">
        <div className="flex items-center gap-3 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="adventure-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contact Submissions</h2>
          <p className="text-sm text-gray-600 mt-1">Messages sent through the contact form</p>
        </div>
        <Mail className="h-6 w-6 text-accent-500" />
      </div>

      {contacts.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">No contact form submissions yet</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {contacts.map((contact) => (
            <li key={contact.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                <p className="text-sm text-gray-600 truncate">{contact.email}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${contactService.getStatusColor(contact.status)}`}>
                  {contactService.getStatusText(contact.status)}
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {contactService.formatDate(contact.createdAt)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
