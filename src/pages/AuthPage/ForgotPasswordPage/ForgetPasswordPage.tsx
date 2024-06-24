import "./ForgotPasswordPage.scss";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, Toaster, useToasterStore } from "react-hot-toast";

import Input from "../../../components/shared/inputField/input";
import Button from "../../../components/shared/buttons/button";
import back from "../../../assets/icons/backIcon.svg"

const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [email, setEmail] = useState("");

    const { toasts } = useToasterStore();

    const handleGoBack = () => {
        navigate("/login");
    };

    // ---------------------------------------
    const handleSendMail = () => {
        sendPasswordResetEmail(auth, email, {url: "http://localhost:5173/"})
        .then(() => {
            console.log("reest email send");
            toast.success("Emailen er sent", { duration: 2000 })
        })
        .catch((error) => {
            console.log(error)
            toast.error("Kunne ikke finde emailen", { duration: 2000 })
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
        <div className="Forgot_Password">

            <div className="Forgot_Password_Back" onClick={() => handleGoBack()}>
                <img src={back} alt="back" />
            </div>
            <div className="Forgot_Password_Text_Container">
                <p>
                    Skriv din email addresse nedenunder, <br></br>
                    så sender vi dig en email hvor du kan lave et nyt password.
                </p>
            </div>
            <div className="Forgot_Password_Email_Container">
                <Input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Button
                    text="Send reset email"
                    size="large"
                    onClick={handleSendMail}
                ></Button>
            </div>
            <Toaster />
        </div>
    );
  };
  
  export default ForgotPasswordPage;