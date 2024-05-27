import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Tooltip } from "@chakra-ui/react"
import { useState } from "react"

interface Props {
    isOpen: boolean;
    onClose: () => void;
    dentalData: any;
    dentistData: any;
    locationData: any;
}

export const today = new Date().toISOString().split('T')[0];

const AppointmentModal = ({ isOpen, onClose, dentalData, dentistData, locationData }: Props) => {
    const [fullname, setFullname] = useState<string>('');
    const [age, setAge] = useState<number | string>('');
    const [phone, setPhone] = useState<number | string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [dentist, setDentist] = useState<string>('');
    const [isPersonal, setIsPersonal] = useState<boolean>(true);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Make Appointment</ModalHeader>
                <ModalCloseButton borderRadius={'full'} />
                <ModalBody maxH={'xl'} overflowY={'auto'} mx={5}>
                    <Stack gap={2}>
                        <Box maxW={'24px'}>
                            <Checkbox
                                defaultChecked
                                ml={1}
                                onChange={() => setIsPersonal(!isPersonal)}
                            >
                                Personal
                            </Checkbox>
                        </Box>
                        <HStack>
                            <FormControl id="fullname" flex={2.5}>
                                <FormLabel ml={1}>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    value={isPersonal ? 'fullname' : fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    readOnly={isPersonal}
                                    placeholder={'Enter full name'}
                                />
                            </FormControl>
                            <FormControl id="age" flex={0.6}>
                                <FormLabel ml={1}>Age</FormLabel>
                                <Input
                                    type="number"
                                    value={isPersonal ? 10 : age}
                                    onChange={(e) => setAge(e.target.value)}
                                    readOnly={isPersonal}
                                    textAlign={'center'}
                                />
                            </FormControl>
                            <FormControl id="gender" flex={1.5}>
                                <FormLabel ml={1}>Gender</FormLabel>
                                {isPersonal ? (
                                    <Input value={'Male'} readOnly />
                                ) : (
                                    <Select
                                        name="gender"
                                        onChange={(e) => setGender(e.target.value)}
                                        placeholder={'Select gender'}
                                    >
                                        <option value="1">
                                            Male
                                        </option>
                                        <option value="2">
                                            Female
                                        </option>
                                    </Select>
                                )}

                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl id="email" flex={2}>
                                <FormLabel ml={1}>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={isPersonal ? 'email' : email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly={isPersonal}
                                    placeholder="Enter email"
                                />
                            </FormControl>
                            <FormControl id="phone" flex={1.2}>
                                <FormLabel ml={1} pl={1}>Phone number</FormLabel>
                                <Input
                                    type="tel"
                                    value={isPersonal ? '0912345678' : phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    readOnly={isPersonal}
                                    placeholder="Enter phone number"
                                />
                            </FormControl>
                        </HStack>
                        <FormControl id="address" flex={2}>
                            <FormLabel ml={1}>Address</FormLabel>
                            <Input
                                type="text"
                                value={isPersonal ? 'address' : address}
                                onChange={(e) => setAddress(e.target.value)}
                                readOnly={isPersonal}
                                placeholder="Enter Address"
                            />
                        </FormControl>
                        <HStack>
                            <FormControl id="dental" flex={1.5}>
                                <FormLabel ml={1}>Dental</FormLabel>
                                <Input
                                    type="text"
                                    value={dentalData.name}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="date" flex={1}>
                                <FormLabel ml={1}>Date</FormLabel>
                                <Input type="date" min={today} />
                            </FormControl>
                        </HStack>
                        <FormControl id="location">
                            <FormLabel ml={1}>Location</FormLabel>
                            {locationData === '' ? (
                                <Select
                                    name="location"
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder={'Select location'}
                                >
                                    <option value="1">
                                        HCM
                                    </option>
                                    <option value="2">
                                        HN
                                    </option>
                                </Select>
                            ) : (
                                <Input value={locationData.name} readOnly />
                            )}
                        </FormControl>
                        <HStack>
                            <FormControl id="dentist">
                                <FormLabel ml={1}>Dentist</FormLabel>
                                {(location === '' && locationData === '') ? (
                                    <Tooltip label={'You must select location to choose'}>
                                        <Select
                                            name="dentist"
                                            onChange={(e) => setDentist(e.target.value)}
                                            placeholder={'Select dentist'}
                                            disabled
                                        >
                                            <option value="1">
                                                Dentist 1
                                            </option>
                                            <option value="2">
                                                Dentist 2
                                            </option>
                                        </Select>
                                    </Tooltip>
                                ) : (
                                    <>
                                        {dentistData === '' ? (
                                            <Select
                                                name="dentist"
                                                placeholder={'Select dentist'}
                                                isReadOnly={dentistData !== '' ? true : false}
                                            >
                                                <option value="1">
                                                    Dentist 1
                                                </option>
                                                <option value="2">
                                                    Dentist 2
                                                </option>
                                            </Select>
                                        ) : (
                                            <Input value={dentistData.name} readOnly />
                                        )}
                                    </>
                                )}
                            </FormControl>
                            <FormControl id="time">
                                <FormLabel ml={1}>Time</FormLabel>
                                <Select
                                    name="time"
                                    placeholder={'Select time'}
                                >
                                    <option value="1" style={{ padding: '10px' }}>
                                        Morning
                                    </option>
                                    <option value="2">
                                        Afternoon
                                    </option>
                                </Select>
                            </FormControl>
                        </HStack>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                    <Button colorScheme="blue" variant='outline'>Continue</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default AppointmentModal