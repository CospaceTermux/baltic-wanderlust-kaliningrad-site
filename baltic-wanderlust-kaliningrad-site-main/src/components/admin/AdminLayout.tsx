import { useData } from '@/context/DataContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { resetToInitial } = useData();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a href="/admin" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                Админ панель
              </a>
              <a href="/admin/hotels" className="ml-8 flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                Отели
              </a>
              <a href="/admin/news" className="ml-8 flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                Новости
              </a>
              <a href="/admin/map" className="ml-8 flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                Карта
              </a>
            </div>
            <button
              onClick={resetToInitial}
              className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Сбросить данные
            </button>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 