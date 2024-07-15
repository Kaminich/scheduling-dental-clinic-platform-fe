import { Button, Card, Divider, HStack, Heading, Image, Link, Stack, Tag, TagLabel, Text } from "@chakra-ui/react"
import { Shadow } from "../../styles/styles"
import WorkingHours from "../DentalDetail/components/working_hours"
import DentalDetailBranch from "../DentalDetail/components/branch"
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { changeTabTitle } from "../../utils/changeTabTitle"
import { useNavigate, useParams } from "react-router"
import useUserProfile from "../../hooks/useUserProfile"
import useClinicDetail from "../../hooks/useClinicDetail"
import ClinicDetailResponse, { initialClinicDetailResponse } from "../../types/ClinicDetailResponse"
import useWorkingHoursByClinicId from "../../hooks/useWorkingHoursByClinicId"
import Loading from "../../components/loading"
import { FaPenToSquare } from "react-icons/fa6"
import { formatDate } from "../../utils/formatDate"
import { formatDateTime } from "../../utils/formatDateTime"

const DentalDetailSettingsPage = () => {
    const { role } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: userData } = useUserProfile();
    const { data: clinicData, isLoading } = useClinicDetail({ clinicId: userData?.clinicId || parseInt(id || '0') });
    const { data: clinicWHData } = useWorkingHoursByClinicId({ clinicId: userData?.clinicId || parseInt(id || '0') });
    const [clinic, setClinic] = useState<ClinicDetailResponse>(initialClinicDetailResponse);

    useEffect(() => {
        if (clinic.clinicName) {
            changeTabTitle(clinic.clinicName);
        }
    }, [clinic.clinicName]);

    useEffect(() => {
        if (clinicData) {
            setClinic(clinicData);
        }
    }, [clinicData]);

    console.log(clinicWHData);


    return (
        <>
            {!isLoading ? (
                <Stack>
                    {role === 'Owner' && (
                        <HStack justify={'flex-end'} m={6} mb={-6} gap={4}>
                            <Button colorScheme="blue" gap={2} onClick={() => navigate('update')}>
                                <FaPenToSquare /> Edit
                            </Button>
                        </HStack>
                    )}
                    <HStack align={'center'} mt={6}>
                        <Stack flex={1} align={'center'}>
                            <Image src={clinic.logo} />
                        </Stack>
                        <Stack flex={4}>
                            <Heading fontSize={28}>{clinic.clinicName}</Heading>
                            <HStack mt={4} ml={4} align={'flex-start'}>
                                <Stack flex={1}>
                                    {role === 'Admin' && (
                                        <Text>Owner: {clinic.ownerName}</Text>
                                    )}
                                    <Text>Phone Number: {clinic.phone}</Text>
                                    <Text>Email: {clinic.email}</Text>
                                    <Text>Address: {clinic.address}</Text>
                                    <Text>City: {clinic.city}</Text>
                                </Stack>
                                <Stack flex={1}>
                                    <HStack>
                                        <Text>Website Url:</Text>
                                        {clinic.websiteUrl ? (
                                            <Link href={clinic.websiteUrl} isExternal>{clinic.websiteUrl}</Link>
                                        ) : (
                                            <Text>-</Text>
                                        )}
                                    </HStack>
                                    <Text>Created Date: {formatDate(clinic.createdDate)}</Text>
                                    <Text>Modified Date: {formatDateTime(clinic.modifiedDate)}</Text>
                                    {clinic.status === 'ACTIVE' && (
                                        <HStack>
                                            <Text>Status:</Text>
                                            <Tag colorScheme="green">
                                                <TagLabel>ACTIVE</TagLabel>
                                            </Tag>
                                        </HStack>
                                    )}
                                    {clinic.status === 'INACTIVE' && (
                                        <HStack>
                                            <Text>Status:</Text>
                                            <Tag colorScheme="red">
                                                <TagLabel>INACTIVE</TagLabel>
                                            </Tag>
                                        </HStack>
                                    )}
                                    {clinic.status === 'PENDING' && (
                                        <HStack>
                                            <Text>Status:</Text>
                                            <Tag colorScheme="yellow">
                                                <TagLabel>PENDING</TagLabel>
                                            </Tag>
                                        </HStack>
                                    )}
                                    {clinic.status === 'APPROVED' && (
                                        <HStack>
                                            <Text>Status:</Text>
                                            <Tag colorScheme="cyan">
                                                <TagLabel>APPROVED</TagLabel>
                                            </Tag>
                                        </HStack>
                                    )}
                                </Stack>
                            </HStack>
                        </Stack>
                    </HStack>
                    <Divider my={8} borderColor={'grey'} />
                    <Stack maxW={'90%'} m={'auto'}>
                        <Stack flex={2} gap={8}>
                            <Stack>
                                <Text
                                    maxW={'sm'}
                                    fontSize={20}
                                    pl={4}
                                    py={1}
                                    mb={4}
                                    fontWeight={500}
                                    borderRadius={'full'}
                                >
                                    About
                                </Text>
                                <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
                                    <Text>
                                        {clinic.description}
                                    </Text>
                                </Card>
                            </Stack>
                            <Stack>
                                <Text
                                    maxW={'sm'}
                                    fontSize={20}
                                    pl={4}
                                    py={1}
                                    mb={4}
                                    fontWeight={500}
                                    borderRadius={'full'}
                                >
                                    Working Hours
                                </Text>
                                <WorkingHours clinicId={clinic.id} />
                            </Stack>
                            <Stack>
                                <Text
                                    maxW={'sm'}
                                    fontSize={20}
                                    pl={4}
                                    py={1}
                                    mb={4}
                                    fontWeight={500}
                                    borderRadius={'full'}
                                >
                                    Branch
                                </Text>
                                <DentalDetailBranch clinicId={userData?.clinicId || parseInt(id || '0')} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default DentalDetailSettingsPage