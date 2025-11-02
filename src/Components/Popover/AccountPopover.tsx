import { Box, HStack, Text, VStack, Portal, Avatar } from "@chakra-ui/react";
import { accountMenuItems } from "@/data/AccountMenu";
import type { IUser } from "@/Types/Interface/IUser";

interface IAccountPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: IUser
}

export const AccountPopover = ({ isOpen, onClose, userData }: IAccountPopoverProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
		<Box
			position="fixed"
			top="0"
			left="0"
			right="0"
			bottom="0"
			zIndex={999}
			onClick={onClose}
		/>
		<Box
			position="fixed"
			top="90px"
			right="24px"
			bg="white"
			borderRadius="16px"
			boxShadow="0px 8px 32px rgba(0, 0, 0, 0.1)"
			p="16px"
			width="280px"
			zIndex={1000}
		>
			
			<HStack p="12px" mb="8px">
			<Avatar.Root boxSize="40px">
				<Avatar.Fallback name="Olivier Jones" color="white" fontWeight="600" />
			</Avatar.Root>
			<VStack align="start" gap="1px" flex="1">
				<Text fontWeight="600" fontSize="16px" color="black">{`${userData?.first_name} ${userData?.last_name}`}</Text>
				<Text fontSize="14px" color="gray.500">{userData?.email}</Text>
			</VStack>
			</HStack>

			<VStack gap="4px" align="stretch">
				{accountMenuItems.map((item) => (
					<HStack 
						key={item.id} 
						cursor="pointer" 
						p="12px" 
						borderRadius="8px"
					>
						<item.icon size={'18px'} color={"#56616B"} />
						<Text fontWeight="500" fontSize="14px" color="black">{item.label}</Text>
					</HStack>
				))}
			</VStack>
		</Box>
    </Portal>
  );
};