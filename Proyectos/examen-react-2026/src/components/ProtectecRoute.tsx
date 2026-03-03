import { Outlet, Link, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-6 md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Panel de Gestión
                            </h2>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <Link
                                to="/dashboard/orders"
                                className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${isActive('/dashboard/orders') === "bg-indigo-100 text-indigo-700" ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            >
                                Ver Pedidos
                            </Link>
                            <Link
                                to="/dashboard/order-details"
                                className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${isActive('/dashboard/order-details') === "bg-indigo-100 text-indigo-700" ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            >
                                Carrito / Finalizar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 py-6">
                <Outlet />
            </div>
        </div>
    );
}
