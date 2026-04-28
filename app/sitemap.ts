import { MetadataRoute } from 'next'

const BASE_URL = 'https://istc.co.ke'

const staticRoutes = [
  '/',
  '/about/',
  '/blog/',
  '/calendar/',
  '/contact/',
  '/courses/',
  '/courses/chemical-safety/',
  '/courses/construction-safety/',
  '/courses/disaster-emergency-preparedness/',
  '/courses/fire-safety-course-certificate/',
  '/courses/fire-safety-course-diploma/',
  '/courses/first-aid/',
  '/courses/first-aid/basic/',
  '/courses/first-aid/occupational/',
  '/courses/first-aid/paediatric/',
  '/courses/first-aid/refresher/',
  '/courses/occupational-safety-health-certificate/',
  '/courses/occupational-safety-health-diploma/',
  '/courses/road-safety/',
  '/courses/work-at-height/',
  '/services/',
  '/services/certification/',
  '/services/consultancy/',
  '/services/custom-solutions/',
  '/services/environmental-audit/',
  '/services/environmental-impact-assessment/',
  '/services/ergonomics-audit/',
  '/services/fire-safety-audit/',
  '/services/indoor-air-quality-iaq/',
  '/services/noise-measurement/',
  '/services/occupational-safety-health-audit/',
  '/services/risk-assessment/',
  '/services/training/',
  '/testimonials/',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }))

  let blogEntries: MetadataRoute.Sitemap = []

  try {
    const response = await fetch('https://istc.co.ke/api/v1/blogs?limit=1000', {
      next: { revalidate: 3600 },
    })

    if (response.ok) {
      const data = await response.json()
      const blogs = data.blogs || []

      blogEntries = blogs.map((blog: any) => ({
        url: `${BASE_URL}/blog/${blog.id}/`,
        lastModified: new Date(blog.updatedAt || blog.createdAt || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error)
  }

  return [...staticEntries, ...blogEntries]
}

