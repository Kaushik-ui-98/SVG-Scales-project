import { Barplot } from "./Barplot";
import { data } from "./data";

export default function App() {
  return (
    <div style={{ background: "white", minHeight: "100vh", padding: 40 }}>
      <Barplot width={600} height={400} data={data} />
    </div>
  );
}
