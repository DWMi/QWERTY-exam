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
        <h3 style={{ textTransform: "uppercase" }}>qty</h3>
      </div>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>category</h3>
      </div>
      <div className={style.AdminProductRowSingleElement}>
        <h3 style={{ textTransform: "uppercase" }}>brand/type</h3>
      </div>
      <div className={style.AdminProductRowSingleElementIcon}>
        <h3 style={{ textTransform: "uppercase" }}>edit/delete</h3>
      </div>
    </div>
  );
};

export default AdminRow;
