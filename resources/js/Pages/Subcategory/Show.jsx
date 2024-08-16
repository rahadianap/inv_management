import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SubcategoriesTable from "../Subcategory/SubcategoriesTable";

export default function Show({ auth, category, subcategories, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`${category.data.category_name}`}
                </h2>
            }
        >
            <Head title={`${category.data.category_name}`} />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Category Code
                                        </label>
                                        <p className="mt-1">
                                            {category.data.category_code}
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <label className="font-bold text-lg">
                                            Category Name
                                        </label>
                                        <p className="mt-1">
                                            {category.data.category_name}
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <label className="font-bold text-lg">
                                            Created At
                                        </label>
                                        <p className="mt-1">
                                            {category.data.created_at}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
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
