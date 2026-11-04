import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMPTY_USER, userSchema } from "../schemas/userSchema";
import FormInput from "./FormInput";

function UserForm({ initialData, onSubmit, onCancel}) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(userSchema),
        mode: "onTouched",
        defaultValues: initialData ?? EMPTY_USER,
    });

    const [succesMessage, setSuccesMessage] = useState("");

    const submit = async (data) => {
        setSuccesMessage("");

        try {
            await onSubmit(data);
            setSuccesMessage(
                initialData ? "Data Berhasil Di Perbarui" : "Data Berhasil Disimpan"
            );

            if (!initialData) {
                reset(EMPTY_USER);
            }
        } catch (error) {
            if (error.message === "EMAIL_DUPLICATE") {
                setError("email", {
                    type: "server",
                    message: "Email sudah terdaftar, gunakan email lain.",
                });
            } else {
                setError("root.server", {
                    type: "server",
                    message: error.message || "Terjadi kesalahan, silahkan coba lagi",
                });
            }
        }
    };

    return (
        <form>
            
        </form>
    )
}