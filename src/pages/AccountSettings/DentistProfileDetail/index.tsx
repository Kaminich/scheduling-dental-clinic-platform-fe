import { Button, FormControl, FormLabel, HStack, Heading, Image, Input, Select, Stack, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { today } from "../../../components/modal/appointment";

const DentistProfileDetailPage = () => {
    const [fullName, setFullName] = useState<string>('');
    const [dob, setDob] = useState<Date | string>('');
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string | number>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [specialty, setSpecialty] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [avatarData, setAvatarData] = useState<File | null>(null);
    const [branchId, setBranchId] = useState<number>(0);

    const navigate = useNavigate();

    const handleReset = () => {
        setFullName('');
        setDob('');
        setGender('');
        setPhone('');
        setEmail('');
        setAddress('');
        setDescription('');
        setSpecialty('');
        setExperience('');
        setAvatar('');
        setAvatarData(null);
        setBranchId(0);
    }

    useEffect(() => {
        changeTabTitle('Create Dentist');
        handleReset();
    }, []);

    return (
        <Stack w={'6xl'} m={'auto'}>
            <HStack pos={'fixed'} right={20} mt={-4}>
                <Button colorScheme="blue" onClick={() => navigate('update')}>Edit</Button>
            </HStack>
            <HStack gap={20} align={'flex-start'}>
                <Stack gap={3} flex={1}>
                    <Heading fontSize={24} fontWeight={600} mb={4}>Personal Information</Heading>
                    <HStack w={'full'} justify={'center'} align={'flex-end'}>
                        <Image
                            border='1px solid gainsboro'
                            borderRadius='full'
                            boxSize={'9rem'}
                            src={
                                avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                            }
                            alt='avatar'
                            bgColor='white'
                        />
                    </HStack>
                    <HStack>
                        <FormControl id="fullName" flex={2} isRequired>
                            <FormLabel pl={1}>Full Name</FormLabel>
                            <Input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter full name"
                                required
                            />
                        </FormControl>
                        <FormControl id="gender" flex={1} isRequired>
                            <FormLabel pl={1}>Gender</FormLabel>
                            <Select
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                placeholder={'Select gender'}
                            >
                                <option value="Male">
                                    Male
                                </option>
                                <option value="Female">
                                    Female
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl id="dob" flex={1} isRequired>
                            <FormLabel pl={1}>Date of Birth</FormLabel>
                            <Input
                                type="date"
                                max={today}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl id="phone" flex={1.5} isRequired>
                            <FormLabel pl={1}>Phone Number</FormLabel>
                            <Input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                                required
                            />
                        </FormControl>
                    </HStack>
                    <FormControl id="email" flex={1.7} isRequired>
                        <FormLabel pl={1}>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </FormControl>
                    <FormControl id="address" flex={2} isRequired>
                        <FormLabel pl={1}>Address</FormLabel>
                        <Input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                            required
                        />
                    </FormControl>
                </Stack>
                <Stack gap={3} flex={1}>
                    <Heading fontSize={24} fontWeight={600}>Medical Information</Heading>
                    <FormControl id="description" isRequired>
                        <FormLabel pl={1}>Description</FormLabel>
                        <Textarea
                            value={description}
                            placeholder="Describe dentist description"
                            focusBorderColor='#E2E8F0'
                            resize={'none'}
                            maxH={32}
                            minH={32}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="branch" isRequired>
                        <FormLabel pl={1}>Branch</FormLabel>
                        <Select
                            name="branch"
                            value={gender}
                            onChange={(e) => setBranchId(parseInt(e.target.value))}
                            placeholder={'Select branch'}
                        >
                            <option value="Male">
                                Male
                            </option>
                            <option value="Female">
                                Female
                            </option>
                            <option value="Other">
                                Other
                            </option>
                        </Select>
                    </FormControl>
                    <FormControl id="specialty" isRequired>
                        <FormLabel pl={1}>Specialty</FormLabel>
                        <Select
                            name="specialty"
                            value={gender}
                            onChange={(e) => setSpecialty(e.target.value)}
                            placeholder={'Select specialty'}
                        >
                            <option value="Male">
                                Male
                            </option>
                            <option value="Female">
                                Female
                            </option>
                            <option value="Other">
                                Other
                            </option>
                        </Select>
                    </FormControl>
                    <FormControl id="experience" isRequired>
                        <FormLabel pl={1}>Experience</FormLabel>
                        <Textarea
                            value={experience}
                            placeholder="Describe dentist experience"
                            focusBorderColor='#E2E8F0'
                            resize={'none'}
                            maxH={32}
                            minH={32}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </FormControl>
                </Stack>
            </HStack>
        </Stack>
    )
}

export default DentistProfileDetailPage