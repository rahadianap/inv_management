import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ auth, category }) {
    const { setData, post, errors } = useForm({
        category_name: category.data.category_code || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("categories.update", category.data.category_code));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Update Category
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
                                    htmlFor="category_name"
                                    value="Category Name"
                                />
                                <TextInput
                                    id="category_name"
                                    type="text"
                                    name="category_name"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    defaultValue={category.data.category_name}
                                    onChange={(e) =>
                                        setData("category_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.category_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6 text-right">
                                <Link
                                    href={route("categories.index")}
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
