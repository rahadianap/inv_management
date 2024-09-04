import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth, roles }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("users.store"));
    };

    const handleChecked = (e) => {
        let id = e.target.value;
        if (e.target.checked) {
            setData("users", [...data.users, id]);
        } else {
            setData(
                "users",
                data.users.filter((item) => {
                    return item !== id;
                })
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New User
                    </h2>
                </div>
            }
        >
            <Head title="users" />
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
                                    value="Username"
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="mt-4"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="role"
                                    value="Subcategory Code"
                                    className="mt-4"
                                />
                                <SelectInput
                                    id="role"
                                    name="role"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "role",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Role</option>
                                    {roles.data.map((role) => (
                                        <option
                                            value={role.id}
                                            key={role.id}
                                        >
                                            {role.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-6 text-right">
                                <Link
                                    href={route("users.index")}
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
