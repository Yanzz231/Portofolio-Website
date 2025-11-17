import { useState, memo, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { Alert } from "../components/ui";
import { Particles } from "../components/animation";
import { Robot } from "../components/3d";

const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_79b0nyj",
        "template_17us8im",
        {
          from_name: formData.name,
          to_name: "Andrian",
          from_email: formData.email,
          to_email: "andrianpratama843@gmail.com",
          message: formData.message,
        },
        "pn-Bw_mS1_QQdofuV"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "You message has been sent!");
    } catch (error) {
      setIsLoading(false);
      showAlertMessage("danger", "Somthing went wrong!");
    }
  };
  return (
    <section className="relative section-spacing">
      <Particles
        className="absolute inset-0 -top-[300px] -z-50"
        quantity={50}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="c-space grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 items-center">
        <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto lg:mx-0 border border-white/10 rounded-2xl bg-primary order-1 lg:order-1">
          <div className="flex flex-col items-start w-full gap-5 mb-10">
            <h2 className="text-heading">Let's Talk</h2>
            <p className="font-normal text-neutral-400">
              Whether you're loking to build a new website, improve your existing
              platform, or bring a unique project to life, I'm here to help
            </p>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="feild-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="field-input field-input-focus"
                placeholder="John Doe"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="feild-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="field-input field-input-focus"
                placeholder="JohnDoe@email.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="feild-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                type="text"
                rows="4"
                className="field-input field-input-focus"
                placeholder="Share your thoughts..."
                autoComplete="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3.5 text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation font-semibold min-h-[52px] transition-all duration-200"
              style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}
            >
              {!isLoading ? "Send" : "Sending..."}
            </button>
          </form>
        </div>

        <div className="h-[500px] lg:h-[600px] w-full order-2 lg:order-2">
          <Robot />
        </div>
      </div>

      <div className="relative pt-[400px] pb-3">
        <div
          className="absolute bottom-0 pointer-events-none h-[800px]"
          style={{
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
            width: '100vw',
            backgroundImage: 'url(/assets/images/backgrounds/mountain-footer.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3
          }}
        />
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
