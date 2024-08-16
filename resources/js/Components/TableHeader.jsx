import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeader({
    name,
    sortable = true,
    sort_field = null,
    sort_order = null,
    sortChanged = () => {},
    children,
}) {
    return (
        <th onClick={(e) => sortChanged(name)}>
            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_field === name && sort_order === "asc"
                                    ? "text-emerald-500"
                                    : "")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-2 " +
                                (sort_field === name && sort_order === "desc"
                                    ? "text-emerald-500"
                                    : "")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}
