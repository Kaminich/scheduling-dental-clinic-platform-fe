import { Button, FormControl, FormLabel, HStack, Image, Input, Select, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { today } from "../../../components/modal/appointment";
import { FaPen } from "react-icons/fa6";

const StaffProfileDetailPage = () => {
    const [fullName, setFullName] = useState<string>('');
    const [dob, setDob] = useState<Date | string>('');
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [clinicBranchId, setClinicBranchId] = useState<number>(0);
    const [avatar, setAvatar] = useState<string>('');
    const [avatarData, setAvatarData] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleReset = () => {
        setFullName('');
        setGender('');
        setDob('');
        setPhone('');
        setEmail('');
        setAddress('');
        setClinicBranchId(0);
        setAvatar('');
        setAvatarData(null);
    }

    useEffect(() => {
        changeTabTitle('Create Staff');
        handleReset();
    }, []);

    return (
        <Stack w={'2xl'} m={'auto'}>
            <HStack pos={'fixed'} right={20} mt={-4}>
                <Button colorScheme="blue" onClick={() => navigate('update')}>Edit</Button>
            </HStack>
            <Stack gap={2} minW={'lg'}>
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
                <FormControl id="branch" flex={1} isRequired>
                    <FormLabel pl={1}>Branch</FormLabel>
                    <Select
                        name="branch"
                        value={gender}
                        onChange={(e) => setClinicBranchId(parseInt(e.target.value))}
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
            </Stack>
        </Stack>
    )
}

export default StaffProfileDetailPage