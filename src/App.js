import { useEffect, useState } from "react";
import { CONTINENTS } from "./constants/landingpage";
import CustomTable from "./components/CustomTable";
import styles from "./App.module.scss";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  const filteredCountries =
    activeTab === "All"
      ? countries
      : countries.filter((c) => c.region === activeTab);

  const columns = [
    {
      header: ({ column }) => (
        <div>
          <div>Common Name</div>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search..."
              value={column.getFilterValue() || ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
      ),
      accessorKey: "name.common",
      filterFn: "includesString",
    },
    {
      header: ({ column }) => (
        <div>
          <div>Official Name</div>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search..."
              value={column.getFilterValue() || ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
      ),
      accessorKey: "name.official",
      filterFn: "includesString",
    },
    {
      id: "capital",
      header: ({ column }) => (
        <div>
          <div>Capital City</div>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search..."
              value={column.getFilterValue() || ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
      ),
      accessorFn: (row) => row.capital?.[0] || "N/A",
      filterFn: "includesString",
    },
    {
      id: "currency",
      header: ({ column }) => (
        <div>
          <div>Currency</div>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search..."
              value={column.getFilterValue() || ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
      ),
      accessorFn: (row) => {
        if (!row.currencies) return "N/A";
        const [code, info] = Object.entries(row.currencies)[0];
        return `${code} - ${info.name}`;
      },
      filterFn: "includesString",
    },
    {
      id: "flag",
      enableSorting: false,
      header: ({ column }) => (
        <div>
          <div>Flag</div>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search..."
              value={column.getFilterValue() || ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={`${styles.filterInput} ${styles.hideInput}`}
            />
          </div>
        </div>
      ),
      accessorFn: (row) => row.flag,
      cell: (info) => <span>{info.getValue()}</span>,
      filterFn: "includesString",
    },
    {
      header: ({ column }) => (
        <div>
          <div>Region</div>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search..."
              value={column.getFilterValue() || ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
      ),
      accessorKey: "region",
      filterFn: "includesString",
    },
    {
      header: ({ column }) => (
        <div>
          <div>Subregion</div>
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search..."
              value={column.getFilterValue() || ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>
      ),
      accessorKey: "subregion",
      filterFn: "includesString",
    },
  ];

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,timezones,flag,subregion"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className={styles.appContainer}>
      <div className={styles.tabWrapper}>
        {CONTINENTS.map((continent) => (
          <div
            key={continent}
            className={`${styles.tabButton} ${
              activeTab === continent ? styles.active : ""
            }`}
            onClick={() => setActiveTab(continent)}
          >
            {continent}
          </div>
        ))}
      </div>
      <CustomTable data={filteredCountries} columns={columns} />
    </div>
  );
}
