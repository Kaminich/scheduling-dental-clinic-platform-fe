import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FaChevronRight, FaSliders } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { Color, Shadow } from "../../../styles/styles";
import useAllClinics from "../../../hooks/useAllClinics";
import ClinicListResponse from "../../../types/ClinicListResponse";
import Loading from "../../../components/loading";
import { Status } from "../../../types/type.enum";

const ManageDentalClinicPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [clinics, setClinics] = useState<ClinicListResponse[]>([]);
    const { data, isLoading } = useAllClinics();
    const navigate = useNavigate();

    let filteredClinics = clinics.filter((clinic) => {
        return clinic.clinicName.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        changeTabTitle('Manage Dental Clinic');
    }, []);

    useEffect(() => {
        if (data?.content) {
            setClinics(data.content);
        }
    }, [data?.content]);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search clinic name..."
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Clinic name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Owner</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Create Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Modified Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredClinics.length !== 0 ? (
                                            <>
                                                {filteredClinics.map((clinic) => (
                                                    <Tr _hover={{ bg: 'gray.100' }}>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{clinic.clinicId}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{clinic.clinicName}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{clinic.ownerName}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{clinic.createdDate}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{clinic.modifiedDate}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>
                                                            {clinic.status === Status.ACTIVE && (
                                                                <Tag colorScheme="green">
                                                                    <TagLabel>
                                                                        {clinic.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {clinic.status === Status.INACTIVE && (
                                                                <Tag colorScheme="red">
                                                                    <TagLabel>
                                                                        {clinic.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {clinic.status === Status.PENDING && (
                                                                <Tag colorScheme="yellow">
                                                                    <TagLabel>
                                                                        {clinic.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {clinic.status === Status.APPROVED && (
                                                                <Tag colorScheme="cyan">
                                                                    <TagLabel>
                                                                        {clinic.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                            cursor={'pointer'}
                                                            onClick={() => navigate(clinic.clinicId.toString())}
                                                        >
                                                            <FaChevronRight />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={6} textAlign="center">
                                                    No clinic
                                                </Td>
                                            </Tr>
                                        )}
                                    </>
                                ) : (
                                    <Tr>
                                        <Td colSpan={6} textAlign="center">
                                            <Loading />
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Stack>
        </Stack>
    )
}

export default ManageDentalClinicPage;