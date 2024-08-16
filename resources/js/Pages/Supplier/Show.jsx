import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, supplier }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`${supplier.data.supplier_name}`}
                </h2>
            }
        >
            <Head title={`${supplier.data.supplier_name}`} />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Supplier Code
                                        </label>
                                        <p className="mt-1">
                                            {supplier.data.supplier_code}
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <label className="font-bold text-lg">
                                            Supplier Name
                                        </label>
                                        <p className="mt-1">
                                            {supplier.data.supplier_name}
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <label className="font-bold text-lg">
                                            Created At
                                        </label>
                                        <p className="mt-1">
                                            {supplier.data.created_at}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
