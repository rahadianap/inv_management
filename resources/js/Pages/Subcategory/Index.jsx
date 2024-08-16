import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeader from "@/Components/TableHeader";
import SubcategoriesTable from "./SubcategoriesTable";

export default function Index({ auth, subcategories, queryParams = null }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Subcategories
                    </h2>
                    <Link
                        href={route("subcategories.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700"
                    >
                        Add New Subcategories
                    </Link>
                </div>
            }
        >
            <Head title="Subcategories" />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            <SubcategoriesTable
                                subcategories={subcategories}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
