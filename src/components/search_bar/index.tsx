import { Divider, Input, InputGroup, InputRightAddon, Select, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router";

const SearchBar = () => {
    const [category, setCategory] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSearch = () => {
        if (category === '' || keyword.trim() === '') {
            toast({
                title: "Warning",
                description: 'Please enter keyword and choose category to search',
                status: "warning",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
            return;
        }
        if (category === 'DentalClinic') {
            navigate(`/dentals?category=${category}&keyword=${keyword}`);
        } else if (category === 'Dentist') {
            navigate(`/dentists?category=${category}&keyword=${keyword}`);
        } else if (category === 'Service') {
            navigate(`/services?category=${category}&keyword=${keyword}`);
        } else if (category === 'Blog') {
            navigate(`/blogs?category=${category}&keyword=${keyword}`);
        }
    }
    return (
        <>
            <InputGroup
                border={'solid #f1f1f1'}
                p={1}
                borderRadius={10}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        handleSearch();
                    }
                }}
            >
                <Input
                    type={'text'}
                    size={'lg'}
                    px={5}
                    border={'none'}
                    focusBorderColor="white"
                    placeholder="Search by category ..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <InputRightAddon
                    bg={'white'}
                    h={'auto'}
                    border={'none'}
                >
                    <Divider orientation="vertical" borderColor={"gray"} opacity={0.3} h={7} />
                </InputRightAddon>
                <InputRightAddon
                    w='11rem'
                    h={'auto'}
                    cursor='pointer'
                    bg={'white'}
                    border={'none'}
                    borderRadius={10}
                    p={0}
                >
                    <Select
                        placeholder='Select category'
                        borderColor="white"
                        focusBorderColor="white"
                        cursor={'pointer'}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        _hover={{ outline: 'none' }}
                    >
                        <option value='DentalClinic'>Dental Clinic</option>
                        <option value='Dentist'>Dentist</option>
                        <option value='Service'>Service</option>
                        <option value='Blog'>Blog</option>
                    </Select>
                </InputRightAddon>
                <InputRightAddon
                    w='7rem'
                    h={'auto'}
                    cursor='pointer'
                    bg={'#3db3e6'}
                    _hover={{ bg: '#3eacdb' }}
                    ml={5}
                    mr={1}
                    borderRadius={10}
                    onClick={handleSearch}
                >
                    <Text mr={2} fontWeight={500} color={'white'}>Search</Text>
                    <FaSearch color="white" />
                </InputRightAddon>
            </InputGroup>
        </>
    )
}

export default SearchBar