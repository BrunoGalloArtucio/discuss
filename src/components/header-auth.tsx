"use client";

import * as actions from "@/actions";
import {
    Popover,
    PopoverTrigger,
    Avatar,
    PopoverContent,
    Button,
    NavbarItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
    const session = useSession();

    if (session.status === "loading") {
        return null;
    } else if (session.data?.user) {
        return <SignedInContent imageSrc={session.data.user.image} />;
    }
    return <SignedOutContent />;
}

interface SignedInContentProps {
    imageSrc?: string | null;
}

function SignedInContent({ imageSrc }: SignedInContentProps) {
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Avatar src={imageSrc ?? ""} />
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <form action={actions.signOut}>
                        <Button type="submit">Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    );
}

function SignedOutContent() {
    return (
        <>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" color="secondary" variant="bordered">
                        Sign In
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" color="primary" variant="flat">
                        Sign Up
                    </Button>
                </form>
            </NavbarItem>
        </>
    );
}
