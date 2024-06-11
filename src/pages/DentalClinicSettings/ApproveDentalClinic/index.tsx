import { Button, Card, CardBody, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { FaCheck, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Shadow } from "../../../styles/styles";
import { changeTitle } from "../../../utils/changeTabTitle";

const ApproveDentalClinicPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        changeTitle('Approve Dental Clinic');
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
            <Stack gap={6} w={'full'} >
                <Card shadow={Shadow.cardShadow}>
                    <CardBody pl={8} pr={16}>
                        <HStack justify={'space-between'} align={'center'}>
                            <Stack gap={5}>
                                <Text>Dental Clinic ID: </Text>
                                <Stack>
                                    <Text>Dental Clinic: </Text>
                                    <Text>Clinic Owner: </Text>
                                    <Text>Dental Clinic Detail: </Text>
                                </Stack>
                            </Stack>
                            <HStack gap={20} h={'135px'}>
                                <Divider orientation='vertical' borderColor={'grey'} />
                                <Stack gap={4} align={'center'} mt={-4}>
                                    <Text>Accept or Decline</Text>
                                    <HStack gap={4}>
                                        <Button colorScheme="green" variant={'outline'}>
                                            <FaCheck />
                                        </Button>
                                        <Button colorScheme="red" variant={'outline'}>
                                            <FaX />
                                        </Button>
                                    </HStack>
                                </Stack>
                            </HStack>
                        </HStack>
                    </CardBody>
                </Card>
            </Stack>
        </Stack>
    )
}

export default ApproveDentalClinicPage