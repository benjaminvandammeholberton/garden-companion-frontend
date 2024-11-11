import FakeVegetableData from "@/dumb-data/vegetablesData";
import { columns, Vegetable } from "@/features/data-table/columns";
import { DataTable } from "@/features/data-table/data-table";

const TableProduction = ({ area }) => {
  const data = area.vegetables
  return (
    data && 
    (<div>
      <DataTable columns={columns} data={data} />
    </div>)
  );
};

export default TableProduction;
