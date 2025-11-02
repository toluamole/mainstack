import { VStack, IconButton} from "@chakra-ui/react"
import { ProductIcon, ShapeIcon, FolderIcon, MirrorIcon } from "@/assets/Icons"
import { Tooltip } from "@/Theme/components/ui/tooltip"

interface FloatingMenuProps {
  position?: "fixed" | "absolute"
  top?: string
  right?: string
  left?: string
  bottom?: string
}

export const FloatingMenu = ({ 
  position = "fixed", 
  top = "200px", 
  left = "20px",
  ...props 
}: FloatingMenuProps) => {
  
  const menuItems = [
    {
      icon: ProductIcon,
      label: "Link in bio",
      color: "currentColor"
    },
    {
      icon: ShapeIcon,
      label: "Store",
      color: "currentColor"
    },
    {
      icon: FolderIcon,
      label: "Media kit",
      color: "currentColor"
    },
    {
      icon: MirrorIcon,
      label: "Invoicing",
      color: "currentColor"
    }
  ]

  return (
    <VStack
      position={position}
      top={top}
      left={left}
      // gap={3}
      zIndex={1000}
      bg="white"
      w={'48px'}
      // h={'200px'}
      p={3}
      borderRadius="100px"
      boxShadow="0 8px 24px rgba(0, 0, 0, 0.12)"
      {...props}
    >
      
      {menuItems.map((item, index) => (
        <Tooltip 
          showArrow 
          content={item.label}
          positioning={{ placement: 'right' }}
          contentProps={{ css: { "--tooltip-bg": "#131316", "color": "white" } }}
        >
          <IconButton
            key={index}
            aria-label={item.label}
            size="md"
            borderRadius="full"
            bg="transparent"
            filter="grayscale(100%)"
            _hover={{
              transform: "scale(1.1)",
              bg: "gray.50",
              filter: "grayscale(0%)"
            }}
            transition="all 0.2s ease"
          >
            <item.icon boxSize="20px" />
          </IconButton>
        </Tooltip>
      ))}
      
    </VStack>
  )
}