import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Edit({ id, supplier }) {
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        supplier_code: supplier.supplier_code,
        supplier_name: supplier.supplier_name,
        supplier_address: supplier.supplier_address,
        supplier_phone: supplier.supplier_phone,
        supplier_account_no: supplier.supplier_account_no,
        supplier_type: supplier.supplier_type,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route("suppliers.update", supplier.supplier_code),
            {
                _method: "put",
                ...editData,
            },
            {
                onSuccess: () => {
                    const dialog = document.getElementById(id);
                    dialog.close();
                    toast.success("Data Supplier berhasil diubah!", {
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
                        .getElementById(`edit_modal${supplier.supplier_code}`)
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
                                    className="mt-4 text-left"
                                    htmlFor="supplier_name"
                                    value="Nama Supplier"
                                />

                                <TextInput
                                    id="supplier_name"
                                    className="mt-1 block w-full text-gray-900"
                                    value={editData.supplier_name}
                                    onChange={(e) =>
                                        setEditData(
                                            "supplier_name",
                                            e.target.value
                                        )
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
                                    className="mt-4 text-left"
                                    htmlFor="supplier_address"
                                    value="Alamat Supplier"
                                />

                                <TextInput
                                    id="supplier_address"
                                    className="mt-1 block w-full text-gray-900"
                                    value={editData.supplier_address}
                                    onChange={(e) =>
                                        setEditData(
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
                                    className="mt-4 text-left"
                                    htmlFor="supplier_phone"
                                    value="Nomor Telepon"
                                />

                                <TextInput
                                    id="supplier_phone"
                                    type="tel"
                                    className="mt-1 block w-full text-gray-900"
                                    value={editData.supplier_phone}
                                    onChange={(e) =>
                                        setEditData(
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
                                    className="mt-4 text-left"
                                    htmlFor="supplier_account_no"
                                    value="Nomor Rekening"
                                />

                                <TextInput
                                    id="supplier_account_no"
                                    type="number"
                                    className="mt-1 block w-full text-gray-900"
                                    value={editData.supplier_account_no}
                                    onChange={(e) =>
                                        setEditData(
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
                                    className="mt-4 text-left"
                                    htmlFor="supplier_type"
                                    value="Tipe Supplier"
                                />
                                <SelectInput
                                    id="supplier_type"
                                    name="supplier_type"
                                    className="mt-1 block w-full"
                                    value={editData.supplier_type}
                                    onChange={(e) =>
                                        setEditData(
                                            "supplier_type",
                                            e.target.value
                                        )
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
