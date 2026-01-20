import PageHeader from '@/components/backstagepass/effects/PageHeader'

interface PageWrapperProps {
  title: string
  description?: string
  children: React.ReactNode
  sidebar?: React.ReactNode
  darkMode?: boolean
}

export default function PageWrapper({
  title,
  description,
  children,
  sidebar,
  darkMode = false,
}: PageWrapperProps) {
  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen grid lg:grid-cols-[280px_1fr] transition-colors duration-300`}>      
      {/* Sidebar */}
      {sidebar && (
        <aside className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-background/80 border-border'} hidden lg:block border-r backdrop-blur`}>{sidebar}</aside>
      )}

      {/* Main Area */}
      <div className="flex flex-col">
        {/* Header */}
        <PageHeader title={title} description={description} darkMode={darkMode} />

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}