import { Button, Card, CardBody, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Tag, TagLabel, Text, useDisclosure } from "@chakra-ui/react";
import { FaCheck, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Shadow } from "../../../styles/styles";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import usePendingDentists from "../../../hooks/usePendingDentists";
import Dentist from "../../../types/Dentist";
import Loading from "../../../components/loading";
import DentistApproveModal from "../../../components/modal/dentist_approve";
import DentistDetailModal from "../../../components/modal/dentist_detail";

const ApproveDentistPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [dentists, setDentists] = useState<Dentist[]>([]);
    const [type, setType] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const { data, isLoading } = usePendingDentists();
    const { isOpen: isOpenApprove, onClose: onCloseApprove, onOpen: onOpenApprove } = useDisclosure();
    const { isOpen: isOpenDetail, onClose: onCloseDetail, onOpen: onOpenDetail } = useDisclosure();

    useEffect(() => {
        changeTabTitle('Approve Dentist');
    }, []);

    useEffect(() => {
        if (data) {
            setDentists(data.content);
        }
    }, [data]);

    console.log(dentists);


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
            {!isLoading ? (
                <>
                    {dentists ? (
                        <>
                            <Stack gap={6} w={'full'} >
                                <Card shadow={Shadow.cardShadow}>
                                    <CardBody pl={8}>
                                        <HStack justify={'space-between'} align={'center'}>
                                            <Stack gap={5} flex={3.7}>
                                                <HStack justify={'space-between'} minW={'full'} pr={5}>
                                                    <HStack>
                                                        <Text>Clinic Dentist ID:</Text>
                                                        <Text>{'clinic.clinicId'}</Text>
                                                    </HStack>
                                                    <HStack gap={4}>
                                                        <Text>Status:</Text>
                                                        <Tag size={'md'} variant='subtle' colorScheme='yellow'>
                                                            <TagLabel>PENDING</TagLabel>
                                                        </Tag>
                                                    </HStack>
                                                </HStack>
                                                <Stack>
                                                    <HStack>
                                                        <Text>Dental Clinic: </Text>
                                                        <Text>{'clinic.clinicName'}</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text>Branch: </Text>
                                                        <Text>{'clinic.ownerName'}</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text>Dentist Detail:</Text>
                                                        <Text
                                                            cursor={'pointer'}
                                                            onClick={() => {
                                                                setId(0)
                                                                onOpenDetail();
                                                            }}
                                                        >
                                                            Click here to see all detail
                                                        </Text>
                                                    </HStack>
                                                </Stack>
                                            </Stack>
                                            <HStack gap={8} h={'135px'} flex={1}>
                                                <Divider orientation='vertical' borderColor={'grey'} p={0} />
                                                <Stack gap={4} align={'center'} m={'auto'} pb={3}>
                                                    <Text>Approve or Decline</Text>
                                                    <HStack gap={4}>
                                                        <Button
                                                            colorScheme="green"
                                                            variant={'outline'}
                                                            onClick={() => {
                                                                setType('approve');
                                                                setId(0)
                                                                onOpenApprove();
                                                            }}
                                                        >
                                                            <FaCheck />
                                                        </Button>
                                                        <Button
                                                            colorScheme="red"
                                                            variant={'outline'}
                                                            onClick={() => {
                                                                setType('denied');
                                                                setId(0);
                                                                onOpenApprove();
                                                            }}
                                                        >
                                                            <FaX />
                                                        </Button>
                                                    </HStack>
                                                </Stack>
                                            </HStack>
                                        </HStack>
                                    </CardBody>
                                </Card>
                            </Stack>
                            <DentistApproveModal
                                isOpen={isOpenApprove}
                                onClose={onCloseApprove}
                                id={id}
                                type={type}
                            />
                            <DentistDetailModal
                                isOpen={isOpenDetail}
                                onClose={onCloseDetail}
                                id={id}
                            />
                        </>
                    ) : (
                        <>No pending dentist</>
                    )}
                </>
            ) : (
                <Stack minH={'calc(100vh - 216px - 2.5rem)'}>
                    <Loading />
                </Stack>
            )}
        </Stack>
    )
}

export default ApproveDentistPage