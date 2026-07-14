'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, ChevronLeft, ChevronRight, Mail } from 'lucide-react'
import { Contact, ContactResponse, contactService } from '@/app/api_services/contactService'

interface ContactSubmissionsProps {
  // When set, the list acts as a dashboard preview: fixed to page 1, this many items, no pager controls
  limit?: number
  // Shown as a "View all" link when previewing (limit set) and more submissions exist
  viewAllHref?: string
}

const DEFAULT_PAGE_SIZE = 10

export default function ContactSubmissions({ limit, viewAllHref }: ContactSubmissionsProps) {
  const isPreview = Boolean(limit)
  const pageSize = limit ?? DEFAULT_PAGE_SIZE

  const [contacts, setContacts] = useState<Contact[]>([])
  const [pagination, setPagination] = useState<ContactResponse['pagination'] | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchContacts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await contactService.getAllContacts({ page, limit: pageSize })
        if (cancelled) return
        setContacts(response.contacts || [])
        setPagination(response.pagination || null)
      } catch {
        if (!cancelled) setError('Failed to load contact form submissions')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchContacts()
    return () => {
      cancelled = true
    }
  }, [page, pageSize])

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

  const isTruncated = isPreview && (pagination?.totalContacts ?? 0) > pageSize
  const showPager = !isPreview && pagination && pagination.totalPages > 1

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

      {isTruncated && viewAllHref && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href={viewAllHref}
            className="flex items-center justify-center gap-2 text-center text-accent-600 hover:text-accent-700 font-medium py-2 hover:bg-accent-50 rounded-lg transition-colors"
          >
            View All Submissions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {showPager && pagination && (
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages} &middot; {pagination.totalContacts} total
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPrevPage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
