import React, { useEffect } from "react";
import "./VerificationPage.scss";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { toast, Toaster, useToasterStore } from "react-hot-toast";

const VerificationPage = () => {
    const auth = getAuth()
    const { toasts } = useToasterStore();

    const handleClick = () => {
        sendEmailVerification(auth.currentUser!, {url: "http://localhost:5173/"})
            .then(() => {
              console.log("email send");
              toast.success("Verifications emailen er sent", { duration: 2000 })
            }).catch((error) => {
              console.log(error);
              toast.error("Der opstod en fejl. Verifications emailen kunne ikke sendes", { duration: 2000 })
            });
    }

    const TOAST_LIMIT = 1;

    useEffect(() => {
        toasts
        .filter((t) => t.visible)
        .filter((_, i) => i >= TOAST_LIMIT)
        .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    return (
        <div className="Verification">
            <p className="Verification_Main">
                Være venlig at tjekke din email for verification
            </p>
            <p className="Verification_Secondary">
                Hvis du ikke kan finde emailen klik: <b onClick={handleClick}>Send ny verifications email</b>
            </p>
            <Toaster />
        </div>
    );
};

export default VerificationPage;
