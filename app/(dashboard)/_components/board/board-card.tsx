'use client';

import Link from 'next/link';
import { BoardType } from './board-list';
import Image from 'next/image';
import { BoardOverlay } from './board-overlay';
import { format, formatDistanceToNow } from 'date-fns';
import { useAuth } from '@clerk/clerk-react';
import { BoardFooter } from './board-footer';
import { Actions } from '@/components/actions';
import { MoreHorizontal } from 'lucide-react';

interface BoardCardProps extends Omit<BoardType, '_creationTime' | '_id'> {
    createdAt: number;
    id: string;
    isFavorite: boolean;
}

const BoardCard = ({
    createdAt,
    id,
    authorId,
    authorName,
    imageUrl,
    orgId,
    title,
    isFavorite,
}: BoardCardProps) => {
    const { userId } = useAuth();

    const authorLabel = userId === authorId ? 'You' : authorName;
    const createAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });
    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image src={imageUrl} alt={title} fill />
                    <BoardOverlay />
                    <Actions id={id} title={title} side="right">
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>
                    </Actions>
                </div>
                <BoardFooter
                    authorLabel={authorLabel}
                    createAtLabel={createAtLabel}
                    disabled={false}
                    isFavorite={isFavorite}
                    onClick={() => {}}
                    title={title}
                />
            </div>
        </Link>
    );
};

export default BoardCard;
