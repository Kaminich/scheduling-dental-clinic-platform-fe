import { Button, Card, CardBody, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Tag, TagLabel, Text, useDisclosure } from "@chakra-ui/react";
import { FaCheck, FaEye, FaSliders, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Shadow } from "../../../styles/styles";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import usePendingClinics from "../../../hooks/usePendingClinics";
import Loading from "../../../components/loading";
import DentalApproveModal from "../../../components/modal/dental_approve";
import DentalDetailModal from "../../../components/modal/dental_detail";
import PendingClinicListResponse from "../../../types/PendingClinicListResponse";

const ApproveDentalClinicPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [id, setId] = useState<number>(0);

    const [clinics, setClinics] = useState<PendingClinicListResponse[]>([]);
    const { data, isLoading } = usePendingClinics();
    const { isOpen: isOpenApprove, onClose: onCloseApprove, onOpen: onOpenApprove } = useDisclosure();
    const { isOpen: isOpenDetail, onClose: onCloseDetail, onOpen: onOpenDetail } = useDisclosure();

    useEffect(() => {
        changeTabTitle('Approve Dental Clinic');
    }, []);

    useEffect(() => {
        if (data?.content) {
            setClinics(data?.content);
        }
    }, [data?.content]);

    console.log(clinics);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={5}>
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
            <HStack justify={'flex-end'} w={'full'}>
                <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
            </HStack>
            {!isLoading ? (
                <>
                    {clinics ? (
                        <>
                            {clinics.map((clinic) => (
                                <Stack gap={6} w={'full'}>
                                    <Card shadow={Shadow.cardShadow}>
                                        <CardBody pl={8}>
                                            <HStack justify={'space-between'} align={'center'}>
                                                <Stack gap={5} flex={3.7}>
                                                    <HStack justify={'space-between'} minW={'full'} pr={5}>
                                                        <HStack>
                                                            <Text>Dental Clinic ID:</Text>
                                                            <Text>{clinic.clinicId}</Text>
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
                                                            <Text>{clinic.clinicName}</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Text>Clinic Owner: </Text>
                                                            <Text>{clinic.ownerName}</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Text>Dental Clinic Detail:</Text>
                                                            <Button
                                                                px={2}
                                                                borderRadius={'full'}
                                                                onClick={() => {
                                                                    setId(clinic.clinicId)
                                                                    onOpenDetail();
                                                                }}
                                                            >
                                                                <FaEye />
                                                            </Button>
                                                        </HStack>
                                                    </Stack>
                                                </Stack>
                                                <HStack gap={8} h={'135px'} flex={1}>
                                                    <Divider orientation='vertical' borderColor={'grey'} p={0} />
                                                    <Stack gap={4} align={'center'} m={'auto'} pb={3}>
                                                        <Text>Approve or Denied</Text>
                                                        <HStack gap={4}>
                                                            <Button
                                                                colorScheme="green"
                                                                variant={'outline'}
                                                                onClick={() => {
                                                                    setType('approve');
                                                                    setId(clinic.clinicId)
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
                                                                    setId(clinic.clinicId);
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
                            ))}
                            <DentalApproveModal
                                isOpen={isOpenApprove}
                                onClose={onCloseApprove}
                                id={id}
                                type={type}
                            />
                            <DentalDetailModal
                                isOpen={isOpenDetail}
                                onClose={onCloseDetail}
                                id={id}
                            />
                        </>
                    ) : (
                        <>No pending clinic</>
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

export default ApproveDentalClinicPage