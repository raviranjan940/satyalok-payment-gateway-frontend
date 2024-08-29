import { useEffect, useState } from "react";
import axios from "axios";
import Field from "./Field"; // Import the Field component
import bgImage from "../../assets/images/image_3.png";
import logo from "../../assets/logo_white.png";
import Header from "../header/Header";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Payment() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        amount: "100",
        pan: "",
    });

    const [errors, setErrors] = useState({});
    const [taxExemption, setTaxExemption] = useState(false);

    const fieldsConfig = [
        {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Enter your full name",
            validation: (value) => !value.trim() && "Name is required",
        },
        {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            validation: (value) => {
                if (!value) return "Email is required";
                if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
                return null;
            },
        },
        {
            label: "Mobile No",
            name: "phone",
            type: "tel",
            placeholder: "Enter your mobile number",
            validation: (value) => {
                if (!value) return "Mobile number is required";
                if (!/^\d{10}$/.test(value))
                    return "Mobile number must be 10 digits";
                return null;
            },
        },
        {
            label: "Donation Amount",
            name: "amount",
            type: "number",
            placeholder: "Enter donation amount",
            validation: (value) => {
                if (!value) return "Amount is required";
                if (isNaN(value) || value <= 0)
                    return "Amount must be a positive number";
                return null;
            },
        },
        {
            label: "PAN Number",
            name: "pan",
            type: "text",
            placeholder: "Enter your PAN number",
            validation: (value) =>
                taxExemption &&
                !value &&
                "PAN Number is required for tax exemption",
        },
    ];

    const predefinedAmounts = [100, 500, 1000, 5000, 10000];

    const validate = () => {
        const errors = {};

        fieldsConfig.forEach((field) => {
            const error = field.validation(formData[field.name]);
            if (error) {
                errors[field.name] = error;
            }
        });

        return errors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await axios.post(`${BACKEND_URL}/order`, formData);
            if (res.data.success) {
                window.location.href =
                    res.data.data.instrumentResponse.redirectInfo.url;
            } else {
                console.error("Failed to process payment:", res.data.message);
                // Handle failure response here
            }
        } catch (error) {
            console.error("Error occurred:", error);
            // Handle error here
        }
    };

    return (
        <div className="max-h-dvh">
            <Header />
            <div className="h-svh flex">
                <div className="h-full w-1/2 xl:w-2/3 relative drop-shadow-lg">
                    <img
                        src={bgImage}
                        alt="Donate to Satyalok"
                        className="object-cover h-full w-full"
                    />

                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    <div className="absolute inset-0 flex flex-col items-start justify-end m-12">
                        <img
                            src={logo}
                            alt="Satyalok"
                            className="w-96 max-w-full grayscale brightness-200"
                        />
                        <h1 className="text-white text-4xl font-bold text-center">
                            Nurturing the Future Together 🌟
                        </h1>

                        <p className="text-white text-center font-bold mt-1">
                            Your donation can help us in providing education to
                            the underprivileged children.
                        </p>

                        <p className="text-white text-center font-bold">
                            Donate now and make a difference.
                        </p>

                        <p className="text-white font-medium text-xs mt-8">
                            Your donated money will be used for the welfare of
                            the society. Satyalok works in the field of
                            education, health, and environment. Your donation
                            will be used for the following purposes: Satyalok
                            For Education | Satyalok For Health | Satyalok For
                            Environment
                        </p>

                        <p className="text-white text-xs mt-4">
                            <i className="fas fa-info-circle mr-1"></i>
                            The image used in the background is AI generated and
                            is not real. It is used for representation purposes
                            only.
                        </p>
                    </div>
                </div>
                <div className="mx-auto w-1/2 p-16 h-full flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600">
                            <i className="fas fa-hand-holding-heart mr-2"></i>
                            Donate Now, Make a Difference
                        </h1>
                        <p className="text-gray-950 mb-8 max-w-2xl text-sm">
                            Your small contribution can make a big difference in
                            someone's life. Donate now and help us in providing
                            education to the underprivileged children. Your
                            donation will be used for the welfare of the
                            society.
                        </p>
                        <form noValidate>
                            <div className="mb-4 flex items-center gap-2">
                                <label
                                    htmlFor="taxExemption"
                                    className="text-green-800 font-bold"
                                >
                                    Tax Exemption under 80G?
                                </label>

                                {/* yes / no buttons */}
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setTaxExemption(true)}
                                        className={`px-4 outline-none focus:outline-none py-1 border rounded-l-lg ${
                                            taxExemption
                                                ? "bg-green-500 text-white"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTaxExemption(false)}
                                        className={`px-4 outline-none focus:outline-none py-1 border rounded-r-lg ${
                                            !taxExemption
                                                ? "bg-red-500 text-white"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {fieldsConfig.map((field) => {
                                if (field.name === "pan" && !taxExemption)
                                    return null; // Skip PAN field if taxExemption is false

                                if (field.name === "amount") {
                                    return (
                                        <div key={field.name} className="mb-4">
                                            <Field
                                                field={field}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                error={errors[field.name]}
                                                className="mt-4"
                                            />

                                            <label className="block text-gray-700 font-semibold sr-only">
                                                or select a predefined amount:
                                            </label>
                                            <div className="flex items-center mt-2 gap-2">
                                                {predefinedAmounts.map(
                                                    (amount) => (
                                                        <button
                                                            key={amount}
                                                            type="button"
                                                            onClick={() =>
                                                                setFormData({
                                                                    ...formData,
                                                                    amount: amount.toString(),
                                                                })
                                                            }
                                                            className={`px-4 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                                                formData.amount ===
                                                                amount.toString()
                                                                    ? "bg-blue-500 text-white"
                                                                    : "border-gray-300"
                                                            }`}
                                                        >
                                                            ₹
                                                            {amount.toLocaleString()}
                                                        </button>
                                                    )
                                                )}
                                            </div>

                                            <p className="text-xs text-gray-500 mt-2">
                                                Cloose a predefined amount or
                                                enter a custom amount
                                            </p>
                                        </div>
                                    );
                                }

                                return (
                                    <Field
                                        key={field.name}
                                        field={field}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        error={errors[field.name]}
                                        className="mb-4"
                                    />
                                );
                            })}

                            <button
                                type="button"
                                onClick={handleClick}
                                className="w-full max-w-44 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                            >
                                <i className="fas fa-hand-holding-heart mr-2"></i>
                                Make Payment
                            </button>

                            <p className="text-xs text-blue-500 mt-2">
                                <i className="fas fa-lock mr-1"></i>
                                Your payment is secure & safe.
                            </p>
                        </form>

                        <p className="text-xs text-gray-500 mt-4">
                            By clicking on the &quot;Make Payment&quot; button,
                            you agree to our{" "}
                            <a
                                href="https://www.satyalok.in/terms-condition"
                                className="underline underline-offset-4"
                            >
                                Terms & Conditions
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://www.satyalok.in/privacy-policy"
                                className="underline underline-offset-4"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                    <footer className="">
                        <ul className="flex gap-5 text-sm text-gray-600">
                            <li>
                                <a
                                    className="hover:text-gray-800 hover:underline"
                                    href="https://www.satyalok.in"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-gray-800 hover:underline"
                                    href="https://www.satyalok.in/privacy-policy"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-gray-800 hover:underline"
                                    href="https://www.satyalok.in/terms-condition"
                                >
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Payment;
