import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({ id, category }) {
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        category_code: category.category_code,
        category_name: category.category_name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route("categories.update", category.category_code),
            {
                _method: "put",
                ...editData,
            },
            {
                onSuccess: () => {
                    const dialog = document.getElementById(id);
                    dialog.close();
                    toast.success("Data Kategori berhasil diubah!", {
                        position: "top-center",
                    });
                },
            }
        );
    };

    return (
        <>
            <button
                onClick={() =>
                    document
                        .getElementById(`edit_modal${category.category_code}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                Edit
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
                        <h3 className="font-bold text-lg text-left">
                            Edit Data
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            <div>
                                <InputLabel
                                    className="text-left"
                                    htmlFor="category_name"
                                    value="Nama Kategori"
                                />

                                <TextInput
                                    id="category_name"
                                    className="mt-1 block w-full"
                                    value={editData.category_name}
                                    onChange={(e) =>
                                        setEditData(
                                            "category_name",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="category_name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.category_name}
                                />
                            </div>
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
                                disabled={processing}
                            >
                                Confirm Update
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => reset()}></button>
                </form>
            </dialog>
        </>
    );
}
