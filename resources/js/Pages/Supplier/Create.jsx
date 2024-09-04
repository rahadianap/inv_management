import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "@/Components/SelectInput";

export default function Create({ className = "", disabled }) {
    const { data, setData, reset, errors, processing } = useForm({
        supplier_name: "",
        supplier_address: "",
        supplier_phone: "",
        supplier_account_no: "",
        supplier_type: "",
    });

    const submit = (e) => {
        e.preventDefault();

        router.post(route("suppliers.store"), data, {
            onSuccess: () => {
                const dialog = document.getElementById("create_modal");
                dialog.close();
                toast.success("Supplier baru berhasil dibuat!", {
                    position: "top-center",
                });
            },
        });
    };

    return (
        <>
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
                Tambah Supplier
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
                            Tambah Supplier Baru
                        </h3>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="supplier_name"
                                    value="Nama Supplier"
                                />

                                <TextInput
                                    id="supplier_name"
                                    className="mt-1 block w-full text-gray-900"
                                    value={data.supplier_name}
                                    onChange={(e) =>
                                        setData("supplier_name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="supplier_name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.supplier_name}
                                />
                                <InputLabel
                                    className="mt-4"
                                    htmlFor="supplier_address"
                                    value="Alamat Supplier"
                                />

                                <TextInput
                                    id="supplier_address"
                                    className="mt-1 block w-full text-gray-900"
                                    value={data.supplier_address}
                                    onChange={(e) =>
                                        setData(
                                            "supplier_address",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="supplier_address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.supplier_address}
                                />
                                <InputLabel
                                    className="mt-4"
                                    htmlFor="supplier_phone"
                                    value="Nomor Telepon"
                                />

                                <TextInput
                                    id="supplier_phone"
                                    type="tel"
                                    className="mt-1 block w-full text-gray-900"
                                    value={data.supplier_phone}
                                    onChange={(e) =>
                                        setData(
                                            "supplier_phone",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="supplier_phone"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.supplier_phone}
                                />
                                <InputLabel
                                    className="mt-4"
                                    htmlFor="supplier_account_no"
                                    value="Nomor Rekening"
                                />

                                <TextInput
                                    id="supplier_account_no"
                                    type="number"
                                    className="mt-1 block w-full text-gray-900"
                                    value={data.supplier_account_no}
                                    onChange={(e) =>
                                        setData(
                                            "supplier_account_no",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="supplier_account_no"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.supplier_account_no}
                                />
                                <InputLabel
                                    className="mt-4"
                                    htmlFor="supplier_type"
                                    value="Tipe Supplier"
                                />
                                <SelectInput
                                    id="supplier_type"
                                    name="supplier_type"
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

                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    disabled && "opacity-25"
                                } `}
                                disabled={processing}
                            >
                                Tambah Supplier Baru
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
