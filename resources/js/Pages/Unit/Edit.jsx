import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({ id, unit }) {
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        unit_code: unit.unit_code,
        unit_name: unit.unit_name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route("units.update", unit.unit_code),
            {
                _method: "put",
                ...editData,
            },
            {
                onSuccess: () => {
                    const dialog = document.getElementById(id);
                    dialog.close();
                    toast.success("Data Satuan berhasil diubah!", {
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
                        .getElementById(`edit_modal${unit.unit_code}`)
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
                                    htmlFor="unit_name"
                                    value="Nama Satuan"
                                />

                                <TextInput
                                    id="unit_name"
                                    className="mt-1 block w-full"
                                    value={editData.unit_name}
                                    onChange={(e) =>
                                        setEditData("unit_name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="unit_name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.unit_name}
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
