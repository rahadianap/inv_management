import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { SUPPLIER_TYPE_TEXT_MAP, SUPPLIER_TYPE_CLASS_MAP } from "@/constants";
import TableHeader from "@/Components/TableHeader";
import Create from "./Create";
import Edit from "./Edit";
import Show from "./Show";
import Delete from "./Delete";

export default function Index({ auth, suppliers, queryParams = null }) {
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Supplier
                    </h2>
                </div>
            }
        >
            <Head title="Supplier" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            <div className="overflow-auto">
                                <div className="flex justify-end mb-4 gap-x-4">
                                    <Create />
                                </div>
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
                                                Kode Supplier
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
                                                Nama Supplier
                                            </TableHeader>
                                            <th className="px-3 py-3">
                                                Tipe Supplier
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
                                                Tanggal Dibuat
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
                                                    placeholder="Kode Supplier"
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
                                                    placeholder="Nama Supplier"
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
                                                    <Show
                                                        id={`view_modal${supplier.supplier_code}`}
                                                        supplier={supplier}
                                                    >
                                                        {supplier.supplier_code}
                                                    </Show>
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
                                                <td className="flex px-3 py-3 text-right text-gray-900 gap-x-6 justify-end">
                                                    <Edit
                                                        id={`edit_modal${supplier.supplier_code}`}
                                                        supplier={supplier}
                                                    />
                                                    <Delete
                                                        id={`delete_modal${supplier.supplier_code}`}
                                                        supplier={supplier}
                                                    />
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
