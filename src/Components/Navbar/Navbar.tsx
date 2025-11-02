import { ChatIcon, MenuIcon, NotificationsIcon } from "@/assets/Icons";
import { navLinks } from "@/data/navLinks";
import { Box, HStack, Icon, Text, Image, Avatar } from "@chakra-ui/react";
import { AppsPopover } from "@/Components/Popover/AppsPopover";
import { AccountPopover } from "@/Components/Popover/AccountPopover";
import mainstackLogo from "@/assets/Images/mainstack-logo.png";
import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useGetUserQuery } from "@/service/user";
import { useToast } from "@/hooks/useToast";


export const Navbar = () => {
	const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
	const [isAccountPopoverOpen, setIsAccountPopoverOpen] = useState(false);
	const appsButtonRef = useRef<HTMLDivElement>(null);
	const {data, isError, error} = useGetUserQuery();
	const toast = useToast();
   
	useEffect(() => {
	  if ( isError && error) {
		const errorMessage = 'error' in error ? error.error : 'Unknown error';
		toast.showError(`Failed to load transactions: ${errorMessage}`);
	  }
	}, [error, isError, toast]);

  return (
    <>
      <Box  boxShadow={'0px 2px 4px 0px #2D3B430D'} w={'100%'} border={'2px solid'} borderRadius={'100px'}  bg="white" py={'12px'} px={'24px'} >
		<HStack  alignItems={'center'} justifyContent="space-between" spaceX={'8px'}>
			<Image src={mainstackLogo} alt="Mainstack Logo" boxSize={'40px'} />
			<HStack justifyContent={'space-between'}  spaceX={'20px'}>
				{
					navLinks.map((link) => {
						if (link.id === 'apps') {
							return (
								<Box key={link.id} position="relative">
									<HStack
										ref={appsButtonRef}
										cursor="pointer" 
										bg={link.isActive || isAppsMenuOpen ? '#131316' : 'transparent'}
										borderRadius={link.isActive || isAppsMenuOpen ? '100px' : '0'}
										width={isAppsMenuOpen ? 'auto' : '112px'}
										height={'40px'}
										px={'16px'}
										justifyContent={'center'}
										_hover={{ 
											bg: link.isActive || isAppsMenuOpen ? '#131316' : '#EFF1F6',
											borderRadius: '100px',
											px: '16px',
											justifyContent: 'center'
										}}
										transition="all 0.2s ease"
										onClick={() => setIsAppsMenuOpen(!isAppsMenuOpen)}
									>
										<Icon as={link.icon} boxSize={'20px'} color={link.isActive || isAppsMenuOpen ? 'white' : 'black'} />
										{isAppsMenuOpen ? (
											<>
												<Text fontWeight={'600'} fontSize={'16px'} color={'white'}>
													Apps
												</Text>
												<Box w="1px" h="16px" bg="white" opacity={0.5} />
												<Text fontWeight={'600'} fontSize={'16px'} color={'white'}>
													Link in Bio
												</Text>
											</>
										) : (
											<Text fontWeight={'600'} fontSize={'16px'} color={'#56616B'}>
												{link.label}
											</Text>
										)}
										{isAppsMenuOpen && (
											<Icon as={MdKeyboardArrowDown } boxSize={'16px'} color={'white'} />
										)}
									</HStack>
									
									<AppsPopover 
										isOpen={isAppsMenuOpen} 
										onClose={() => setIsAppsMenuOpen(false)} 
									/>
								</Box>
							);
						}
						
						return (
							<HStack
								key={link.id} 
								cursor="pointer" 
								bg={link.isActive ? '#131316' : 'transparent'}
								borderRadius={link.isActive ? '100px' : '0'}
								width={'112px'}
								height={'40px'}
								px={'16px'}
								justifyContent={'center'}
								_hover={{ 
									bg: link.isActive ? '#131316' : '#EFF1F6',
									borderRadius: '100px',
									px: '16px',
									justifyContent: 'center'
								}}
								transition="all 0.2s ease"
							>
								<Icon as={link.icon} boxSize={'20px'} color={link.isActive ? 'white' : 'black'} />
								<Text fontWeight={'600'} fontSize={'16px'} color={link.isActive ? 'white' : '#56616B'}>{link.label}</Text>
							</HStack>
						);
					})
				}
			</HStack>
			<HStack justifyContent={'space-between'} spaceX={'10px'} alignItems={'center'} >
				<NotificationsIcon color={'black'} boxSize={'20px'} />
				<ChatIcon color={'black'} boxSize={'20px'}/>
				<HStack 
					justifyContent={'center'} 
					align={'center'} 
					w={'81px'} 
					h={'40px'} 
					borderRadius={'100px'} 
					bg={'gray.50'}
					cursor="pointer"
					onClick={() => setIsAccountPopoverOpen(!isAccountPopoverOpen)}
				>
					<Avatar.Root boxSize={'32px'} >
						<Avatar.Fallback name={`${data?.first_name} ${data?.last_name}`} />
						<Avatar.Image src="" />
					</Avatar.Root>
					<MenuIcon color={'black'} boxSize={'24px'} />
				</HStack>
			</HStack>
		</HStack>
      </Box>
      
      <AccountPopover 
        isOpen={isAccountPopoverOpen} 
        onClose={() => setIsAccountPopoverOpen(false)}
		userData={data} 
      />
    </>
  );
}