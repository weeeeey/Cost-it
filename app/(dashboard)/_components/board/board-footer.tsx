import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react';

interface BoardFooterProps {
    isFavorite: boolean;
    title: string;
    authorLabel: string;
    createAtLabel: string;
    onClick: () => void;
    disabled: boolean;
}

export const BoardFooter = ({
    authorLabel,
    createAtLabel,
    disabled,
    isFavorite,
    onClick,
    title,
}: BoardFooterProps) => {
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
    };
    return (
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                {title}
            </p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                {authorLabel},{createAtLabel}
            </p>
            <button
                className={cn(
                    'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
                    disabled && 'cursor-not-allowed opacity-75'
                )}
                disabled={disabled}
                onClick={handleClick}
            >
                <Star
                    className={cn(
                        'w-4 h-4 ',
                        isFavorite && 'fill-blue-600 text-blue-600'
                    )}
                />
            </button>
        </div>
    );
};
