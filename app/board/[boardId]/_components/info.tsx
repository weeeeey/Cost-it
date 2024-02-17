'use client';
import { Actions } from '@/components/actions';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useRenameModal } from '@/store/use-rename-modal';
import { useQuery } from 'convex/react';
import { Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const font = Poppins({
    subsets: ['latin'],
    weight: ['500'],
});

interface InfoProps {
    boardId: string;
}

export const Info = ({ boardId }: InfoProps) => {
    const data = useQuery(api.board.get, {
        id: boardId as Id<'boards'>,
    });
    const { onOpen } = useRenameModal();
    if (!data) {
        return <InfoSkeleton />;
    }
    return (
        <div className="absolute top-2 left-2 bg-stone-200 rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to boards " side="bottom" sideOffset={10}>
                <Link href="/" className="flex justify-center items-center">
                    <Image
                        width={40}
                        height={40}
                        src="/logo.png"
                        alt="Board logo"
                    />
                </Link>
            </Hint>
            <Separator
                orientation="vertical"
                className="bg-black/20  py-4 h-[4px]"
            />
            <Hint label="Edit title" side="bottom" sideOffset={10}>
                <Button
                    onClick={() => onOpen(data._id, data.title)}
                    variant="ghost"
                    className={cn('', font.className)}
                >
                    {data.title}
                </Button>
            </Hint>
            <Separator
                orientation="vertical"
                className="bg-black/20  py-4 h-[4px]"
            />
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
};

export function InfoSkeleton() {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
    );
}
