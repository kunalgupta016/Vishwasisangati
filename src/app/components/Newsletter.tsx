import { Mail } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <section className="py-20 bg-[#2F80ED]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="mx-auto mb-6 text-white" size={48} />
        <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-lg text-white/90 mb-8">
          Subscribe to our newsletter to receive updates about our projects, events, and impact stories
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-4 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
          />
          <button
            type="submit"
            className="bg-[#27AE60] text-white px-8 py-4 rounded-lg hover:bg-[#229954] transition-colors duration-200 shadow-lg whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
