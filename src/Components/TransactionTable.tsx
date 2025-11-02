import { Box, Flex, Heading, HStack, Icon,  Text, VStack, Image, Button } from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsDownload } from 'react-icons/bs';
import { BsArrowDownLeft } from 'react-icons/bs';
import { BsArrowUpRight } from 'react-icons/bs';
import { Separator } from "@chakra-ui/react";
import { FilterModal } from '@/Components/FilterModal/FilterModal';
import { useState, useEffect } from 'react';
import { useGetTransactionQuery } from '@/service/transactions';
import { useToast } from '@/hooks/useToast';
import receipt from '@/assets/Images/receipt_long.png'

export const TransactionTable = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const {data, error, isError} = useGetTransactionQuery();
  const toast = useToast();

  useEffect(() => {
    if ( isError && error) {
      const errorMessage = 'error' in error ? error.error : 'Unknown error';
      toast.showError(`Failed to load transactions: ${errorMessage}`);
    }
  }, [error, isError, toast]);

  return (
    <Box>
        <HStack w={'100%'} justifyContent={'space-between'} align='flex-start' >
            <Box >
                <Heading fontSize={'20px'} fontWeight={600} color={'black'} >{data?.length} Transactions</Heading>
                <Text color={'#56616B'}>Your transactions for the last 7 days</Text>
            </Box>
            <HStack>
                <Flex 
                    bg={'gray.50'} 
                    justifyContent={'center'} 
                    spaceX={'4px'} 
                    alignItems='center' 
                    cursor={'pointer'} 
                    borderRadius='100px'  
                    w={'107px'} 
                    h={'48px'} 
                    px='12px' 
                    py='8px'
                    onClick={() => setIsFilterModalOpen(true)}
                >
                    <Text fontWeight={600} color={'textBlack.300'}>Filter</Text>
                    <Icon boxSize={'14px'}>
                        <MdKeyboardArrowDown size={'20px'}   color='black' />
                    </Icon>
                </Flex>
                 <Flex bg={'gray.50'} justifyContent={'space-between'} spaceX={'4px'} alignItems='center' cursor={'pointer'} borderRadius='100px'  w={'auto'} h={'48px'} px='12px' py='8px' >
                    <Text fontWeight={600} color={'textBlack.300'}>Export list</Text>
                    <Icon boxSize={'14px'} >
                        <BsDownload color='black' />
                    </Icon>
                </Flex>
            </HStack>
        </HStack>
        <Separator my='24px' borderColor={'gray.50'} />
        { data ? <VStack  spaceY={'20px'} justifyContent={'space-between'} align={'center'}  w={'100%'}>
            {
                data?.map((transaction) => (
                    <HStack key={transaction.payment_reference} justifyContent={'space-between'} align={'center'} w={'100%'} >
                        <HStack alignItems='center' >
                            <Flex borderRadius={'50%'} justifyContent={'center'} alignItems={'center'}  boxSize={'48px'} bg={transaction.status === 'successful' ?  '#E3FCF2'  : 'red.100'}>
                                <Icon  color={transaction.status === 'successful' ? 'green.500' : 'red.400'}  >
                                    {transaction.status === 'successful' ? <BsArrowUpRight color='green.500' size={'20px'}   /> : <BsArrowDownLeft color='red.400' size={'20px'}   />}
                                </Icon>
                            </Flex>
                            <Box >
                                <Text fontWeight={500}  color={'textBlack.300'}>{transaction.metadata?.product_name ? transaction.metadata?.product_name : transaction.type }</Text>
                                <Text fontWeight={500} fontSize={'14px'} color={'gray.400'}>{transaction.metadata?.name ? transaction.metadata?.name : transaction.status}</Text>
                            </Box>
                        </HStack>
                        <Box textAlign={'right'}>
                            <Heading fontSize={'16px'} fontWeight={700} color={'textBlack.300'}>USD {transaction.amount.toFixed(2)}</Heading>
                            <Text fontWeight={500} color={'gray.400'}>
                                {new Date(transaction.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </Text>
                        </Box>
                    </HStack>
                ))
            }
        </VStack> :
        <Box display="flex" justifyContent="center" w="100%">
            <VStack mt={'65px'} gap={'10px'} align={'start'}  >
            <Box display={'flex'} mb={'20px'} boxSize={'48px'} justifyContent={'center'} alignItems={'center'} bg={'gray.50'} borderRadius={'16px'}>
                <Image w={'24px'} h={'24px'} src={receipt}  />
            </Box>
            <Heading w={'369px'}  fontSize={'28px'} fontWeight={700} color={'textBlack.300'}>No matching transaction found for selected filter</Heading>
            <Text w={'369px'}  fontSize={'16px'} fontWeight={500} color={'gray.400'}>Change your filters to see more results, or add a new product.</Text>
            <Button  bg={'gray.50'} borderRadius='100px'  w={'117px'} h={'48px'}>Clear Filter</Button>
            </VStack>
        </Box>}
        
        <FilterModal 
            isOpen={isFilterModalOpen} 
            onClose={() => setIsFilterModalOpen(false)} 
        />
    </Box>
  );
}