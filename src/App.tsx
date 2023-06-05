import { useState, useEffect } from "react";
import ReportWidget from "./components/ReportWidget";
import axios from "axios";

const SERVER = "http://localhost:4000";

interface ReportsData {
  size: number;
  nextOffset: String;
  elements: Report[];
}

interface Report {
  id: string;
  source: string;
  sourceIdentityId: string;
  reference: Reference;
  state: string;
  payload: Payload;
  created: string;
}

interface Reference {
  referenceId: string;
  referenceType: string;
}

interface Payload {
  source: string;
  reportType: string;
  message: string | null;
  reportId: string;
  referenceResourceId: string;
  referenceResourceType: string;
}

function App() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    function fetchReports() {
      axios
        .get(`${SERVER}/reports`)
        .then((response) => {
          parseReports(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchReports();
  }, []);

  function parseReports(reportsData: ReportsData) {
    const reports: Report[] = reportsData.elements;
    const openReports = [];
    for (let i = 0; i < reports.length; i++) {
      if (reports[i].state === "OPEN") {
        openReports.push(reports[i]);
      }
    }
    setReports(openReports);
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
