import { useState } from "react";
import logo from "./PPHlogo.png"; // Ensure file is inside src/

export default function FormPage() {
  const [formData, setFormData] = useState({
    Age: "",
    SystolicBP: "",
    DiastolicBP: "",
    BS: "",
    BodyTemp: "",
    HeartRate: "",
    BMI: "",
    Anaemia: "",
    Parity: "",
    DeliveryMethod: "",
    HistoryPPH: "",
  });

  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null); // ✅ state for backend response

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://pph-app.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

      const data = await response.json();
      console.log("Backend response:", data);

      // ✅ Save result instead of alert
      setResult({
        riskLevel: data.riskLevel,
        probability: data.probability,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({
        riskLevel: "Error",
        probability: "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EED6D3] p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md md:max-w-2xl lg:max-w-5xl border-2 border-[#F28C8C]">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="AI-MAAMA Logo"
            className="h-24 w-24 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-[#2F4F4F] text-center mb-8">
          AI-MAAMA Health Form
        </h1>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700 border border-green-400 text-center font-semibold">
            ✅ Form submitted successfully!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Number fields */}
          {[
            "Age",
            "SystolicBP",
            "DiastolicBP",
            "BS",
            "BodyTemp",
            "HeartRate",
            "BMI",
            "Parity",
          ].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-[#4A7C59] font-semibold mb-1">
                {field}
              </label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-[#4A7C59] focus:outline-none focus:ring-2 focus:ring-[#F28C8C]"
              />
            </div>
          ))}

          {/* Dropdown: Anaemia */}
          <div className="flex flex-col">
            <label className="text-[#4A7C59] font-semibold mb-1">Anaemia</label>
            <select
              name="Anaemia"
              value={formData.Anaemia}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#4A7C59] bg-white focus:outline-none focus:ring-2 focus:ring-[#F28C8C]"
            >
              <option value="">Select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Dropdown: Delivery Method */}
          <div className="flex flex-col">
            <label className="text-[#4A7C59] font-semibold mb-1">
              Delivery Method
            </label>
            <select
              name="DeliveryMethod"
              value={formData.DeliveryMethod}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#4A7C59] bg-white focus:outline-none focus:ring-2 focus:ring-[#F28C8C]"
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">Cesarean</option>
            </select>
          </div>

          {/* Dropdown: History of PPH */}
          <div className="flex flex-col">
            <label className="text-[#4A7C59] font-semibold mb-1">
              History of PPH
            </label>
            <select
              name="HistoryPPH"
              value={formData.HistoryPPH}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#4A7C59] bg-white focus:outline-none focus:ring-2 focus:ring-[#F28C8C]"
            >
              <option value="">Select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#4A7C59] text-white text-lg font-semibold rounded-lg hover:bg-[#2F4F4F] transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* ✅ Result Box */}
        {result && (
          <div className="mt-8 p-6 rounded-lg bg-[#FFF0F0] border border-[#F28C8C] shadow-md text-center">
            <h2 className="text-xl font-bold text-[#2F4F4F] mb-3">
              Prediction Result
            </h2>
            <p className="text-lg text-[#4A7C59] font-semibold">
              Risk Level: <span className="text-[#F28C8C]">{result.riskLevel}</span>
            </p>
            <p className="text-lg text-[#4A7C59] font-semibold">
              Probability: <span className="text-[#F28C8C]">{result.probability}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
