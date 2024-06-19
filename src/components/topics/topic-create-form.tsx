"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Input,
    Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, {
        errors: {},
    });

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">New Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 2-80 w-[300px]">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input
                            name="name"
                            label="Name"
                            labelPlacement="outside"
                            placeholder="Name"
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors.name?.join(", ")}
                        />
                        <Textarea
                            name="description"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your topic"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(
                                ", "
                            )}
                        />
                        {formState.errors._form ? (
                            <div className="p-2 bg-red-200 rounded text-red-800">
                                {formState.errors._form?.join(", ")}
                            </div>
                        ) : null}
                        <FormButton>Save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
