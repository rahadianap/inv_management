import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function Show({ id, unit }) {
    const {
        data: editData,
        setData: setEditData,
        errors,
        reset,
    } = useForm({
        unit_code: unit.unit_code,
        unit_name: unit.unit_name,
    });

    return (
        <>
            <button
                onClick={() =>
                    document
                        .getElementById(`view_modal${unit.unit_code}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 font-semibold text-sm text-gray-900 uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                {unit.unit_code}
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
                            {unit.unit_name}
                        </h3>
                        <div>
                            <InputLabel
                                htmlFor="unit_code"
                                value="Kode Satuan"
                            />

                            <TextInput
                                id="unit_code"
                                className="mt-1 block w-full mb-4"
                                value={editData.unit_code}
                                onChange={(e) =>
                                    setEditData("unit_code", e.target.value)
                                }
                                disabled
                                isFocused
                                autoComplete="unit_code"
                            />

                            <InputError
                                className="mt-2 mb-4"
                                message={errors.unit_code}
                            />
                        </div>
                        <div>
                            <InputLabel
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
                                disabled
                                isFocused
                                autoComplete="unit_name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.unit_name}
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
