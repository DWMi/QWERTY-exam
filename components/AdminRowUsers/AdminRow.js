import style from "./AdminRow.module.css";

const AdminRow = () => {
  return (
    <div className={style.AdminProductRow}>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>id</h3>
      </div>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>name</h3>
      </div>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>email</h3>
      </div>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>address</h3>
      </div>
      <div className={style.AdminProductRowSingleElementIsAdmin}>
        <h3 style={{ textTransform: "uppercase" }}>is admin</h3>
      </div>
      <div className={style.AdminProductRowSingleElementIcon}>
        <h3 style={{ textTransform: "uppercase" }}>edit/delete</h3>
      </div>
    </div>
  );
};

export default AdminRow;
