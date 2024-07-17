import { Button, FormControl, FormLabel, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { Border } from "../../../styles/styles";
import { VietnamCities } from "../../../types/type.enum";
import { trimAll } from "../../../utils/trimAll";

const CreateClinicBranchPage = () => {
    const [branchName, setBranchName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const toast = useToast();

    const api = new ApiClient<any>('/branch');

    const areAllFieldsFilled = () => {
        return (
            branchName.trim() !== '' &&
            city !== '' &&
            phone.trim() !== '' &&
            address.trim() !== ''
        );
    };

    const handleReset = () => {
        setBranchName('');
        setCity('');
        setPhone('');
        setAddress('');
    }

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            branchName: trimAll(branchName),
            city,
            phone: phone.trim(),
            address: trimAll(address),
        };

        try {
            const response = await api.create(data);

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
        changeTabTitle('Create Clinic Branch');
    }, []);

    return (
        <Stack w={'2xl'} m={'auto'}>
            <Stack gap={2} minW={'lg'} mb={10}>
                <FormControl id="branchName" flex={2} isRequired>
                    <FormLabel pl={1}>Branch Name</FormLabel>
                    <Input
                        type="text"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        placeholder="Enter branch name"
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
                <HStack>
                    <FormControl id="city" flex={1} isRequired>
                        <FormLabel pl={1}>City</FormLabel>
                        <Select
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={'Select city'}
                        >
                            {Object.values(VietnamCities).sort((a, b) => a.localeCompare(b)).map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </Select>
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

export default CreateClinicBranchPage