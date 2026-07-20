'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                        <div className="min-w-0 flex-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                    a: ({ href = '', children, ...props }) => {
                                        const isExternal = /^https?:\/\//i.test(href);
                                        const resolvedHref = !isExternal && href.startsWith('/') ? `${basePath}${href}` : href;

                                        return (
                                            <a
                                                {...props}
                                                href={resolvedHref}
                                                target={isExternal ? '_blank' : undefined}
                                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                                className="font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                                            >
                                                {children}
                                            </a>
                                        );
                                    },
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-[#9b0000] dark:text-[#ff8a8a] bg-[#ba0c2f]/10 dark:bg-[#ba0c2f]/25 px-1.5 py-0.5 rounded">
                                            {children}
                                        </strong>
                                    ),
                                    em: ({ children }) => <em className="italic text-neutral-700 dark:text-neutral-200">{children}</em>,
                                }}
                            >
                                {item.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
