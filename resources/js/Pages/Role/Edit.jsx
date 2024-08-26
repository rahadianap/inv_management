import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Edit({ auth, role, permissions, role_permission }) {
    const { setData, post, errors } = useForm({
        name: role.data.id || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("roles.update", role.data.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-start items-center">
                    <Link href={route("roles.index")}>
                        <ChevronLeftIcon className="size-6 text-gray-800" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight ml-8">
                        Update Role
                    </h2>
                </div>
            }
        >
            <Head title="Roles" />
            <div className="py-12">
                <div className="w-1/2 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Subcategory Name"
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    defaultValue={
                                        role.data.name
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                                <div className="flex flex-row justify-start gap-2 mt-8">
                                    {permissions.map((permission) => (
                                        <div>
                                            <span value={permission.permission_id}
                                                key={permission.permission_id}
                                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-base font-medium text-green-700 ring-1 ring-inset ring-green-500/10">
                                                {permission.name}
                                                <button type="button" className="flex-shrink-0 size-6 inline-flex items-center justify-center rounded-full hover:bg-green-200 focus:outline-none focus:bg-green-200 focus:text-green-500 dark:hover:bg-green-600 dark:focus:bg-green-600 dark:focus:text-green-300">
                                                    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 6 6 18"></path>
                                                        <path d="m6 6 12 12"></path>
                                                    </svg>
                                                </button>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <InputLabel
                                    htmlFor="id"
                                    value="Permission"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="id"
                                    name="id"
                                    defaultValue={
                                        role.data.id
                                    }
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        console.log(e.target.value)
                                    }
                                >
                                    <option value="">Select Permission</option>
                                    {permissions.map((permission) => (
                                        <option
                                            value={permission.id}
                                            key={permission.id}
                                        >
                                            {permission.name}
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>
                            <div className="mt-6 text-right">
                                <Link
                                    href={route("roles.index")}
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
