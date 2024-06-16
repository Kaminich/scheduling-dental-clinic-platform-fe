import { Button, Card, CardBody, Divider, FormControl, FormLabel, HStack, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Color, Shadow } from "../../styles/styles";
import { changeTabTitle } from "../../utils/changeTabTitle";

const PartnerRegisterPage = () => {
    const [dentalName, setDentalName] = useState<string>('');
    const [ownerName, setOwnerName] = useState<string>('');
    const [phone, setPhone] = useState<number | string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
        changeTabTitle('Partner Registration');
    }, []);

    return (
        <>
            <Stack
                bgImage={
                    'https://static.vecteezy.com/system/resources/thumbnails/007/023/598/small_2x/oral-care-horizontal-dental-banner-items-for-daily-oral-hygiene-mouthwash-and-toothbrush-with-paste-apple-chewing-gum-white-healthy-teeth-isolated-flat-icons-on-a-blue-background-vector.jpg'
                }
                h={'70vh'}
                bgRepeat={'no-repeat'}
                bgPos={'right'}
                bgSize={'contain'}
                bgColor={'#1fa4ab'}
                align={'flex-start'}
                justify={'center'}
            >
                <Stack maxW={'3xl'} mx={20}>
                    <Heading fontSize={32}>Become a partner of F-Dental</Heading>
                    <Divider my={4} />
                    <Text fontSize={24}>Description</Text>
                </Stack>
            </Stack>
            <HStack w={'6xl'} m={'auto'} my={8} align={'flex-start'} justify={'space-between'}>
                <Stack maxW={'3xl'} mt={5}>
                    <Heading fontSize={32}>Become a partner of F-Dental</Heading>
                    <Text fontSize={24}>Please fill this form</Text>
                    <Text fontSize={72}>{'->'}</Text>
                </Stack>
                <Card maxW={'lg'} shadow={Shadow.cardShadow}>
                    <CardBody py={12}>
                        <Stack gap={6}>
                            <Heading
                                fontSize={"2xl"}
                                textAlign={'center'}
                                color={Color.greenBlue}
                                mb={2}
                                mt={-4}
                            >
                                Partner Registration
                            </Heading>
                            <FormControl id="dental-name" flex={2} isRequired>
                                <FormLabel pl={1}>Dental Name</FormLabel>
                                <Input
                                    type="text"
                                    value={dentalName}
                                    onChange={(e) => setDentalName(e.target.value)}
                                    placeholder="Dental Name"
                                    required
                                />
                            </FormControl>
                            <HStack>
                                <FormControl id="owner-name" flex={2} isRequired>
                                    <FormLabel pl={1}>Owner Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={ownerName}
                                        onChange={(e) => setOwnerName(e.target.value)}
                                        placeholder="Owner Name"
                                        required
                                    />
                                </FormControl>
                                <FormControl id="phone" flex={1} isRequired>
                                    <FormLabel pl={1}>Phone number</FormLabel>
                                    <Input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone Number"
                                        required
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel pl={1}>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Dental Email"
                                    required
                                />
                            </FormControl>
                            <FormControl id="address" isRequired>
                                <FormLabel pl={1}>Address</FormLabel>
                                <Input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Dental Address"
                                    required
                                />
                            </FormControl>
                            <Button
                                bg={Color.greenBlue}
                                color={'white'}
                                _hover={{ bg: Color.hoverGreenBlue }}
                            >
                                Send information
                            </Button>
                        </Stack>
                    </CardBody>
                </Card>
            </HStack>
        </>
    )
}

export default PartnerRegisterPage