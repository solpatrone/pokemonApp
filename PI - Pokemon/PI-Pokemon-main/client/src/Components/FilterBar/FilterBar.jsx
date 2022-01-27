import React from "react";
import s from "./FilterBar.module.css";

export default function FilterBar({
  allTypes,
  handleSort,
  handleOrderByStr,
  handleFilterType,
  handleCreation,
}) {
  return (
    <div className={s.filter}>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option disabled>Alphabetical</option>
          <option value="asc_alf">A to Z</option>
          <option value="des_alf">Z to A</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleOrderByStr(e)}>
          <option disabled>Strength</option>
          <option value="asc_str">High to Low Strength</option>
          <option value="des_str">Low to High Strength</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleFilterType(e)}>
          <option disabled>Type</option>
          <option value="all">All</option>
          {allTypes &&
            allTypes.map((t) => (
              <option value={t.name} key={t.name}>
                {t.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <select onChange={(e) => handleCreation(e)}>
          <option disabled>Creation</option>
          <option value="all">All</option>
          <option value="createdInDb">Created</option>
          <option value="api">API</option>
        </select>
      </div>
    </div>
  );
}
