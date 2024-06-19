"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/[a-z-]/, {
            message: "Must be lowercase letters or dashes without spaces",
        }),
    description: z.string().min(10),
});

export interface CreateTopicFormState {
    errors: {
        _form?: string[];
        name?: string[];
        description?: string[];
    };
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must be signed in to create a Topic"],
            },
        };
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                description: result.data.description,
                slug: result.data.name,
            },
        });
    } catch (err) {
        return {
            errors: {
                _form: [
                    err instanceof Error
                        ? err.message
                        : "Could not create topic. Try again later",
                ],
            },
        };
    }

    revalidatePath(paths.home());
    redirect(paths.topicShow(topic.slug));
}
