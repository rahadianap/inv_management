import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Delete({ id, supplier }) {
    const {
        data: deleteData,
        setData: setDeleteData,
        processing,
        reset,
    } = useForm({
        supplier_code: supplier.supplier_code,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route("suppliers.update", supplier.supplier_code),
            {
                _method: "delete",
                ...deleteData,
            },
            {
                onSuccess: () => {
                    const dialog = document.getElementById(id);
                    dialog.close();
                    toast.success("Data Supplier berhasil dihapus!", {
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
                        .getElementById(`delete_modal${supplier.supplier_code}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                Delete
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
                    <div className="modal-body text-center">
                        <h3 className="font-bold text-lg text-center mb-6">
                            Anda yakin ingin menghapus data ini?
                        </h3>
                        <FaRegTrashAlt
                            size={56}
                            className="mx-auto"
                            color="red"
                        />
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
                                disabled={processing}
                            >
                                Confirm Delete
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
