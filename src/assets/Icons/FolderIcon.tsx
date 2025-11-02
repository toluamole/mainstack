import React from "react"
import { Image } from "@chakra-ui/react"
import folderIcon from "@/assets/Images/folder.png"

export const FolderIcon: React.FC<{ boxSize?: string; color?: string }> = ({ boxSize = "20px", ...props }) => (
    <Image 
        src={folderIcon} 
        alt="Folder" 
        boxSize={boxSize}
        {...props}
    />
)