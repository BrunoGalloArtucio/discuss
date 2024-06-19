import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
    const formStatus = useFormStatus();

    return (
        <Button type="submit" isLoading={formStatus.pending}>
            {children}
        </Button>
    );
}
