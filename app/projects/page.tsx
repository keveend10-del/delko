import type { Metadata } from 'next'
import { ProjectsPage } from '@/components/site/ProjectsPage'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real results from local businesses across Berkshire County and North Shore MA — painters, HVAC, med spas, law firms, landscapers, and hospitality.',
  openGraph: {
    title: 'Projects | Delko',
    description: 'Real results from local businesses across Berkshire County and North Shore MA — painters, HVAC, med spas, law firms, landscapers, and hospitality.',
    url: 'https://delkoagency.com/projects',
  },
  alternates: {
    canonical: 'https://delkoagency.com/projects',
  },
}

export default function Projects() {
  return <ProjectsPage />
}
