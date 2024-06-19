import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { db } from "@/db";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

interface ShowTopicPageProps {
    params: {
        slug: string;
    };
}

export default async function ShowTopicPage({ params }: ShowTopicPageProps) {
    const { slug } = params;

    const post = await db.topic.findFirst({
        where: {
            slug,
        },
    });

    if (!post) {
        return notFound();
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-2xl font-bold mb-2">{slug}</h1>
                <PostList fetchPosts={fetchPostsByTopicSlug.bind(null, slug)} />
            </div>
            <div className="border shadow py-3 px-2">
                <PostCreateForm topicSlug={slug} />
                <Divider className="my-2" />
                <div>{post.description}</div>
            </div>
        </div>
    );
}
