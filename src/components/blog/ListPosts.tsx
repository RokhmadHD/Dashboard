'use client';
import React from 'react'
import { Table, TableHeader, TableRow, TableCell, TableBody } from '../ui/table';
import Checkbox from '../form/input/Checkbox';

type Post = {
    id: number;
    title: string;
    author: string;
    date: string;
    update_at?: string;
    excerpt: string;
};

const mockPosts: Post[] = [
    {
        id: 1,
        title: "Understanding React Context",
        author: "Jane Doe",
        date: "2024-06-01",
        excerpt: "A quick guide to using React Context for state management.",
    },
    {
        id: 2,
        title: "TypeScript Tips for Beginners",
        author: "John Smith",
        date: "2024-05-28",
        excerpt: "Essential TypeScript tips to improve your code quality.",
    },
    {
        id: 3,
        title: "Next.js Routing Explained",
        author: "Alice Johnson",
        date: "2024-05-25",
        excerpt: "Learn how routing works in Next.js applications.",
    },
    {
        id: 4,
        title: "Building a Custom Hook",
        author: "Bob Lee",
        date: "2024-05-20",
        excerpt: "Step-by-step guide to creating reusable React hooks.",
    },
    {
        id: 5,
        title: "Styling in React: CSS Modules",
        author: "Emily Clark",
        date: "2024-05-18",
        excerpt: "How to use CSS Modules for scoped styling in React.",
    },
    {
        id: 6,
        title: "Deploying Next.js Apps",
        author: "Michael Brown",
        date: "2024-05-15",
        excerpt: "Best practices for deploying your Next.js applications.",
    },
    {
        id: 7,
        title: "React Performance Optimization",
        author: "Sarah Wilson",
        date: "2024-05-10",
        excerpt: "Tips to make your React apps faster and more efficient.",
    },
    {
        id: 8,
        title: "API Integration with Axios",
        author: "Chris Evans",
        date: "2024-05-08",
        excerpt: "How to fetch data from APIs using Axios in React.",
    },
    {
        id: 9,
        title: "Unit Testing in React",
        author: "Laura Kim",
        date: "2024-05-05",
        excerpt: "An introduction to unit testing React components.",
    },
    {
        id: 10,
        title: "Managing Forms in React",
        author: "David Park",
        date: "2024-05-01",
        excerpt: "A guide to handling forms and validation in React.",
    },
];

interface ListPostsProps {
    search?: string;
}


function ListPosts({search}: ListPostsProps) {
    const [page, setPage] = React.useState(1);
    const [checked, setChecked] = React.useState<boolean[]>(Array(mockPosts.length).fill(false));
    const pageSize = 5;

    const filteredPosts = React.useMemo(() => {
        const searchValue = search?.toLowerCase() ?? '';
        return mockPosts.filter(
            post =>
                post.title.toLowerCase().includes(searchValue) ||
                post.author.toLowerCase().includes(searchValue) ||
                post.excerpt.toLowerCase().includes(searchValue)
        );
    }, [search]);

    const paginatedPosts = React.useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredPosts.slice(start, start + pageSize);
    }, [filteredPosts, page]);

    const totalPages = Math.ceil(filteredPosts.length / pageSize);

    const handleCheck = (index: number) => (checkedValue: boolean) => {
        setChecked(prev => {
            const updated = [...prev];
            updated[index] = checkedValue;
            return updated;
        });
    };

    const allChecked = checked.every(Boolean);
    const handleCheckAll = (checkedValue: boolean) => {
        setChecked(Array(mockPosts.length).fill(checkedValue));
    };
    return (
        <div className="max-w-full overflow-x-auto">
            <div className="min-w-[1102px]">
                <Table className='border border-gray-100 dark:border-white/[0.05]'>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                <Checkbox checked={allChecked} onChange={() => handleCheckAll(allChecked ? false : true)} />
                            </TableCell>
                            {Object.keys(mockPosts[0]).map((key) => {
                                if (key == 'id') return;
                                return (
                                    <TableCell
                                        key={key}
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        {key}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {paginatedPosts.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <Checkbox checked={checked[index]} onChange={handleCheck(index)} />
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {post.title}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {post.excerpt}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {post.date}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {post.author}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-end items-center mt-4 px-2 gap-3">
                    <button
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="text-gray-600 dark:text-gray-300">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListPosts
