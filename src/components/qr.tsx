import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Papa from "papaparse";

export default function QRCodeVerifier() {
  const [status, setStatus] = useState("");
  const [validIds, setValidIds] = useState<string[]>([]);
  const [scannedIds, setScannedIds] = useState(new Set());

  interface CSVRow {
    "Unique ID": string;
  }

  interface PapaParseResult {
    data: CSVRow[];
  }

  const loadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<CSVRow>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: PapaParseResult) => {
          const ids = results.data.map((row) => row["Unique ID"]);
          setValidIds(ids);
        },
      });
    }
  };

  const startScanner = () => {
    const qrScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    qrScanner.render((decodedText) => {
      if (scannedIds.has(decodedText)) {
        setStatus("⚠️ Warning: QR Code already scanned!");
      } else if (validIds.includes(decodedText)) {
        setScannedIds((prev) => new Set(prev).add(decodedText));
        setStatus("✅ Success: QR Code is valid!");
      } else {
        setStatus("❌ Error: Invalid QR Code");
      }
        qrScanner.clear();
      },
      (errorMessage) => {
        console.log(`QR Code scan error: ${errorMessage}`);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">QR Code Verifier</h1>
      <input title="new" type="file" accept=".csv" onChange={loadCSV} className="my-4" />
      <div id="reader" className="my-4"></div>
      <button onClick={startScanner} disabled={validIds.length === 0}>
        Start Scanning
      </button>
      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
}