import { Button, FormControl, FormLabel, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../services/apiClient";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { today } from "../../../components/modal/appointment";

const CreateStaffPage = () => {
    const [fullName, setFullName] = useState<string>('');
    const [dob, setDob] = useState<Date | string>('');
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string | number>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const toast = useToast();

    const navigate = useNavigate();

    const api = new ApiClient<any>('/auth/register');

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            fullName,
            dob,
            gender,
            phone,
            email,
            address
        };

        try {
            const response = await api.postUnauthen(data);
            console.log(response);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    isClosable: true,
                });
                navigate('/login');
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                status: "error",
                duration: 2500,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        changeTabTitle('Create Staff');
    }, []);

    return (
        <Stack w={'2xl'} m={'auto'} gap={5}>
            <Stack gap={3} minW={'lg'}>
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
                        onChange={(e) => setGender(e.target.value)}
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
            <Button
                colorScheme={"blue"}
                variant={"solid"}
                onClick={handleSignUp}
            >
                Sign up
            </Button>
        </Stack>
    )
}

export default CreateStaffPage