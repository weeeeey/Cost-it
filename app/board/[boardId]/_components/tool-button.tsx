'use client';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}

export const ToolButton = ({
    icon: Icon,
    isActive,
    isDisabled,
    label,
    onClick,
}: ToolButtonProps) => {
    return (
        <Hint label={label} side="right" sideOffset={10}>
            <Button
                size="icon"
                variant={isActive ? 'boardActive' : 'board'}
                disabled={isDisabled}
                onClick={onClick}
            >
                <Icon />
            </Button>
        </Hint>
    );
};
