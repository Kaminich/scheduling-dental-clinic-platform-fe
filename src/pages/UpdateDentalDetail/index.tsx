import { Button, FormControl, FormLabel, HStack, Image, Input, Select, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../services/apiClient";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { FaCamera, FaPen } from "react-icons/fa6";
import axios from "axios";
import { Border } from "../../styles/styles";
import useUserProfile from "../../hooks/useUserProfile";
import BranchDetailResponse from "../../types/BranchDetailResponse";
import useBranchByClinicId from "../../hooks/useBranchByClinicId";
import LoadingModal from "../../components/modal/loading";

const UpdateDentalDetailPage = () => {
    const [phone, setPhone] = useState<string | number>('');
    const [email, setEmail] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [logo, setLogo] = useState<string>('');
    const [logoData, setLogoData] = useState<File | null>(null);
    const [clinicImage, setClinicImage] = useState<string>('');
    const [clinicImageData, setClinicImageData] = useState<File | null>(null);
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [branches, setBranches] = useState<BranchDetailResponse[]>([]);
    const { data: userData } = useUserProfile();
    const { data: branchData } = useBranchByClinicId({ clinicId: userData?.clinicId });
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();

    // const getDentistDetailById = async (id: number) => {
    //     try {
    //         const api = new ApiClient<ApiResponse<DentistDetailResponse>>('/dentists');
    //         const response = await api.getDetail(id);
    //         console.log(response);
    //         if (response.success) {
    //             setDentist(response.data);
    //         } else {
    //             toast({
    //                 title: "Error",
    //                 description: response.message,
    //                 status: "error",
    //                 duration: 2500,
    //                 position: 'top',
    //                 isClosable: true,
    //             });
    //         }
    //     } catch (error) {
    //         navigate('/not-found');
    //     }
    // }

    const api = new ApiClient<any>('/dentists');

    // const handleReset = () => {
    //     setPhone(dentist.phone);
    //     setEmail(dentist.email);
    //     setAddress(dentist.address);
    //     setDescription(dentist.description);
    //     setLogo(dentist.Logo);
    //     setLogoData(null);
    //     setClinicImage(dentist.Logo);
    //     setClinicImageData(null);
    // }

    const handleLogoChange = (e: any) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                setLogo(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
            setLogoData(selectedFile);
        }
    }

    const handleClinicImageChange = (e: any) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                setClinicImage(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
            setClinicImageData(selectedFile);
        }
    }

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        onOpenLoading();
        let logoUrl: string = '';
        let clinicImageUrl: string = '';

        if (logoData) {
            const formDataImage = new FormData();
            formDataImage.append("file", logoData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                logoUrl = response.data.secure_url;
                console.log("Cloudinary image URL:", logoUrl);
            } catch (error) {
                console.error(error);
            }
        }

        if (clinicImageData) {
            const formDataImage = new FormData();
            formDataImage.append("file", clinicImageData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                clinicImageUrl = response.data.secure_url;
                console.log("Cloudinary image URL:", clinicImageUrl);
            } catch (error) {
                console.error(error);
            }
        }

        const data = {

        };

        try {
            const response = await api.update(data);
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
                navigate(`administrator/accounts/dentist/${param.id}`);
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
        } finally {
            onCloseLoading();
        }
    };

    useEffect(() => {
        changeTabTitle('Update Dentist Profile');
    }, []);

    // useEffect(() => {
    //     if (param.id) {
    //         getDentistDetailById(parseInt(param.id));
    //     }
    // }, [param.id]);

    // useEffect(() => {
    //     handleReset();
    // }, [dentist]);

    useEffect(() => {
        if (branchData) {
            setBranches(branchData);
        }
    }, [branchData]);

    return (
        <Stack w={'6xl'} m={'auto'} mb={10}>
            <Stack w={'full'} pos={'relative'}>
                <Image
                    alt={"Slider Image"}
                    h={'50vh'}
                    borderRadius={10}
                    p={0}
                    src={
                        "https://benhviencuadong.vn/wp-content/uploads/2022/08/kham-nha-khoa-3.jpg"
                    }
                />
                <FormLabel
                    htmlFor="avt"
                    cursor='pointer'
                    fontSize='md'
                    pos={'absolute'} right={3} bottom={3}
                >
                    <Button gap={3}>
                        <FaCamera /> Update Clinic Image
                    </Button>
                </FormLabel>
                <Input
                    type="file"
                    id="avt"
                    accept="image/*"
                    onChange={handleLogoChange}
                    display='none'
                />
            </Stack>
            <HStack alignItems="center" mt={-12} mx={10} justify={'space-between'}>
                <HStack align={'flex-end'} gap={5}>
                    <Image
                        border='1px solid gainsboro'
                        borderRadius='full'
                        boxSize={'9rem'}
                        src={
                            logo || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                        }
                        alt='avatar'
                        bgColor='white'
                        objectFit={'cover'}
                        zIndex={2}
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
                        onChange={handleLogoChange}
                        display='none'
                    />
                </HStack>
            </HStack>
            <HStack gap={20} align={'flex-start'} my={10}>
                <Stack gap={3} flex={1}>
                    <FormControl id="email" isRequired>
                        <FormLabel pl={1}>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </FormControl>
                    <FormControl id="address" isRequired>
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
                                required
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
                        <FormControl id="phone" flex={1} isRequired>
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
                    <FormControl id="websiteUrl">
                        <FormLabel pl={1}>Website Url</FormLabel>
                        <Input
                            type="url"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter website url"
                        />
                    </FormControl>
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
                </Stack>
                <Stack gap={3} flex={1}>
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
                </Stack>
            </HStack>
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
                // onClick={handleReset}
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
                    onClick={handleUpdate}
                    isDisabled={
                        phone === '' ||
                        email === '' ||
                        address === '' ||
                        description === ''
                    }
                >
                    Save
                </Button>
            </HStack>
            <LoadingModal
                isOpen={isOpenLoading}
                onClose={onCloseLoading}
            />
        </Stack>
    )
}

export default UpdateDentalDetailPage