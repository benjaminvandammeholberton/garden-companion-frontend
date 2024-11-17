// import FakeVegetableData from "@/dumb-data/vegetablesData";
import { columns } from "@/features/data-table/columns";
import { DataTable } from "@/features/data-table/data-table";
import type { AreaInterface } from "@/interfaces/interfaces";

const TableProduction = ({ area }: { area: AreaInterface }) => {
  const data = area.vegetables;
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
