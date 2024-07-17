import { Divider, Input, InputGroup, InputRightAddon, Select, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = () => {
    const [category, setCategory] = useState<string>('');
    return (
        <>
            <InputGroup
                border={'solid #f1f1f1'}
                p={1}
                borderRadius={10}
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
                >
                    <Text mr={2} fontWeight={500} color={'white'}>Search</Text>
                    <FaSearch color="white" />
                </InputRightAddon>
            </InputGroup>
        </>
    )
}

export default SearchBar