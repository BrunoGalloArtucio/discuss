"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export interface CreatePostFormState {
    errors: {
        _form?: string[];
        title?: string[];
        content?: string[];
    };
}

export async function createPost(
    topicSlug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
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
                _form: ["You must be signed in to create a Post"],
            },
        };
    }

    const topic = await db.topic.findFirst({
        where: {
            slug: topicSlug,
        },
    });

    if (!topic) {
        return {
            errors: {
                _form: ["Topic not found"],
            },
        };
    }

    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                topicId: topic.id,
                userId: session.user.id,
            },
        });
    } catch (err) {
        return {
            errors: {
                _form: [
                    err instanceof Error
                        ? err.message
                        : "Could not create post. Try again later",
                ],
            },
        };
    }

    revalidatePath(paths.topicShow(topicSlug));
    redirect(paths.postShow(topicSlug, post.id));
}
