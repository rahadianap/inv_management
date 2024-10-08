import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function Show({ id, category }) {
    const {
        data: editData,
        setData: setEditData,
        errors,
        reset,
    } = useForm({
        category_code: category.category_code,
        category_name: category.category_name,
    });

    return (
        <>
            <button
                onClick={() =>
                    document
                        .getElementById(`view_modal${category.category_code}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 font-semibold text-sm text-gray-900 uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                {category.category_code}
            </button>
            <dialog id={id} className="modal">
                <div className="modal-box bg-slate-50">
                    <div className="modal-header">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => reset()}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="modal-body">
                        <h3 className="font-bold text-lg mb-4">
                            {category.category_name}
                        </h3>
                        <div>
                            <InputLabel
                                htmlFor="category_code"
                                value="Kode Kategori"
                            />

                            <TextInput
                                id="category_code"
                                className="mt-1 block w-full mb-4"
                                value={editData.category_code}
                                onChange={(e) =>
                                    setEditData("category_code", e.target.value)
                                }
                                disabled
                                isFocused
                                autoComplete="category_code"
                            />

                            <InputError
                                className="mt-2 mb-4"
                                message={errors.category_code}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="category_name"
                                value="Nama Kategori"
                            />

                            <TextInput
                                id="category_name"
                                className="mt-1 block w-full"
                                value={editData.category_name}
                                onChange={(e) =>
                                    setEditData("category_name", e.target.value)
                                }
                                disabled
                                isFocused
                                autoComplete="category_name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.category_name}
                            />
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => reset()}></button>
                </form>
            </dialog>
        </>
    );
}
