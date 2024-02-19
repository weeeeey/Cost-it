import { Camera, Color } from '@/types/type-canvas';
import React from 'react';

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = ({
    camera,
    setLastUsedColor,
}: SelectionToolsProps) => {
    return <div></div>;
};
