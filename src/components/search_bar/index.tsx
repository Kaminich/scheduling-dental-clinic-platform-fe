import { Divider, Input, InputGroup, InputRightAddon, Select, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import ApiClient from "../../services/apiClient";
import { useNavigate } from "react-router";

const SearchBar = () => {
    const [category, setCategory] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        //     const api = new ApiClient<any>('/clinic/search');
        //     try {
        //         const response = await api.getUnauthen({
        //             params: {
        //                 filter: category,
        //                 searchValue: keyword
        //             }
        //         })
        //         if (response.success) {

        //         }
        //     } catch (error) {

        //     }
    }
    return (
        <>
            <InputGroup
                border={'solid #f1f1f1'}
                p={1}
                borderRadius={10}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        navigate('result')
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
                        <option value='Blog '>Blog</option>
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
                    onClick={() => navigate('search')}
                >
                    <Text mr={2} fontWeight={500} color={'white'}>Search</Text>
                    <FaSearch color="white" />
                </InputRightAddon>
            </InputGroup>
        </>
    )
}

export default SearchBar