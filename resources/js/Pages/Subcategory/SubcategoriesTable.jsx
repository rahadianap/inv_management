import TableHeader from "@/Components/TableHeader";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";

export default function SubcategoriesTable({
    subcategories,
    queryParams = null,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("subcategories.index"), queryParams);
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

        router.get(route("subcategories.index"), queryParams);
    };

    const deleteSubcategory = (subcategory) => {
        if (
            !window.confirm("Are you sure you want to delete this subcategory?")
        ) {
            return;
        }
        router.delete(
            route("subcategories.destroy", subcategory.subcategory_code)
        );
    };

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeader
                                name="subcategory_code"
                                sort_field={queryParams.sort_field}
                                sort_order={queryParams.sort_order}
                                sortChanged={sortChanged}
                            >
                                Subcategory Code
                            </TableHeader>
                            <TableHeader
                                name="subcategory_name"
                                sort_field={queryParams.sort_field}
                                sort_order={queryParams.sort_order}
                                sortChanged={sortChanged}
                            >
                                Subcategory Name
                            </TableHeader>
                            <TableHeader
                                name="category_id"
                                sort_field={queryParams.sort_field}
                                sort_order={queryParams.sort_order}
                                sortChanged={sortChanged}
                            >
                                Category Code
                            </TableHeader>
                            <TableHeader
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_order={queryParams.sort_order}
                                sortChanged={sortChanged}
                            >
                                Created Date
                            </TableHeader>
                            <th className="px-3 py-3 text-right">...</th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    placeholder="Subcategory Code"
                                    defaultValue={queryParams.name}
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "subcategory_code",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) =>
                                        onKeyPress("subcategory_code", e)
                                    }
                                />
                            </th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    placeholder="Subcategory Name"
                                    defaultValue={queryParams.subcategory_name}
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "subcategory_name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) =>
                                        onKeyPress("subcategory_name", e)
                                    }
                                />
                            </th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    placeholder="Category Code"
                                    defaultValue={queryParams.category_id}
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "category_id",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) =>
                                        onKeyPress("category_id", e)
                                    }
                                />
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategories.data.map((subcategory) => (
                            <tr
                                className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={subcategory.subcategory_code}
                            >
                                <td className="px-3 py-3">
                                    {subcategory.subcategory_code}
                                </td>
                                <td className="px-3 py-3">
                                    {subcategory.subcategory_name}
                                </td>
                                <td className="px-3 py-3">
                                    {subcategory.category_id}
                                </td>
                                <td className="px-3 py-3">
                                    {subcategory.created_at}
                                </td>
                                <td className="px-3 py-3 text-right text-gray-900">
                                    <Link
                                        href={route(
                                            "subcategories.edit",
                                            subcategory.subcategory_code
                                        )}
                                        className="font-medium bg-yellow-500 text-white rounded px-1 py-1 dark:text-white hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={(e) =>
                                            deleteSubcategory(subcategory)
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
            <Pagination links={subcategories.meta.links} />
        </>
    );
}
