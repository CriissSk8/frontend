import Link from 'next/link';

interface LegalPageProps {
  title: string;
  description: string;
  sections: Array<{ heading: string; content: string }>;
}

export default function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-[60vh] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#2E7D32] hover:text-[#2E7D32]/80 font-medium mb-8"
        >
          ← Volver al inicio
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
          <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </header>

        <div className="space-y-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                {section.heading}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
