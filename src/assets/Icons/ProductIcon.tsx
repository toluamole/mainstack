import React from "react"
import { Image } from "@chakra-ui/react"
import productIcon from "@/assets/Images/ProductIcon.png"

export const ProductIcon: React.FC<{ boxSize?: string; color?: string }> = ({ boxSize = "20px", ...props }) => (
    <Image 
        src={productIcon} 
        alt="Product" 
        boxSize={boxSize}
        {...props}
    />
)