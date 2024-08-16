import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth, subcategories, suppliers }) {
    const { data, setData, post, errors, reset } = useForm({
        product_name: "",
        subcategory_id: "",
        available_status: "",
        product_description: "",
        product_price: "",
        product_photos: "",
        special_type: "",
        is_taxable: false,
        barcode: "",
        max_stock: "",
        max_count: "",
        product_weight: "",
        is_sold_by_weight: false,
        selling_time_id: "",
        supplier_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("products.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New Product
                    </h2>
                </div>
            }
        >
            <Head title="Products" />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="product_name"
                                    value="Product Name"
                                />
                                <TextInput
                                    id="product_name"
                                    type="text"
                                    name="product_name"
                                    value={data.product_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("product_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.product_name}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="subcategory_id"
                                    value="Subcategory Code"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="subcategory_id"
                                    name="subcategory_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "subcategory_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Category</option>
                                    {subcategories.data.map((subcategory) => (
                                        <option
                                            value={subcategory.subcategory_code}
                                            key={subcategory.subcategory_code}
                                        >
                                            {subcategory.subcategory_name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.subcategory_id}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="available_status"
                                    value="Status"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="available_status"
                                    name="available_status"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "available_status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="AVAILABLE">Available</option>
                                    <option value="UNAVAILABLE">
                                        Unavailable
                                    </option>
                                </SelectInput>
                                <InputError
                                    message={errors.available_status}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="product_description"
                                    value="Product Description"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="product_description"
                                    type="text"
                                    name="product_description"
                                    value={data.product_description}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "product_description",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.product_description}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="product_price"
                                    value="Price"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="product_price"
                                    type="number"
                                    name="product_price"
                                    value={data.product_price}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("product_price", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.product_price}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="product_photos"
                                    value="Image"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="product_photos"
                                    type="text"
                                    name="product_photos"
                                    value={data.product_photos}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "product_photos",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.product_photos}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="barcode"
                                    value="Barcode"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="barcode"
                                    type="text"
                                    name="barcode"
                                    value={data.barcode}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("barcode", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.barcode}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="max_stock"
                                    value="Max Stock"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="max_stock"
                                    type="number"
                                    name="max_stock"
                                    value={data.max_stock}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("max_stock", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.max_stock}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="max_count"
                                    value="Max Count"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="max_count"
                                    type="number"
                                    name="max_count"
                                    value={data.max_count}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("max_count", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.max_count}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="selling_time_id"
                                    value="Selling Time"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="selling_time_id"
                                    name="selling_time_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "selling_time_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select Selling Time
                                    </option>
                                    <option value="IDSLT202405230901596724">
                                        Always Available
                                    </option>
                                </SelectInput>
                                <InputError
                                    message={errors.selling_time_id}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="supplier_id"
                                    value="Supplier Code"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="supplier_id"
                                    name="supplier_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("supplier_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Supplier</option>
                                    {suppliers.data.map((supplier) => (
                                        <option
                                            value={supplier.supplier_code}
                                            key={supplier.supplier_code}
                                        >
                                            {supplier.supplier_name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.supplier_id}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="is_taxable"
                                    value="Taxable"
                                    className="mt-4"
                                />
                                <input
                                    type="checkbox"
                                    className="rounded text-emerald-500"
                                    id="is_taxable"
                                    name="is_taxable"
                                    value={data.is_taxable}
                                    onChange={(e) =>
                                        setData("is_taxable", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.is_taxable}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="is_sold_by_weight"
                                    value="Sold By Weight"
                                    className="mt-4"
                                />
                                <input
                                    type="checkbox"
                                    className="rounded text-emerald-500"
                                    id="is_sold_by_weight"
                                    name="is_sold_by_weight"
                                    value={data.is_sold_by_weight}
                                    onChange={(e) =>
                                        setData(
                                            "is_sold_by_weight",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.is_sold_by_weight}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6 text-right">
                                <Link
                                    href={route("products.index")}
                                    className="bg-gray-200 py-1 px-3 text-gray-900 rounded shadow transition-all hover:bg-gray-400 mr-4"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
