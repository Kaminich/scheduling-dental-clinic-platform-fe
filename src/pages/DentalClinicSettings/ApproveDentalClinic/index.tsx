import { Button, Card, CardBody, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FaCheck, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Shadow } from "../../../styles/styles";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import usePendingClinics from "../../../hooks/usePendingClinics";
import Loading from "../../../components/loading";
import Clinic from "../../../types/Clinic";
import DentalModal from "../../../components/modal/dental";

const ApproveDentalClinicPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [id, setId] = useState<number>(0);

    const [clinics, setClinics] = useState<Clinic[]>([]);
    const { data, isLoading } = usePendingClinics();
    const { isOpen, onClose, onOpen } = useDisclosure();

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
                                                            <Text>{clinic.status}</Text>
                                                        </HStack>
                                                    </HStack>
                                                    <Stack>
                                                        <HStack>
                                                            <Text>Dental Clinic: </Text>
                                                            <Text>{clinic.clinicName}</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Text>Clinic Owner: </Text>
                                                            <Text>{clinic.fullName}</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Text>Dental Clinic Detail:</Text>
                                                            <Text>Click here to see all detail</Text>
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
                                                                    setId(clinic.clinicId)
                                                                    onOpen();
                                                                }}
                                                            >
                                                                <FaCheck />
                                                            </Button>
                                                            <Button
                                                                colorScheme="red"
                                                                variant={'outline'}
                                                                onClick={() => {
                                                                    setType('decline');
                                                                    setId(clinic.clinicId);
                                                                    onOpen();
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
                            <DentalModal
                                isOpen={isOpen}
                                onClose={onClose}
                                id={id}
                                type={type}
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