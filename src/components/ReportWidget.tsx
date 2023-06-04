import styles from "../styles/ReportWidget.module.scss";

function ReportWidget() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <p>Id: {}</p>
        <p>Type: {}</p>
        <p>State: {}</p>
        <p>Message: {}</p>
        <p className={styles.linkMock}>Details</p>
      </div>
      <div className={styles.actions}>
        <button>block</button>
        <button>resolve</button>
      </div>
    </div>
  );
}

export default ReportWidget;
