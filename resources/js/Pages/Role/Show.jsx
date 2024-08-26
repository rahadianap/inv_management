import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Show({ auth, role, permissions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-start items-center">
                    <Link href={route("roles.index")}>
                        <ChevronLeftIcon className="size-6 text-gray-800" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight ml-8">
                        {`${role.data.name}`}
                    </h2>
                </div>
            }
        >
            <Head title={`${role.data.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Role Name
                                        </label>
                                        <p className="mt-1">
                                            {role.data.name}
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <label className="font-bold text-lg">
                                            Created At
                                        </label>
                                        <p className="mt-1">
                                            {role.data.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <label className="font-bold text-lg">
                                            Permissions
                                        </label>
                                        <div className="flex flex-row justify-start gap-2 mt-1">
                                            {permissions.map((permission) => (
                                                <div>
                                                    <span value={permission.permission_id}
                                                        key={permission.permission_id}
                                                        className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-base font-medium text-green-700 ring-1 ring-inset ring-green-500/10">
                                                        {permission.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
