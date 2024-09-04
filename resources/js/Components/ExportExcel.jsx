import { Button, Tooltip } from "@material-tailwind/react";
import * as FileSaver from "file-saver";
// import XLSX from "sheetjs-style";
import * as XLSX from "xlsx";

const ExportExcel = ({ data, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const excel_data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(excel_data, fileName + fileExtension);
    };

    return (
        <>
            <button onClick={(e) => exportToExcel(fileName)}>Export</button>
        </>
    );
};

export default ExportExcel;
