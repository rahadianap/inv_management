import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import { useState } from "react";

export default function Create({ auth, permissions }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        roles: []
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("roles.store"));
    };

    const handleChecked = (e) => {
        let id = e.target.value;
        if (e.target.checked) {
            setData("roles", [...data.roles, id]);
        } else {
            setData(
                "roles",
                data.roles.filter((item) => {
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
                        Create New Role
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
                                    value="Role Name"
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
                                    htmlFor="id"
                                    value="Permission"
                                    className="mt-4"
                                />
                                {permissions.data.map((permission) => (
                                    <>
                                        <input
                                            type="checkbox"
                                            className="rounded text-emerald-500"
                                            id="id"
                                            name="id"
                                            value={permission.id}
                                            key={permission.id}
                                            onChange={handleChecked}
                                        />
                                        <span className="ms-2 text-lg text-gray-600 dark:text-gray-400 mr-4">{permission.name}</span>
                                    </>
                                ))}
                                <InputError
                                    message={errors.id}
                                    className="mt-2"
                                />
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
