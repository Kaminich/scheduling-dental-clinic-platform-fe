import { Button, Card, CardBody, FormControl, FormLabel, HStack, Image, Input, InputGroup, InputRightElement, Select, Stack, Tooltip, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react"
import { today } from "../../components/modal/appointment";
import { Shadow } from "../../styles/styles";
import { FaEye, FaEyeSlash, FaPen } from "react-icons/fa6";
import { useParams } from "react-router";
import useUserProfile from "../../hooks/useUserProfile";
import Customer, { CustomerInit } from "../../types/Customer";
import { changeTabTitle } from "../../utils/changeTabTitle";
import ApiClient from "../../services/apiClient";
import axios from "axios";

const UpdateProfilePage = () => {
    const [username, setUsername] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [avatar, setAvatar] = useState<any>();
    const [avatarData, setAvatarData] = useState<any>();
    const [showCurrent, setShowCurrent] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [currentPass, setCurrentPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [userData, setUserData] = useState<Customer>(CustomerInit);

    const { data } = useUserProfile();
    const toast = useToast();
    const param = useParams();

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

    const handleResetAllChanges = () => {
        setUsername(userData.username);
        setFullName(userData.fullName);
        setGender(userData.gender);
        setDob(userData.dob);
        setPhone(userData.phone);
        setEmail(userData.email);
        setAddress(userData.address);
        setAvatar(userData.avatar)
    }

    const handleUpdateProfile = async (e: FormEvent) => {
        e.preventDefault();
        let imageUrl: string = '';

        if (avatarData) {
            const formDataImage = new FormData();
            formDataImage.append("file", avatarData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                imageUrl = response.data.secure_url;
                console.log("Cloudinary image URL:", imageUrl);
            } catch (error) {
                console.error(error);
            }
        }

        const api = new ApiClient<any>('/auth/user-information');
        const data: Customer = {
            username,
            fullName,
            email,
            gender,
            phone,
            dob,
            address,
            avatar: imageUrl === '' ? avatar : imageUrl
        }

        try {
            const response = await api.update(data);
            console.log(response);
            if (response.status) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
        }
    }

    const handleUpdatePassword = async (e: FormEvent) => {
        e.preventDefault();
        if (newPass !== confirmPass) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
            return;
        }

        const api = new ApiClient('/auth/password-change');
        const data = {
            oldPassword: currentPass,
            newPassword: newPass,
        }

        try {
            const response: any = await api.create(data);
            console.log(response);
            if (response.status) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                setCurrentPass('');
                setNewPass('');
                setConfirmPass('');
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        if (param.type === 'profile') {
            changeTabTitle('Update Profile');
        } else {
            changeTabTitle('Update Password')
        }
    }, []);

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data])

    useEffect(() => {
        handleResetAllChanges();
    }, [userData])

    return (
        <>
            {param.type === 'profile' ? (
                <HStack w={'6xl'} m={'auto'} gap={56} align={'flex-start'}>
                    <Card
                        flex={1}
                        align='center'
                        justify='center'
                        gap={0}
                        shadow={Shadow.cardShadow}
                    >
                        <CardBody alignSelf={'center'} py={10}>
                            <HStack w={'full'} align={'flex-end'} gap={0}>
                                <Image
                                    border='1px solid gainsboro'
                                    borderRadius='full'
                                    boxSize={'15rem'}
                                    src={
                                        avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                    }
                                    alt='avatar'
                                    bgColor='white'
                                    objectFit={'cover'}
                                />
                                <FormLabel
                                    htmlFor="avt"
                                    cursor='pointer'
                                    fontSize='2xl'
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
                        </CardBody>
                    </Card>
                    <Stack flex={1.5}>
                        <Card shadow={Shadow.cardShadow}>
                            <CardBody py={8}>
                                <Stack gap={4}>
                                    <FormControl id="username">
                                        <FormLabel ml={1}>Username</FormLabel>
                                        <Tooltip
                                            label='You cannot update your username'
                                            bg='gray.300'
                                            color='black'
                                            placement="bottom-start"
                                        >
                                            <Input
                                                type="text"
                                                value={userData.username}
                                                readOnly
                                            />
                                        </Tooltip>
                                    </FormControl>
                                    <HStack>
                                        <FormControl id="fullName" flex={2.5}>
                                            <FormLabel ml={1}>Full Name</FormLabel>
                                            <Input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder={'Enter full name'}
                                            />
                                        </FormControl>
                                        <FormControl id="gender" flex={1.5}>
                                            <FormLabel ml={1}>Gender</FormLabel>
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
                                        <FormControl id="dob" flex={1}>
                                            <FormLabel pl={1}>Date of Birth</FormLabel>
                                            <Input
                                                type="date"
                                                max={today}
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl id="phone" flex={1}>
                                            <FormLabel ml={1} pl={1}>Phone number</FormLabel>
                                            <Input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Enter phone"
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="email" flex={2}>
                                        <FormLabel ml={1}>Email</FormLabel>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email"
                                        />
                                    </FormControl>
                                    <FormControl id="address" flex={2}>
                                        <FormLabel ml={1}>Address</FormLabel>
                                        <Input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter address"
                                        />
                                    </FormControl>
                                </Stack>
                            </CardBody>
                        </Card>
                        <HStack gap={6} mt={6} w={'sm'} ml={'auto'}>
                            <Button flex={1} onClick={handleResetAllChanges}>
                                Reset all changes
                            </Button>
                            <Button
                                colorScheme={"blue"}
                                variant={"solid"}
                                flex={1}
                                onClick={handleUpdateProfile}
                            >
                                Save changes
                            </Button>
                        </HStack>
                    </Stack>
                </HStack>
            ) : (
                <Stack align='center' w={'md'} m={'auto'}>
                    <Card justify='center' shadow={Shadow.cardShadow} w={'full'}>
                        <CardBody py={10}>
                            <Stack gap={6}>
                                <FormControl id="current-pass" isRequired>
                                    <FormLabel>Current Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showCurrent ? 'text' : 'password'}
                                            value={currentPass}
                                            required
                                            onChange={(e) => setCurrentPass(e.target.value)}
                                        />
                                        <InputRightElement width='4.5rem' cursor='pointer' onClick={() => setShowCurrent(!showCurrent)}>
                                            {!showCurrent ? <FaEye /> : <FaEyeSlash />}
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="new-pass" isRequired>
                                    <FormLabel>New Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showNew ? 'text' : 'password'}
                                            value={newPass}
                                            required
                                            onChange={(e) => setNewPass(e.target.value)}
                                        />
                                        <InputRightElement width='4.5rem' cursor='pointer' onClick={() => setShowNew(!showNew)}>
                                            {!showNew ? <FaEye /> : <FaEyeSlash />}
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="confirm-new-pass" isRequired>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showConfirm ? 'text' : 'password'}
                                            value={confirmPass}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                        />
                                        <InputRightElement width='4.5rem' cursor='pointer' onClick={() => setShowConfirm(!showConfirm)}>
                                            {!showConfirm ? <FaEye /> : <FaEyeSlash />}
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                        </CardBody>
                    </Card>
                    <HStack spacing={6} mt={5} w={'full'}>
                        <Button
                            flex={1}
                            onClick={() => {
                                setCurrentPass('');
                                setNewPass('');
                                setConfirmPass('');
                            }}
                        >
                            Reset change
                        </Button>
                        <Button
                            colorScheme={"blue"}
                            variant={"solid"}
                            flex={1}
                            onClick={handleUpdatePassword}
                        >
                            Save change
                        </Button>
                    </HStack>
                </Stack>
            )}
        </>

    )
}

export default UpdateProfilePage