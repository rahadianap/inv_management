import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeader from "@/Components/TableHeader";
import {
    PRODUCT_AVAILABLE_TEXT_MAP,
    PRODUCT_AVAILABLE_CLASS_MAP,
} from "@/constants";
import SelectInput from "@/Components/SelectInput";
import { FormatRupiah } from "@arismun/format-rupiah";

export default function Index({ auth, products, queryParams = null, success }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("products.index"), queryParams);
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

        router.get(route("products.index"), queryParams);
    };

    const deleteSupplier = (product) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        router.delete(route("products.destroy", product.product_code));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Products
                    </h2>
                    <Link
                        href={route("products.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700"
                    >
                        Add New Products
                    </Link>
                </div>
            }
        >
            <Head title="Products" />
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
                                                name="product_code"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Product Code
                                            </TableHeader>
                                            <TableHeader
                                                name="product_name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Product Name
                                            </TableHeader>
                                            <th className="px-3 py-3">
                                                Status
                                            </th>
                                            <TableHeader
                                                name="product_price"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_order={
                                                    queryParams.sort_order
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Price
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
                                                    placeholder="Product Code"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "product_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "product_code",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    placeholder="Product Name"
                                                    defaultValue={
                                                        queryParams.product_name
                                                    }
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "product_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "product_name",
                                                            e
                                                        )
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.available_status
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "available_status",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select Type
                                                    </option>
                                                    <option value="AVAILABLE">
                                                        Available
                                                    </option>
                                                    <option value="UNAVAILABLE">
                                                        Unavailable
                                                    </option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr
                                                className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={product.product_code}
                                            >
                                                <td className="px-3 py-3 hover:underline text-gray-900">
                                                    <Link
                                                        href={route(
                                                            "products.show",
                                                            product.product_code
                                                        )}
                                                    >
                                                        {product.product_code}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-3 text-gray-900">
                                                    {product.product_name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            PRODUCT_AVAILABLE_CLASS_MAP[
                                                                product
                                                                    .available_status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PRODUCT_AVAILABLE_TEXT_MAP[
                                                                product
                                                                    .available_status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-gray-900 text-right">
                                                    <FormatRupiah
                                                        value={
                                                            product.product_price
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-3 text-right text-gray-900">
                                                    <Link
                                                        href={route(
                                                            "products.edit",
                                                            product.product_code
                                                        )}
                                                        className="font-medium bg-yellow-500 text-white rounded px-1 py-1 dark:text-white hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteSupplier(
                                                                product
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
                            <Pagination links={products.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
