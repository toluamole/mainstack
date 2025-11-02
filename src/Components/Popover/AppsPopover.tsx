import React from "react";
import { Box, HStack, Icon, Text, VStack, Portal } from "@chakra-ui/react";
import { MdArrowForward } from 'react-icons/md';
import { appsMenuItems } from "@/data/appsMenu";

interface IAppsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppsPopover= ({ isOpen, onClose }:IAppsPopoverProps) => {
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
			left="65%"
			transform="translateX(-50%)"
			bg="white"
			borderRadius="16px"
			boxShadow="0px 8px 32px rgba(0, 0, 0, 0.1)"
			p="16px"
			width="350px"
			zIndex={1000}
		>
			<VStack gap="12px" align="stretch">
				{appsMenuItems.map((app) => (
					<HStack 
						key={app.id} 
						cursor="pointer" 
						p="10px" 
						borderRadius="12px"
						position="relative"
						transition="all 0.2s ease"
						role="group"
						_hover={{ 
							bg: 'white',
							boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
						}}
						>
						<Box bg="white" border={'1px solid #EFF1F6'} p="8px" borderRadius="8px">
							<Icon as={app.icon} boxSize="30px" color="black" />
						</Box>
						<VStack align="start" flex="1">
							<Text fontWeight="600" fontSize="14px" color="black">{app.label}</Text>
							<Text fontSize="12px" color="gray.500">{app.description}</Text>
						</VStack>
						<Icon 
							as={MdArrowForward} 
							boxSize="16px" 
							color="gray.400"
							opacity={0}
							transform="translateX(-8px)"
							transition="all 0.2s ease"
							_groupHover={{
								opacity: 1,
								transform: "translateX(0px)"
							}}
						/>
					</HStack>
				))}
			</VStack>
		</Box>
    </Portal>
  );
};