import styles from "../styles/ReportWidget.module.scss";
import axios from "axios";

const SERVER = "http://localhost:4000";

interface types {
  id: string;
  type: string;
  state: string;
  message: string;
  closeReport: (id: string) => void;
  revokeReport: (id: string) => void;
}

function ReportWidget({
  id,
  type,
  state,
  message,
  closeReport,
  revokeReport,
}: types): JSX.Element {
  function handleBlock(id: string): void {
    axios
      .put(`${SERVER}/reports/${id}`, {
        ticketState: "REVOKED",
      })
      .then((response) => {
        if (response.status === 200) {
          revokeReport(id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleResolve(id: string): void {
    axios
      .put(`${SERVER}/reports/${id}`, {
        ticketState: "CLOSED",
      })
      .then((response) => {
        if (response.status === 200) {
          closeReport(id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <p>Id: {id}</p>
        <p>Type: {type}</p>
        <p>State: {state}</p>
        <p>Message: {message}</p>
        <p className={styles.linkMock}>Details</p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => handleBlock(id)}>block</button>
        <button onClick={() => handleResolve(id)}>resolve</button>
      </div>
    </div>
  );
}

export default ReportWidget;
