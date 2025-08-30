import { useState } from "react";
import logo from "./PPHlogo.png";
import heroImage from "./assets/hero.png";

export default function LandingPage() {
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
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pph-app.onrender.com/predict", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult({ riskLevel: data.riskLevel, probability: data.probability });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({ riskLevel: "Error", probability: "Try again later." });
    }
  };

  // Generate advice based on risk level
  const getAdvice = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
  case "low":
    return "🟢 Low Risk: Patient presents a low risk of complications. Continue with routine antenatal monitoring and standard care protocols. No immediate intervention is required beyond regular follow-up.";
  case "medium":
    return "🟠 Medium Risk: Patient has a moderate risk for complications. Recommend closer observation and schedule more frequent antenatal visits. Consider basic investigations and ensure readiness for timely referral if condition worsens.";
  case "high":
    return "⚠️ High Risk: Patient is at a high risk of complications. Immediate referral to a higher-level facility is advised. Prepare stabilization measures if necessary and ensure prompt transfer for specialized obstetric care.";
  default:
    return "No advice available. Please review patient details and try again.";
}

  };

  return (
    <div className="bg-[#EED6D3] text-[#2F4F4F]">
      {/* Header */}
      <header className="bg-[#FFF0F0] border-b-2 border-[#F28C8C]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="AI-MAAMA Logo" className="h-12 w-12" />
            <h1 className="text-xl md:text-2xl font-bold text-[#4A7C59]">
              AI-MAAMA
            </h1>
          </div>
          <nav className="flex gap-4 mt-3 md:mt-0 font-semibold text-[#4A7C59] text-sm md:text-base">
            <a href="#features" className="hover:text-[#F28C8C]">Features</a>
            <a href="#form" className="hover:text-[#F28C8C]">Health Form</a>
            <a href="#contact" className="hover:text-[#F28C8C]">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#F28C8C]/20 to-[#4A7C59]/20 px-6 md:px-12 py-12">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 items-center gap-8">
          {/* Left side - Text */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold leading-snug mb-4">
              Smarter Maternal Health, Powered by AI
            </h2>
            <p className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-6 text-gray-700">
              AI-MAAMA helps mothers and healthcare providers detect risks early,
              prevent complications, and make informed decisions for safer deliveries.
            </p>
            <a
              href="#form"
              className="inline-block bg-[#4A7C59] text-white px-8 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-[#2F4F4F] transition shadow-md"
            >
              Get Started
            </a>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={heroImage}
              alt="Joyful Black women celebrating motherhood"
              className="w-full max-w-md rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12"
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#F28C8C]">
          <h3 className="text-2xl font-bold mb-4 text-[#4A7C59]">AI Risk Detection</h3>
          <p className="text-lg text-gray-700">
            Get instant predictions for postpartum risks based on your health data.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#4A7C59]">
          <h3 className="text-2xl font-bold mb-4 text-[#4A7C59]">Personalized Insights</h3>
          <p className="text-lg text-gray-700">
            Tailored guidance for mothers to stay safe and healthy during pregnancy.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#2F4F4F]">
          <h3 className="text-2xl font-bold mb-4 text-[#4A7C59]">Easy Access</h3>
          <p className="text-lg text-gray-700">
            A simple, accessible tool designed for both mothers and healthcare workers.
          </p>
        </div>
      </section>

      {/* Health Form */}
      <section
        id="form"
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border-2 border-[#F28C8C] p-10 my-16"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#4A7C59]">
          AI-MAAMA Health Form
        </h2>

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700 border border-green-400 text-center font-semibold">
            ✅ Form submitted successfully!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { key: "Age", label: "Age (years)" },
            { key: "SystolicBP", label: "Systolic Blood Pressure (mmHg)" },
            { key: "DiastolicBP", label: "Diastolic Blood Pressure (mmHg)" },
            { key: "BS", label: "Blood Sugar (mmol/L)" },
            { key: "BodyTemp", label: "Body Temperature (°F)" },
            { key: "HeartRate", label: "Heart Rate (beats/min)" },
            { key: "BMI", label: "Body Mass Index (BMI)" },
            { key: "Parity", label: "Number of Previous Deliveries (Parity)" },
          ].map(({ key, label }) => (
            <div key={key} className="flex flex-col">
              <label className="text-[#4A7C59] font-semibold mb-1">{label}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-[#4A7C59] focus:ring-2 focus:ring-[#F28C8C]"
              />
            </div>
          ))}

          {/* Dropdowns */}
          {[
            { name: "Anaemia", label: "Anaemia (Low Blood Level)", options: ["No","Yes"] },
            { name: "DeliveryMethod", label: "Delivery Method", options: ["Normal","Cesarean"] },
            { name: "HistoryPPH", label: "History of Postpartum Haemorrhage (PPH)", options: ["No","Yes"] },
          ].map(({ name, label, options }) => (
            <div key={name} className="flex flex-col">
              <label className="text-[#4A7C59] font-semibold mb-1">{label}</label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-[#4A7C59] focus:ring-2 focus:ring-[#F28C8C]"
              >
                <option value="">Select</option>
                {options.map((opt, i) => (
                  <option key={i} value={i}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#4A7C59] text-white text-lg font-semibold rounded-lg hover:bg-[#2F4F4F] transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Prediction Result + Advice */}
        {result && (
          <div className="mt-10 p-6 rounded-lg bg-[#FFF0F0] border border-[#F28C8C] shadow-md text-center">
            <h2 className="text-xl font-bold text-[#2F4F4F] mb-3">Prediction Result</h2>
            <p className="text-lg text-[#4A7C59] font-semibold">
              Risk Level: <span className="text-[#F28C8C]">{result.riskLevel}</span>
            </p>
            <p className="text-lg text-[#4A7C59] font-semibold">
              Confidence: <span className="text-[#F28C8C]">{result.probability}</span>
            </p>

            {/* Advice Section */}
            <div className="mt-6 p-6 bg-green-50 border border-green-300 rounded-xl">
              <h3 className="text-2xl font-bold text-[#4A7C59] mb-3">What’s Next?</h3>
              <p className="text-lg text-gray-700">{getAdvice(result.riskLevel)}</p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#2F4F4F] text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} AI-MAAMA. All rights reserved.</p>
        <p className="mt-2">Built with ❤️ to save mothers’ lives.</p>
      </footer>
    </div>
  );
}
