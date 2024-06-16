import { Card, CardBody, FormControl, FormLabel, HStack, Input, Stack, Text } from "@chakra-ui/react"
import { Shadow } from "../../styles/styles"
import { useEffect } from "react";
import { today } from "../../components/modal/appointment";
import { changeTabTitle } from "../../utils/changeTabTitle";

const MedicalRecordPage = () => {

    useEffect(() => {
        changeTabTitle('Medical Record');
    }, []);
    return (
        <Stack maxW={'7xl'} mx={'auto'} my={10}>
            <Card shadow={Shadow.cardShadow} w={'xl'}>
                <CardBody shadow={Shadow.cardShadow} py={7} px={8}>
                    <Stack gap={5}>
                        <Text>Appointment ID: </Text>
                        <FormControl id="fullname" flex={2.5}>
                            <FormLabel ml={1}>Full Name</FormLabel>
                            <Input value={'fullname'} />
                        </FormControl>
                        <HStack>
                            <FormControl id="gender" flex={1}>
                                <FormLabel ml={1}>Gender</FormLabel>
                                <Input value={'Male'} />
                            </FormControl>
                            <FormControl id="age" flex={0.6}>
                                <FormLabel ml={1}>Age</FormLabel>
                                <Input value={10} />
                            </FormControl>
                            {/* <FormControl id="phone" flex={1.5}>
                        <FormLabel ml={1} pl={1}>Phone number</FormLabel>
                        <Input
                            type="tel"
                            value={isPersonal ? '0912345678' : phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            readOnly={isPersonal}
                            placeholder="Enter phone number"
                        />
                    </FormControl> */}
                        </HStack>
                        {/* <FormControl id="email" flex={2}>
                    <FormLabel ml={1}>Email</FormLabel>
                    <Input
                        type="email"
                        value={isPersonal ? 'email' : email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={isPersonal}
                        placeholder="Enter email"
                    />
                </FormControl> */}
                        <FormControl id="address" flex={2}>
                            {/* <FormLabel ml={1}>Address</FormLabel>
                    <Input
                        type="text"
                        value={isPersonal ? 'address' : address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly={isPersonal}
                        placeholder="Enter Address"
                    /> */}
                        </FormControl>
                        <FormControl id="dental" flex={1.5}>
                            <FormLabel ml={1}>Dental</FormLabel>
                            <Input
                                type="text"
                                value={'dentalData.name'}
                                readOnly
                            />
                        </FormControl>
                        <FormControl id="location" flex={2}>
                            <FormLabel ml={1}>Location</FormLabel>
                            <Input value={'locationData.name'} readOnly />
                        </FormControl>
                        <HStack>
                            <FormControl id="date" flex={1}>
                                <FormLabel ml={1}>Date</FormLabel>
                                <Input type="date" value={today} />
                            </FormControl>
                            <FormControl id="time" flex={2.5}>
                                <FormLabel ml={1}>Time</FormLabel>
                                <Input value={'locationData.name'} readOnly />
                            </FormControl>
                        </HStack>
                        <FormControl id="dentist">
                            <FormLabel ml={1}>Dentist</FormLabel>
                            <Input value={'dentistData.name'} readOnly />
                        </FormControl>
                    </Stack>
                </CardBody>
            </Card>
        </Stack>
    )
}

export default MedicalRecordPage