import  { useState } from "react";
import { Box, HStack, VStack, Text, Button, Portal } from "@chakra-ui/react";
import { Popover } from "@chakra-ui/react";
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterModal = ({ isOpen, onClose } : IFilterModalProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("2023-07-17"));
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023-08-17"));
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>([]);
  const [isTransactionTypePopoverOpen, setIsTransactionTypePopoverOpen] = useState(false);
  const [selectedTransactionStatuses, setSelectedTransactionStatuses] = useState<string[]>([]);
  const [isTransactionStatusPopoverOpen, setIsTransactionStatusPopoverOpen] = useState(false);

  const transactionTypes = [
    { label: "Store Transactions", value: "store" },
    { label: "Get Tipped", value: "tips" },
    { label: "Withdrawals", value: "withdrawals" },
    { label: "Chargebacks", value: "chargebacks" },
  ];

  const transactionStatuses = [
    { label: "Successful", value: "successful" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ];

  const handleTransactionTypeChange = (value: string) => {
    if (selectedTransactionTypes.includes(value)) {
      setSelectedTransactionTypes(selectedTransactionTypes.filter(type => type !== value));
    } else {
      setSelectedTransactionTypes([...selectedTransactionTypes, value]);
    }
  };

  const handleTransactionStatusChange = (value: string) => {
    if (selectedTransactionStatuses.includes(value)) {
      setSelectedTransactionStatuses(selectedTransactionStatuses.filter(status => status !== value));
    } else {
      setSelectedTransactionStatuses([...selectedTransactionStatuses, value]);
    }
  };

  const getSelectedTypeLabels = () => {
    if (selectedTransactionTypes.length === 0) {
      return "Select transaction types";
    }
    const labels = selectedTransactionTypes.map(value => 
      transactionTypes.find(type => type.value === value)?.label
    ).filter(Boolean);
    return labels.join(", ");
  };

  const getSelectedStatusLabels = () => {
    if (selectedTransactionStatuses.length === 0) {
      return "Select transaction statuses";
    }
    const labels = selectedTransactionStatuses.map(value => 
      transactionStatuses.find(status => status.value === value)?.label
    ).filter(Boolean);
    return labels.join(", ");
  };


  return (
    <Portal>
   
      	<Box
			position="fixed"
			top="0"
			left="0"
			right="0"
			bottom="0"
			bg="rgba(0, 0, 0, 0.5)"
			zIndex={999}
			onClick={onClose}
			opacity={isOpen ? 1 : 0}
			visibility={isOpen ? "visible" : "hidden"}
			transition="opacity 0.3s ease-in-out, visibility 0.3s ease-in-out"
		/>
      
  
      	<Box
			position="fixed"
			top="16px"
			right="16px"
			bottom="16px"
			width="500px"
			bg="white"
			borderRadius="16px"
			zIndex={1000}
			transform={isOpen ? "translateX(0)" : "translateX(calc(100% + 16px))"}
			transition="transform 0.3s ease-in-out"
			overflow="auto"
			boxShadow="0px 8px 32px rgba(0, 0, 0, 0.1)"
		>
        <VStack align="stretch" p="24px" gap="24px" height="100%">
          
          	<HStack justify="space-between" align="center">
				<Text fontSize="24px" fontWeight="600" color="black">Filter</Text>
				<Box
				cursor="pointer"
				onClick={onClose}
				p="4px"
				borderRadius="4px"
				_hover={{ bg: "gray.100" }}
				>
				<X size={24} color="black" />
				</Box>
			</HStack>

          
          <VStack align="stretch" gap="16px">
            <HStack gap="12px" flexWrap="wrap">
				<Button
					size="sm"
					variant="outline"
					borderRadius="20px"
					px="16px"
					py="8px"
					bg="white"
					border="1px solid #E2E8F0"
					color="black"
					fontSize="14px"
					fontWeight="500"
					_hover={{ bg: "gray.50" }}
				>
					Today
				</Button>
              	<Button
					size="sm"
					variant="outline"
					borderRadius="20px"
					px="16px"
					py="8px"
					bg="white"
					border="1px solid #E2E8F0"
					color="black"
					fontSize="14px"
					fontWeight="500"
					_hover={{ bg: "gray.50" }}
				>
					Last 7 days
				</Button>
              	<Button
					size="sm"
					variant="outline"
					borderRadius="20px"
					px="16px"
					py="8px"
					bg="white"
					border="1px solid #E2E8F0"
					color="black"
					fontSize="14px"
					fontWeight="500"
					_hover={{ bg: "gray.50" }}
				>
					This month
				</Button>
              	<Button
					size="sm"
					variant="outline"
					borderRadius="20px"
					px="16px"
					py="8px"
					bg="white"
					border="1px solid #E2E8F0"
					color="black"
					fontSize="14px"
					fontWeight="500"
					_hover={{ bg: "gray.50" }}
				>
					Last 3 months
				</Button>
            </HStack>
          </VStack>

         
			<VStack align="stretch" gap="12px">
				<Text fontSize="16px" fontWeight="600" color="black">Date Range</Text>
				<HStack gap="12px">
					<Box position="relative" flex="1">
						<DatePicker
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							dateFormat="dd MMM yyyy"
							calendarClassName="custom-calendar"
							popperPlacement="bottom-start"
							dayClassName={(date) => 
								date.getDate() === startDate?.getDate() && 
								date.getMonth() === startDate?.getMonth() && 
								date.getFullYear() === startDate?.getFullYear()
								? "selected-day" 
								: "regular-day"
							}
							renderCustomHeader={({
								date,
								decreaseMonth,
								increaseMonth,
								prevMonthButtonDisabled,
								nextMonthButtonDisabled,
							}) => (
								<Box display="flex" justifyContent="space-between" alignItems="center" p="16px" pb="8px">
									<Box
										cursor={prevMonthButtonDisabled ? "default" : "pointer"}
										opacity={prevMonthButtonDisabled ? 0.5 : 1}
										onClick={prevMonthButtonDisabled ? undefined : decreaseMonth}
									>
										<ChevronLeft size={20} color="#56616B" />
									</Box>
									<Text fontSize="16px" fontWeight="600" color="black">
										{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
									</Text>
									<Box
										cursor={nextMonthButtonDisabled ? "default" : "pointer"}
										opacity={nextMonthButtonDisabled ? 0.5 : 1}
										onClick={nextMonthButtonDisabled ? undefined : increaseMonth}
									>
										<ChevronRight size={20} color="#56616B" />
									</Box>
								</Box>
							)}
							customInput={
								<HStack
								bg="#F7F9FC"
								border="1px solid #E2E8F0"
								borderRadius="12px"
								fontSize="14px"
								color="black"
								p="12px"
								height="48px"
								minWidth="200px"
								width="100%"
								cursor="pointer"
								justifyContent="space-between"
								_focus={{ outline: "none" }}
								>
								<Text>{startDate?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) || "Select date"}</Text>
								<ChevronUp size={16} color="#56616B" />
								</HStack>
							}
						/>
					</Box>
					<Box position="relative" flex="1">
						<DatePicker
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							dateFormat="dd MMM yyyy"
							calendarClassName="custom-calendar"
							popperPlacement="bottom-end"
							dayClassName={(date) => 
								date.getDate() === endDate?.getDate() && 
								date.getMonth() === endDate?.getMonth() && 
								date.getFullYear() === endDate?.getFullYear()
								? "selected-day" 
								: "regular-day"
							}
							renderCustomHeader={({
								date,
								decreaseMonth,
								increaseMonth,
								prevMonthButtonDisabled,
								nextMonthButtonDisabled,
							}) => (
								<Box display="flex" justifyContent="space-between" alignItems="center" p="16px" pb="8px">
									<Box
										cursor={prevMonthButtonDisabled ? "default" : "pointer"}
										opacity={prevMonthButtonDisabled ? 0.5 : 1}
										onClick={prevMonthButtonDisabled ? undefined : decreaseMonth}
									>
										<ChevronLeft size={20} color="#56616B" />
									</Box>
									<Text fontSize="16px" fontWeight="600" color="black">
										{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
									</Text>
									<Box
										cursor={nextMonthButtonDisabled ? "default" : "pointer"}
										opacity={nextMonthButtonDisabled ? 0.5 : 1}
										onClick={nextMonthButtonDisabled ? undefined : increaseMonth}
									>
										<ChevronRight size={20} color="#56616B" />
									</Box>
								</Box>
							)}
							customInput={
								<HStack
									bg="#F7F9FC"
									border="none"
									borderRadius="12px"
									fontSize="14px"
									color="black"
									p="12px"
									height="48px"
									minWidth="200px"
									width="100%"
									cursor="pointer"
									justifyContent="space-between"
									_focus={{ outline: "none" }}
									>
									<Text>{endDate?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) || "Select date"}</Text>
									<ChevronDown size={16} color="#56616B" />
								</HStack>
							}
						/>
					</Box>
				</HStack>
			</VStack>

         
          	<VStack align="stretch" gap="12px">
				<Text fontSize="16px" fontWeight="600" color="black">Transaction Type</Text>
				<Popover.Root 
					open={isTransactionTypePopoverOpen} 
					onOpenChange={(e) => setIsTransactionTypePopoverOpen(e.open)}
					positioning={{ placement: "bottom-start" }}
				>
					<Popover.Trigger asChild>
						<Box
							bg="white"
							border="1px solid #E2E8F0"
							borderRadius="12px"
							fontSize="14px"
							color="black"
							p="12px"
							height="48px"
							cursor="pointer"
							display="flex"
							alignItems="center"
							justifyContent="space-between"
						>
							<Text fontSize="14px" color="black" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
								{getSelectedTypeLabels()}
							</Text>
							<ChevronDown size={16} color="#56616B" />
						</Box>
					</Popover.Trigger>
					<Popover.Positioner>
						<Popover.Content
							bg="white"
							border="1px solid #E2E8F0"
							borderRadius="12px"
							p="12px"
							boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
							maxW="400px"
						>
							<VStack align="stretch" gap="8px">
								{transactionTypes.map((type) => (
									<Box
										key={type.value}
										cursor="pointer"
										onClick={() => handleTransactionTypeChange(type.value)}
										p="8px"
										borderRadius="4px"
										_hover={{ bg: "gray.50" }}
									>
										<HStack gap="8px">
											<Box
												w="16px"
												h="16px"
												borderRadius="2px"
												border="1px solid"
												borderColor={selectedTransactionTypes.includes(type.value) ? "black" : "#E2E8F0"}
												bg={selectedTransactionTypes.includes(type.value) ? "black" : "white"}
												display="flex"
												alignItems="center"
												justifyContent="center"
											>
												{selectedTransactionTypes.includes(type.value) && (
													<Text color="white" fontSize="10px" fontWeight="bold">
														✓
													</Text>
												)}
											</Box>
											<Text fontSize="14px" color="black" fontWeight="500">
												{type.label}
											</Text>
										</HStack>
									</Box>
								))}
							</VStack>
						</Popover.Content>
					</Popover.Positioner>
				</Popover.Root>
			</VStack>

          
          <VStack align="stretch" gap="12px">
				<Text fontSize="16px" fontWeight="600" color="black">Transaction Status</Text>
				<Popover.Root 
					open={isTransactionStatusPopoverOpen} 
					onOpenChange={(e) => setIsTransactionStatusPopoverOpen(e.open)}
					positioning={{ placement: "bottom-start" }}
				>
					<Popover.Trigger asChild>
						<Box
							bg="white"
							border="1px solid #E2E8F0"
							borderRadius="12px"
							fontSize="14px"
							color="black"
							p="12px"
							height="48px"
							cursor="pointer"
							display="flex"
							alignItems="center"
							justifyContent="space-between"
						>
							<Text fontSize="14px" color="black" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
								{getSelectedStatusLabels()}
							</Text>
							<ChevronDown size={16} color="#56616B" />
						</Box>
					</Popover.Trigger>
					<Popover.Positioner>
						<Popover.Content
							bg="white"
							border="1px solid #E2E8F0"
							borderRadius="12px"
							p="12px"
							boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
							maxW="400px"
						>
							<VStack align="stretch" gap="8px">
								{transactionStatuses.map((status) => (
									<Box
										key={status.value}
										cursor="pointer"
										onClick={() => handleTransactionStatusChange(status.value)}
										p="8px"
										borderRadius="4px"
										_hover={{ bg: "gray.50" }}
									>
										<HStack gap="8px">
											<Box
												w="16px"
												h="16px"
												borderRadius="2px"
												border="1px solid"
												borderColor={selectedTransactionStatuses.includes(status.value) ? "black" : "#E2E8F0"}
												bg={selectedTransactionStatuses.includes(status.value) ? "black" : "white"}
												display="flex"
												alignItems="center"
												justifyContent="center"
											>
												{selectedTransactionStatuses.includes(status.value) && (
													<Text color="white" fontSize="10px" fontWeight="bold">
														✓
													</Text>
												)}
											</Box>
											<Text fontSize="14px" color="black" fontWeight="500">
												{status.label}
											</Text>
										</HStack>
									</Box>
								))}
							</VStack>
						</Popover.Content>
					</Popover.Positioner>
				</Popover.Root>
			</VStack>

     
			<Box mt="auto">
				<HStack gap="12px">
				<Button
					flex="1"
					variant="outline"
					bg="white"
					border="1px solid #E2E8F0"
					color="black"
					fontSize="16px"
					fontWeight="500"
					py="12px"
					borderRadius="12px"
					_hover={{ bg: "gray.50" }}
				>
					Clear
				</Button>
				<Button
					flex="1"
					bg="#131316"
					color="white"
					fontSize="16px"
					fontWeight="500"
					py="12px"
					borderRadius="12px"
					_hover={{ bg: "#2D2D30" }}
				>
					Apply
				</Button>
				</HStack>
			</Box>
        </VStack>
      </Box>
    </Portal>
  );
};