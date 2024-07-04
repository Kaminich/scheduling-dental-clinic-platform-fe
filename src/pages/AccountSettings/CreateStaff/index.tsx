import { Button, FormControl, FormLabel, HStack, Image, Input, Select, Stack, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { today } from "../../../components/modal/appointment";
import axios from "axios";
import { FaPen } from "react-icons/fa6";
import { Border } from "../../../styles/styles";
import useUserProfile from "../../../hooks/useUserProfile";

const CreateStaffPage = () => {
    const [fullName, setFullName] = useState<string>('');
    const [dob, setDob] = useState<Date | string>('');
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [clinicBranchId, setClinicBranchId] = useState<number>(0);
    const [avatar, setAvatar] = useState<string>('');
    const [avatarData, setAvatarData] = useState<File | null>(null);
    const toast = useToast();
    const { data } = useUserProfile();

    const api = new ApiClient<any>('/staff');
    const apiBranch = new ApiClient<any>('/branch/clinic');

    const areAllFieldsFilled = () => {
        return (
            fullName !== '' &&
            dob !== '' &&
            gender !== '' &&
            phone !== '' &&
            email !== '' &&
            address !== '' &&
            avatar !== '' &&
            avatarData !== null &&
            clinicBranchId !== 0
        );
    };

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

    const handleAvatarChange = (e: any) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                setAvatar(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
            setAvatarData(selectedFile);
        }
    }

    const getBranchByClinic = async () => {
        try {
            const response = await apiBranch.getDetail(data?.clinicId);
            console.log(response);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });

            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
        }
    }

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();

        let avatarUrl: string = '';

        if (avatarData) {
            const formDataImage = new FormData();
            formDataImage.append("file", avatarData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                avatarUrl = response.data.secure_url;
                console.log("Cloudinary image URL:", avatarUrl);
            } catch (error) {
                console.error(error);
            }
        }

        const data = {
            fullName,
            dob,
            gender,
            phone,
            email,
            address,
            avatar: avatarUrl,
            clinicBranchId
        };

        try {
            const response = await api.create(data);
            console.log(response);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        changeTabTitle('Create Staff');
    }, []);

    useEffect(() => {
        if (data?.clinicId) {
            getBranchByClinic();
        }
    }, [data?.clinicId]);

    return (
        <Stack w={'2xl'} m={'auto'}>
            <Stack gap={2} minW={'lg'} mb={10}>
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
                    <FormLabel
                        htmlFor="avt"
                        cursor='pointer'
                        fontSize='md'
                        ml={-8}
                    >
                        <FaPen />
                    </FormLabel>
                    <Input
                        type="file"
                        id="avt"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        display='none'
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
            <HStack
                pos={'fixed'}
                w={'99%'}
                bg={"blue.200"}
                left={2}
                right={2}
                bottom={2}
                justify={'flex-end'}
                gap={4}
            >
                <Button
                    bg={'white'}
                    border={Border.tableBorder}
                    variant={"solid"}
                    fontSize={15}
                    fontWeight={400}
                    px={2}
                    my={1}
                    h={6}
                    onClick={handleReset}
                >
                    Reset
                </Button>
                <Button
                    colorScheme={"blue"}
                    variant={"solid"}
                    fontSize={15}
                    fontWeight={400}
                    px={2}
                    mr={6}
                    my={1}
                    h={6}
                    onClick={handleCreate}
                    isDisabled={!areAllFieldsFilled()}
                >
                    Create
                </Button>
            </HStack>
        </Stack>
    )
}

export default CreateStaffPage