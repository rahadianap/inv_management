import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";

export default function Show({ id, supplier }) {
    const {
        data: editData,
        setData: setEditData,
        reset,
    } = useForm({
        supplier_code: supplier.supplier_code,
        supplier_name: supplier.supplier_name,
        supplier_address: supplier.supplier_address,
        supplier_phone: supplier.supplier_phone,
        supplier_account_no: supplier.supplier_account_no,
        supplier_type: supplier.supplier_type,
    });

    return (
        <>
            <button
                onClick={() =>
                    document
                        .getElementById(`view_modal${supplier.supplier_code}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 font-semibold text-sm text-gray-900 uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                {supplier.supplier_code}
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
                            {supplier.supplier_name}
                        </h3>
                        <div>
                            <InputLabel
                                className="mt-4 text-left"
                                htmlFor="supplier_code"
                                value="Kode Supplier"
                            />

                            <TextInput
                                id="supplier_code"
                                className="mt-1 block w-full text-gray-900"
                                value={editData.supplier_code}
                                onChange={(e) =>
                                    setEditData("supplier_code", e.target.value)
                                }
                                disabled
                                isFocused
                                autoComplete="supplier_code"
                            />
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
                                    setEditData("supplier_name", e.target.value)
                                }
                                disabled
                                isFocused
                                autoComplete="supplier_name"
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
                                disabled
                                isFocused
                                autoComplete="supplier_address"
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
                                disabled
                                isFocused
                                autoComplete="supplier_phone"
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
                                disabled
                                isFocused
                                autoComplete="supplier_account_no"
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
                                disabled
                                value={editData.supplier_type}
                                onChange={(e) =>
                                    setEditData("supplier_type", e.target.value)
                                }
                            >
                                <option value="">Select Type</option>
                                <option value="snack">Snack</option>
                                <option value="buah">Buah</option>
                                <option value="sayur">Sayur</option>
                                <option value="kue_basah">Kue Basah</option>
                            </SelectInput>
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
