import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create({ className = "", disabled }) {
    const { data, setData, reset, errors, processing } = useForm({
        unit_name: "",
    });

    const submit = (e) => {
        e.preventDefault();

        router.post(route("units.store"), data, {
            onSuccess: () => {
                const dialog = document.getElementById("create_modal");
                dialog.close();
                toast.success("Satuan baru berhasil dibuat!", {
                    position: "top-center",
                });
            },
        });
    };

    return (
        <>
            <ToastContainer limit={1} autoClose={3000} />
            <button
                onClick={() =>
                    document.getElementById("create_modal").showModal()
                }
                className={
                    `inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                Tambah Satuan
            </button>

            <dialog id="create_modal" className="modal">
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
                        <h3 className="font-bold text-lg text-gray-900">
                            Tambah Satuan Baru
                        </h3>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="unit_name"
                                    value="Nama Satuan"
                                />

                                <TextInput
                                    id="unit_name"
                                    className="mt-1 block w-full text-gray-900"
                                    value={data.unit_name}
                                    onChange={(e) =>
                                        setData("unit_name", e.target.value)
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
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    disabled && "opacity-25"
                                } `}
                                disabled={processing}
                            >
                                Tambah Satuan Baru
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
