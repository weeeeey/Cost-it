'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BoardOverlay } from './board-overlay';
import { format, formatDistanceToNow } from 'date-fns';
import { useAuth, useOrganization } from '@clerk/clerk-react';
import { BoardFooter } from './board-footer';
import { Actions } from '@/components/actions';
import { MoreHorizontal } from 'lucide-react';
import useApiMutation from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

interface BoardCardProps {
    createdAt: number;
    id: string;
    authorId: string;
    authorName: string;
    imageUrl: string;
    orgId: string;
    title: string;
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
    const { mutate: onFavorite, pending: favorPending } = useApiMutation(
        api.board.favorite
    );
    const { mutate: unFavorite, pending: unFavorPending } = useApiMutation(
        api.board.unFavorite
    );
    const { organization } = useOrganization();
    if (!organization) {
        return null;
    }
    const toggleFavorite = () => {
        if (isFavorite) {
            unFavorite({
                id,
            }).catch(() => toast.error('Failed to unfavorite'));
        } else {
            onFavorite({
                id,
                orgId,
            }).catch(() => toast.error('Failed to favorite'));
        }
    };

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
                    disabled={favorPending || unFavorPending}
                    isFavorite={isFavorite}
                    onClick={toggleFavorite}
                    title={title}
                />
            </div>
        </Link>
    );
};

export default BoardCard;
