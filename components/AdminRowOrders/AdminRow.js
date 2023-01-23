import style from "./AdminRow.module.css";

const AdminRow = () => {
  return (
    <div className={style.AdminProductRow}>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>Order number</h3>
      </div>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>Order date</h3>
      </div>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>customer name</h3>
      </div>

      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>is sent</h3>
      </div>
      <div className={style.AdminProductRowSingleElementIcon}>
        <h3 style={{ textTransform: "uppercase" }}>edit</h3>
      </div>
    </div>
  );
};

export default AdminRow;
