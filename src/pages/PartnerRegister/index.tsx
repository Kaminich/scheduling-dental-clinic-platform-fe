import { Button, Card, CardBody, Divider, FormControl, FormLabel, HStack, Heading, Input, Select, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Color, Shadow } from "../../styles/styles";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { FaUpload } from "react-icons/fa6";
import axios from "axios";
import ApiClient from "../../services/apiClient";
import LoadingModal from "../../components/modal/loading";
import { VietnamCities } from "../../types/type.enum";
import { trimAll } from "../../utils/trimAll";

const PartnerRegisterPage = () => {
    const [clinicName, setClinicName] = useState<string>('');
    const [clinicPhone, setClinicPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [clinicRegistration, setClinicRegistration] = useState<File | null>(null);
    const [websiteUrl, setWebsiteUrl] = useState<string>('');
    const [clinicImageData, setClinicImageData] = useState<File | null>(null);
    const [fullName, setFullName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();

    const toast = useToast();

    const resetAllField = () => {
        setClinicName('');
        setClinicPhone('');
        setAddress('');
        setCity('');
        setClinicRegistration(null);
        setWebsiteUrl('');
        setClinicImageData(null);
        setFullName('');
        setPhone('');
        setEmail('');
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setClinicImageData(selectedFile);
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setClinicRegistration(file);
        }
    };

    const handleSendInfo = async (e: FormEvent) => {
        e.preventDefault();
        onOpenLoading();
        let imageUrl: string = '';
        let fileUrl: string = '';

        if (clinicImageData) {
            const formDataImage = new FormData();
            formDataImage.append("file", clinicImageData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                imageUrl = response.data.secure_url;
            } catch (error) {
                console.error(error);
            }
        }

        if (clinicRegistration) {
            const formDataFile = new FormData();
            formDataFile.append("file", clinicRegistration);
            formDataFile.append("upload_preset", "z5r1wkcn");
            formDataFile.append("filename_override", clinicRegistration.name);

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/auto/upload`,
                    formDataFile
                );
                fileUrl = response.data.secure_url;
            } catch (error) {
                console.error(error);
            }
        } else {
            toast({
                title: "Error",
                description: "Clinic Registration must be uploaded",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
            return;
        }

        if (!imageUrl || !fileUrl) {
            toast({
                title: "Error",
                description: "Failed to upload images or files",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
            return;
        }

        const api = new ApiClient<any>('/clinics/registration');
        const data = {
            clinicName: trimAll(clinicName),
            address: trimAll(address),
            city,
            clinicPhone: clinicPhone.trim(),
            clinicRegistration: fileUrl,
            websiteUrl: websiteUrl.trim(),
            clinicImage: imageUrl,
            ownerInformation: {
                fullName: trimAll(fullName),
                email: email.trim(),
                phone: phone.trim()
            }
        }

        try {
            const response = await api.postUnauthen(data);
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                resetAllField();
            }
        } catch (error: any) {
            if (error) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } finally {
            onCloseLoading();
        }
    }

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
                    <Text fontSize={24}>Are you a dental clinic looking to enhance your practice and connect with more patients? Partner with us and join our cutting-edge dental clinic platform designed to revolutionize patient care and streamline your clinic operations.</Text>
                </Stack>
            </Stack>
            <HStack w={'7xl'} m={'auto'} my={8} align={'flex-start'} justify={'space-between'}>
                <Stack flex={1} mt={5}>
                    <Heading fontSize={32}>Become a partner of F-Dental</Heading>
                    <Text fontSize={24}>Please fill this form</Text>
                    <Text fontSize={72}>&#8594;</Text>
                </Stack>
                <Card flex={1} shadow={Shadow.cardShadow}>
                    <CardBody py={12}>
                        <Stack gap={4}>
                            <Heading
                                fontSize={"2xl"}
                                textAlign={'center'}
                                color={Color.greenBlue}
                                mb={2}
                                mt={-4}
                            >
                                Partner Registration
                            </Heading>
                            <Heading fontSize={18}>Clinic Information</Heading>
                            <FormControl id="clinicname" isRequired>
                                <FormLabel pl={1}>Clinic Name</FormLabel>
                                <Input
                                    type="text"
                                    value={clinicName}
                                    onChange={(e) => setClinicName(e.target.value)}
                                    placeholder="Clinic Name"
                                    required
                                />
                            </FormControl>
                            <FormControl id="address" isRequired>
                                <FormLabel pl={1}>Address</FormLabel>
                                <Input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Clinic Address"
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
                                        {Object.values(VietnamCities).sort((a, b) => a.localeCompare(b)).map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id="clinicphone" flex={1} isRequired>
                                    <FormLabel pl={1}>Clinic Phone Number</FormLabel>
                                    <Input
                                        type="tel"
                                        value={clinicPhone}
                                        onChange={(e) => setClinicPhone(e.target.value)}
                                        placeholder="Clinic Phone Number"
                                        required
                                    />
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl id="clinicregistration" flex={1} isRequired>
                                    <FormLabel pl={1}>Clinic Registration</FormLabel>
                                    <HStack justify="center" mt={4}>
                                        <Button
                                            as={FormLabel}
                                            leftIcon={<FaUpload />}
                                            requiredIndicator
                                            htmlFor="registration"
                                            colorScheme="teal"
                                            variant="outline"
                                            cursor="pointer"
                                            maxW={'294px'}
                                            m={0}
                                        >
                                            <Text
                                                noOfLines={1}
                                                fontSize={15}
                                            >
                                                {clinicRegistration?.name || 'Upload File'}
                                            </Text>
                                        </Button>
                                        <Input
                                            type="file"
                                            id="registration"
                                            onChange={handleFileChange}
                                            placeholder="Clinic Registration"
                                            required
                                            display="none"
                                        />
                                    </HStack>
                                </FormControl>
                                <FormControl id="clinicimage" flex={1} isRequired>
                                    <FormLabel pl={1}>Clinic Image</FormLabel>
                                    <HStack justify="center" mt={4}>
                                        <Button
                                            as={FormLabel}
                                            leftIcon={<FaUpload />}
                                            requiredIndicator
                                            htmlFor="image"
                                            colorScheme="teal"
                                            variant="outline"
                                            cursor="pointer"
                                            maxW={'294px'}
                                            m={0}
                                        >
                                            <Text
                                                noOfLines={1}
                                                fontSize={15}
                                            >
                                                {clinicImageData?.name || 'Upload Image'}
                                            </Text>
                                        </Button>
                                        <Input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            display="none"
                                            required
                                        />
                                    </HStack>
                                </FormControl>
                            </HStack>
                            <FormControl id="websiteurl" flex={1}>
                                <FormLabel pl={1}>Website Url</FormLabel>
                                <Input
                                    type="url"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                    placeholder="Website Url"
                                    required
                                />
                            </FormControl>
                            <Heading fontSize={18}>Owner Information</Heading>
                            <HStack>
                                <FormControl id="fullName" flex={2} isRequired>
                                    <FormLabel pl={1}>Full Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Full Name"
                                        required
                                    />
                                </FormControl>
                                <FormControl id="phone" flex={1} isRequired>
                                    <FormLabel pl={1}>Phone Number</FormLabel>
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
                            <Button
                                bg={Color.greenBlue}
                                color={'white'}
                                _hover={{ bg: Color.hoverGreenBlue }}
                                mt={4}
                                onClick={handleSendInfo}
                                isDisabled={
                                    clinicName.trim() === '' ||
                                    clinicPhone.trim() === '' ||
                                    address.trim() === '' ||
                                    city === '' ||
                                    clinicRegistration === null ||
                                    clinicImageData === null ||
                                    fullName.trim() === '' ||
                                    phone.trim() === '' ||
                                    email.trim() === ''
                                }
                            >
                                Send information
                            </Button>
                        </Stack>
                    </CardBody>
                </Card>
                <LoadingModal
                    isOpen={isOpenLoading}
                    onClose={onCloseLoading}
                />
            </HStack>
        </>
    )
}

export default PartnerRegisterPage