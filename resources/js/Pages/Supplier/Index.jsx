import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { SUPPLIER_TYPE_TEXT_MAP, SUPPLIER_TYPE_CLASS_MAP } from "@/constants";
import TableHeader from "@/Components/TableHeader";

export default function Index({
    auth,
    suppliers,
    queryParams = null,
    success,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("suppliers.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_order === "asc") {
                queryParams.sort_order = "desc";
            } else {
                queryParams.sort_order = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_order = "asc";
        }

        router.get(route("suppliers.index"), queryParams);
    };

    const deleteSupplier = (supplier) => {
        if (!window.confirm("Are you sure you want to delete this supplier?")) {
            return;
        }
        router.delete(route("suppliers.destroy", supplier.supplier_code));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Suppliers
                    </h2>
                    <Link
                        href={route("suppliers.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700"
                    >
                        Add New Suppliers
                    </Link>
                </div>
            }
        >
            <Head title="Suppliers" />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-900 dark:text-gray-900">
                                    <thead className="text-base text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-900 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeader
                                                name="supplier_code"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Supplier Code
                                            </TableHeader>
                                            <TableHeader
                                                name="supplier_name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Supplier Name
                                            </TableHeader>
                                            <th className="px-3 py-3">
                                                Supplier Type
                                            </th>
                                            <TableHeader
                                                name="created_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeader>
                                            <th className="px-3 py-3 text-right">
                                                ...
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-900 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    placeholder="Supplier Code"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "supplier_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "supplier_code",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    placeholder="Supplier Name"
                                                    defaultValue={
                                                        queryParams.supplier_name
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "supplier_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "supplier_name",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {suppliers.data.map((supplier) => (
                                            <tr
                                                className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={supplier.supplier_code}
                                            >
                                                <td className="px-3 py-3 hover:underline text-gray-900">
                                                    <Link
                                                        href={route(
                                                            "suppliers.show",
                                                            supplier.supplier_code
                                                        )}
                                                    >
                                                        {supplier.supplier_code}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-3 text-gray-900">
                                                    {supplier.supplier_name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            SUPPLIER_TYPE_CLASS_MAP[
                                                                supplier
                                                                    .supplier_type
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            SUPPLIER_TYPE_TEXT_MAP[
                                                                supplier
                                                                    .supplier_type
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-gray-900">
                                                    {supplier.created_at}
                                                </td>
                                                <td className="px-3 py-3 text-right text-gray-900">
                                                    <Link
                                                        href={route(
                                                            "suppliers.edit",
                                                            supplier.supplier_code
                                                        )}
                                                        className="font-medium bg-yellow-500 text-white rounded px-1 py-1 dark:text-white hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteSupplier(
                                                                supplier
                                                            )
                                                        }
                                                        className="font-medium bg-red-500 text-white rounded px-1 py-1 dark:text-white hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={suppliers.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
