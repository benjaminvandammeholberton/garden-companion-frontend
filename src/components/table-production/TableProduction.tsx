// import FakeVegetableData from "@/dumb-data/vegetablesData";
import { getAllVegetables } from "@/api/api-services/vegetables";
import { columns } from "@/features/data-table/columns";
import { DataTable } from "@/features/data-table/data-table";
import type { AreaInterface } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const TableProduction = ({ area }: { area: AreaInterface }) => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (area) {
        setData(area.vegetables);
      } else {
        try {
          const vegetables = await getAllVegetables();
          setData(vegetables);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [area]);
  
  return (
    data?.length > 0 ? 
    (<div>
      <DataTable columns={columns} data={data} />
    </div>) : (
      <div className="text-center">Aucune donnée à afficher</div>
    )
  );
};

export default TableProduction;
