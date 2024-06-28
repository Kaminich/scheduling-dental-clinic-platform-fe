import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { FaCheck, FaEye, FaSliders, FaTrashCan, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { RiRotateLockFill } from "react-icons/ri";
import Loading from "../../components/loading";
import { Color, Shadow } from "../../styles/styles";

const FeedbackSettingPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');

    // let filteredClinics = clinics.filter((clinic) => {
    //     return clinic.username.toLowerCase().includes(keyword.toLowerCase())
    // })

    useEffect(() => {
        changeTabTitle('Feedback Settings');
    }, []);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search dental..."
                    variant="filled"
                    border='1px solid gainsboro'
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    value={keyword}
                />
            </InputGroup>
            <Stack w={'full'}>
                <Card shadow={Shadow.cardShadow} bg={Color.blue_100}>
                    <CardHeader py={3}>
                        <HStack w={'full'} justify={'flex-end'} gap={5}>
                            <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th textAlign='center' borderColor={'gainsboro'}>ID</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Clinic Name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Owner</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'} minW={120}>Approve or Denied</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* {!isLoading ? ( */}
                                <>
                                    {/* {clinics ? ( */}
                                    <>
                                        {/* {filteredClinics.map((clinic) => ( */}
                                        <Tr _hover={{ bg: 'gray.100' }}>
                                            <Td textAlign="center" borderColor={'gainsboro'}>{'clinic.clinicId'}</Td>
                                            <Td textAlign="center" borderColor={'gainsboro'}>{'clinic.clinicName'}</Td>
                                            <Td textAlign='center' borderColor={'gainsboro'}>{'clinic.ownerName clinic.ownerName clinic.ownerName'}</Td>
                                            <Td textAlign='center' borderColor={'gainsboro'}>
                                                {/* <Tag size={'md'} variant='subtle' colorScheme='yellow'>
                                                                <TagLabel>PENDING</TagLabel>
                                                            </Tag> */}
                                            </Td>
                                            <Td
                                                p={1}
                                                textAlign='center'
                                                gap={4}
                                                borderColor={'gainsboro'}
                                            >
                                                <Button
                                                    borderRadius='full'
                                                    px={3}
                                                    colorScheme="blue"
                                                    variant='ghost'

                                                >
                                                    <Tooltip label='Show user information'>
                                                        <span>
                                                            <FaEye />
                                                        </span>
                                                    </Tooltip>
                                                </Button>
                                            </Td>
                                            <Td
                                                p={1}
                                                textAlign='center'
                                                gap={4}
                                                borderColor={'gainsboro'}
                                            >
                                                <Button
                                                    borderRadius='full'
                                                    px={3}
                                                    colorScheme="green"
                                                    variant='ghost'

                                                >
                                                    <Tooltip label='Approve'>
                                                        <span>
                                                            <FaCheck />
                                                        </span>
                                                    </Tooltip>
                                                </Button>
                                                <Button
                                                    borderRadius='full'
                                                    px={3}
                                                    colorScheme="red"
                                                    variant='ghost'

                                                >
                                                    <Tooltip label='Denied'>
                                                        <span>
                                                            <FaX />
                                                        </span>
                                                    </Tooltip>
                                                </Button>
                                            </Td>
                                        </Tr>
                                        {/* ))} */}
                                    </>
                                    {/* ) : (
                                            <>No pending clinic</>
                                        )} */}
                                </>
                                {/* ) : ( */}
                                {/* <Tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td><Loading /></Td>
                                    <Td></Td>
                                </Tr> */}
                                {/* )} */}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Stack>
        </Stack>
    )
}

export default FeedbackSettingPage;