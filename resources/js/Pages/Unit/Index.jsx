import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import TableHeader from "@/Components/TableHeader";
import Create from "./Create";
import Edit from "./Edit";
import Show from "./Show";
import Delete from "./Delete";

export default function Index({ auth, units, queryParams = null }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("units.index"), queryParams);
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

        router.get(route("units.index"), queryParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Satuan Barang
                    </h2>
                </div>
            }
        >
            <Head title="Satuan Barang" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            <div className="overflow-auto">
                                <div className="flex justify-end mb-4 gap-x-4">
                                    <Create />
                                </div>
                                <table className="table-auto w-full text-sm text-left text-gray-900 dark:text-gray-900">
                                    <thead className="text-base text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-900 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeader
                                                name="unit_code"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Kode Satuan
                                            </TableHeader>
                                            <TableHeader
                                                name="unit_name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Nama Satuan
                                            </TableHeader>
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
                                                    placeholder="Kode Satuan"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "unit_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "unit_code",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    placeholder="Nama Satuan"
                                                    defaultValue={
                                                        queryParams.unit_name
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "unit_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "unit_name",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {units.data.map((unit) => (
                                            <tr
                                                className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={unit.unit_code}
                                            >
                                                <td className="px-3 py-3 hover:underline text-gray-900">
                                                    <Show
                                                        id={`view_modal${unit.unit_code}`}
                                                        unit={unit}
                                                    >
                                                        {unit.unit_code}
                                                    </Show>
                                                </td>
                                                <td className="px-3 py-3 text-gray-900">
                                                    {unit.unit_name}
                                                </td>
                                                <td className="px-3 py-3 text-gray-900">
                                                    {unit.created_at}
                                                </td>
                                                <td className="flex px-3 py-3 text-right text-gray-900 gap-x-6 justify-end">
                                                    <Edit
                                                        id={`edit_modal${unit.unit_code}`}
                                                        unit={unit}
                                                    />
                                                    <Delete
                                                        id={`delete_modal${unit.unit_code}`}
                                                        unit={unit}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={units.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
