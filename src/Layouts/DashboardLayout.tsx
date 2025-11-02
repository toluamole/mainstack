import { Navbar } from '@/Components/Navbar/Navbar';
import { Box } from '@chakra-ui/react';
import React from 'react';

interface IDashBoardLayoutProps {
	children: React.ReactNode;
}

export const DashboardLayout = ({ children }: IDashBoardLayoutProps) => {
  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' h='100vh' p={'16px'}>
        <Navbar />
        <Box flex='1' width={'100%'} spaceY={'82px'}  height={'100%'} overflowY='auto' px={'140px'} py={'85px'}>
            {children}
        </Box>
    </Box>
  );
}