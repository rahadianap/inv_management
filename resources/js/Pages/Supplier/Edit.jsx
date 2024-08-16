import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ auth, supplier }) {
    const { setData, post, errors } = useForm({
        supplier_name: supplier.data.supplier_code || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("suppliers.update", supplier.data.supplier_code));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Update Supplier
                    </h2>
                </div>
            }
        >
            <Head title="Categories" />
            <div className="py-12">
                <div className="w-1/2 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="supplier_name"
                                    value="Supplier Name"
                                />
                                <TextInput
                                    id="supplier_name"
                                    type="text"
                                    name="supplier_name"
                                    defaultValue={supplier.data.supplier_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("supplier_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.supplier_name}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="supplier_address"
                                    value="Supplier Address"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="supplier_address"
                                    type="text"
                                    name="supplier_address"
                                    defaultValue={
                                        supplier.data.supplier_address
                                    }
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "supplier_address",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.supplier_address}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="supplier_phone"
                                    value="Supplier Phone"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="supplier_phone"
                                    type="text"
                                    name="supplier_phone"
                                    defaultValue={supplier.data.supplier_phone}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "supplier_phone",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.supplier_phone}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="supplier_type"
                                    value="Supplier Type"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="supplier_type"
                                    name="supplier_type"
                                    value={supplier.data.supplier_type}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("supplier_type", e.target.value)
                                    }
                                >
                                    <option value="">Select Type</option>
                                    <option value="snack">Snack</option>
                                    <option value="buah">Buah</option>
                                    <option value="sayur">Sayur</option>
                                    <option value="kue_basah">Kue Basah</option>
                                </SelectInput>
                                <InputError
                                    message={errors.supplier_type}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6 text-right">
                                <Link
                                    href={route("suppliers.index")}
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
