import {  Button, Heading, Text, VStack, HStack, Icon, Flex } from "@chakra-ui/react"
import { DashboardLayout } from "./Layouts/DashboardLayout"
import { ChartComponent} from "./Components/Chart/Chart"
import { TransactionTable } from "./Components/TransactionTable"
import { FloatingMenu } from "./Components/FloatingMenu"
import { useGetWalletQuery } from "./service/wallet"
import { Info } from "lucide-react"
import { useGetTransactionQuery } from "./service/transactions"
import { useToast } from "./hooks/useToast"
import { useEffect } from "react"

function App() {
	const {data, error: walletError, isError: isWalletError} =  useGetWalletQuery();
	const {data:transactions, error: transactionError, isError: isTransactionError} = useGetTransactionQuery();
	const toast = useToast();
	   
	useEffect(() => {
		if (isWalletError && walletError) {
			const errorMessage = 'error' in walletError ? walletError.error : 'Unknown error';
			toast.showError(`Failed to load wallet data: ${errorMessage}`);
		}
	}, [walletError, isWalletError, toast]);

	useEffect(() => {
		if (isTransactionError && transactionError) {
			const errorMessage = 'error' in transactionError ? transactionError.error : 'Unknown error';
			toast.showError(`Failed to load transactions: ${errorMessage}`);
		}
	}, [transactionError, isTransactionError, toast]);

  return (
    <DashboardLayout>
		<Flex justifyContent={'space-between'} alignItems={'flex-start'}>
			<VStack  justifyContent={'space-between'} align={'flex-start'}>
				<HStack width={'462px'} justifyContent={'space-between'} alignItems={'center'}>
					<VStack justifyContent={'flex-start' } align={'flex-start'}>
						<Text color={'gray.400'} textAlign={'left'} >
							Available Balance
						</Text>
						<Heading color={'black'} fontSize='32px' fontWeight='700'>
							USD {data?.balance.toFixed(2) || 0.00}
						</Heading>
					</VStack>
					<Button variant="outline" w={'167px'} h={'52px'} fontSize={'16px'} fontWeight={600}>Withdraw</Button>
				</HStack>
				<ChartComponent data={transactions!} />
			</VStack>
			<VStack w={'auto'} spaceY={'32px'} justify={'flex-start'} align={'flex-start'}>
				
						<VStack  align={'flex-start'} >
							<HStack justifyContent={'space-between'} w={'271px'}>
								<Text fontWeight={500} fontSize={'14px'} color={'gray.400'}>Ledger Balance</Text>
								
								<Icon size="sm" >
									<Info  color={ "#56616B"} />
								</Icon>
								
							</HStack>
							<Heading fontSize={'28px'} fontWeight={700} color={'black'}>USD {data?.ledger_balance.toFixed(2) || 0.00}</Heading>
						</VStack>
						<VStack align={'flex-start'} >
							<HStack justifyContent={'space-between'} w={'271px'}>
								<Text fontWeight={500} fontSize={'14px'} color={'gray.400'}>Total Payout</Text>
								
								<Icon size="sm">
									<Info color={ "#56616B"} />
								</Icon>
								
							</HStack>
							<Heading fontSize={'28px'} fontWeight={700} color={'black'}>USD {data?.total_payout.toFixed(2) || 0.00}</Heading>
						</VStack>
						<VStack align={'flex-start'} >
							<HStack justifyContent={'space-between'} w={'271px'}>
								<Text fontWeight={500} fontSize={'14px'} color={'gray.400'}>Total Revenue</Text>
								
								<Icon size="sm" >
									<Info  color={ "#56616B"} />
								</Icon>
								
							</HStack>
							<Heading fontSize={'28px'} fontWeight={700} color={'black'}>USD {data?.total_revenue.toFixed(2) || 0.00}</Heading>
						</VStack>
						<VStack align={'flex-start'} >
							<HStack justifyContent={'space-between'} w={'271px'}>
								<Text fontWeight={500} fontSize={'14px'} color={'gray.400'}>Pending Payout</Text>
								
								<Icon size="sm" >
									<Info  color={ "#56616B"} />
								</Icon>
								
							</HStack>
							<Heading fontSize={'28px'} fontWeight={700} color={'black'}>USD {data?.pending_payout.toFixed(2) || 0.00}</Heading>
						</VStack>
				
			</VStack>
		</Flex>
		<TransactionTable/>
		<FloatingMenu />
    </DashboardLayout>
  )
}

export default App
