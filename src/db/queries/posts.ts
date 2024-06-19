import { db } from "@/db";

// export type PostListItem = Post & {
//     topic: {
//         slug: string;
//     };
//     user: {
//         name: string | null;
//     };
//     _count: {
//         comments: number;
//     };
// };

export type PostListItem = Awaited<
    ReturnType<typeof fetchPostsByTopicSlug>
>[number];

export async function fetchPostsByTopicSlug(slug: string) {
    return db.post.findMany({
        where: {
            topic: { slug },
        },
        include: {
            topic: {
                select: { slug: true },
            },
            user: {
                select: { name: true },
            },
            _count: {
                select: { comments: true },
            },
        },
    });
}

export async function fetchTopPosts(): Promise<PostListItem[]> {
    return db.post.findMany({
        orderBy: {
            comments: {
                _count: "desc",
            },
        },
        include: {
            topic: {
                select: { slug: true },
            },
            user: {
                select: { name: true },
            },
            _count: {
                select: { comments: true },
            },
        },
        take: 5,
    });
}

export async function fetchPostsBySearchTerm(
    term: string
): Promise<PostListItem[]> {
    return db.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: term,
                    },
                },
                {
                    content: {
                        contains: term,
                    },
                },
            ],
        },
        orderBy: {
            comments: {
                _count: "desc",
            },
        },
        include: {
            topic: {
                select: { slug: true },
            },
            user: {
                select: { name: true },
            },
            _count: {
                select: { comments: true },
            },
        },
        take: 5,
    });
}
