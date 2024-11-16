import FakeVegetableData from "@/dumb-data/vegetablesData";
import { columns, Vegetable } from "@/features/data-table/columns";
import { DataTable } from "@/features/data-table/data-table";

const TableProduction = ({ area }) => {
  const data = area.vegetables
  return (
    data.length > 0 ? 
    (<div>
      <DataTable columns={columns} data={data} />
    </div>) : (
      <div className="text-center">Aucune donnée à afficher</div>
    )
  );
};

export default TableProduction;
