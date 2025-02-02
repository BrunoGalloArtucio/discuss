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

interface PostCreateFormProps {
    topicSlug: string;
}

export default function PostCreateForm({ topicSlug }: PostCreateFormProps) {
    const [formState, action] = useFormState(
        actions.createPost.bind(null, topicSlug),
        {
            errors: {},
        }
    );

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">New Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 2-80 w-[300px]">
                        <h3 className="text-lg">Create a Post</h3>
                        <Input
                            name="title"
                            label="Title"
                            labelPlacement="outside"
                            placeholder="Name"
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(", ")}
                        />
                        <Textarea
                            name="content"
                            label="Content"
                            labelPlacement="outside"
                            placeholder="Describe your topic"
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(", ")}
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
