import ContactSubmissions from '@/components/admin/ContactSubmissions'

export default function ContactsPage() {
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-1 text-gray-600">Contact form submissions from your website visitors</p>
      </div>

      <ContactSubmissions />
    </div>
  )
}
