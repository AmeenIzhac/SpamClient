import { useState, useEffect } from "react";
import ReportWidget from "./components/ReportWidget";
import axios from "axios";
import { Report } from "./Types.tsx";

const SERVER: string = "http://localhost:4000";

function App(): JSX.Element {
  const [reports, setReports] = useState<Report[]>([]);

  // fetch reports from server on load and update local state
  useEffect(() => {
    function fetchReports(): void {
      axios
        .get(`${SERVER}/reports`)
        .then((response) => {
          setReports(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchReports();
  }, []);

  // update local report state to REVOKED
  function revokeReport(id: string) {
    setReports(
      reports.map((report) => {
        if (report.id === id) {
          return { ...report, state: "REVOKED" };
        }
        return report;
      })
    );
  }

  // remove report from local state
  function closeReport(id: string): void {
    setReports(reports.filter((report) => report.id !== id));
  }

  return (
    <div>
      <h1>Reports</h1>
      {reports.map((report: Report) => (
        <ReportWidget
          key={report.id}
          id={report.id}
          type={report.payload.reportType}
          state={report.state}
          closeReport={closeReport}
          revokeReport={revokeReport}
          message={
            report.payload.message
              ? report.payload.message.substring(0, 20)
              : ""
          }
        />
      ))}
    </div>
  );
}

export default App;
