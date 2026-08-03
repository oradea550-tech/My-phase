import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

/*
  Onboarding container: holds step state and data between steps.
  Keeps design minimal and relies on existing CSS variables / utility classes.
  Replace styling/hooks with your design system components if available.
*/

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState({
    first_name: "",
    email: "",
    password: "",
    user_id: null, // filled after signUp
  });

  const goToStep2 = (signUpResult) => {
    // signUpResult may include user id
    setAccountData((prev) => ({
      ...prev,
      user_id: signUpResult?.user?.id ?? prev.user_id,
    }));
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="onboarding-root" style={styles.page}>
      <div style={styles.container}>
        {step === 1 && (
          <Step1
            init={accountData}
            onContinue={(data, signUpResult) => {
              setAccountData((prev) => ({ ...prev, ...data }));
              goToStep2(signUpResult);
            }}
          />
        )}
        {step === 2 && (
          <Step2
            init={accountData}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 20px",
    background: "var(--bg, #0b0d10)",
  },
  container: {
    width: "100%",
    maxWidth: 780,
    borderRadius: 14,
    boxShadow: "0 8px 30px rgba(2,8,23,0.6)",
    padding: "36px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
  },
};
