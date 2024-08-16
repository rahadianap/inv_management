import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ auth, subcategory, categories }) {
    const { setData, post, errors } = useForm({
        subcategory_name: subcategory.data.subcategory_code || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("subcategories.update", subcategory.data.subcategory_code));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Update Subcategory
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
                                    htmlFor="subcategory_name"
                                    value="Subcategory Name"
                                />
                                <TextInput
                                    id="subcategory_name"
                                    type="text"
                                    name="subcategory_name"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    defaultValue={
                                        subcategory.data.subcategory_name
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "subcategory_name",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.subcategory_name}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="category_id"
                                    value="Category Code"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="category_id"
                                    name="category_id"
                                    value={subcategory.data.category_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Category</option>
                                    {categories.data.map((category) => (
                                        <option
                                            value={category.category_code}
                                            key={category.category_code}
                                        >
                                            {category.category_name}
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>
                            <div className="mt-6 text-right">
                                <Link
                                    href={route("subcategories.index")}
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
