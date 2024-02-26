'use client';
import { useNewModal } from '@/store/use-new-modal';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import useApiMutation from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

export const NewModal = () => {
    const { isOpen, onClose, orgId } = useNewModal();
    const [title, setTitle] = useState('');
    const [boardType, setboardType] = useState('drawing');

    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        // if (title.length === 0) return toast.error('Title is required');

        mutate({
            orgId,
            title: title || 'Untitled',
            type: boardType || 'drawing',
        })
            .then(() => {
                toast.success('Board created');
            })
            .catch(() => {
                toast.error('Faild to create a board');
            })
            .finally(() => {
                onClose();
                setTitle('');
                setboardType('drawing');
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>New board</DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>

                <Select value={boardType} onValueChange={setboardType}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="drawing">Drawing</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="new title"
                    disabled={pending}
                />

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={pending}
                    >
                        Cancle
                    </Button>
                    <Button
                        variant="default"
                        onClick={onClick}
                        disabled={pending}
                    >
                        Resister
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
