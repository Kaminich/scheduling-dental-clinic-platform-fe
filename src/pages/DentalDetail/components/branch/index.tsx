import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, Flex, ListItem, List, UnorderedList } from "@chakra-ui/react"
import { Shadow } from "../../../../styles/styles"
import { FaHospitalUser, FaLocationDot, FaPhone } from "react-icons/fa6"

const DentalDetailBranch = () => {
    return (
        <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
            <Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem py={2}>
                    <AccordionButton>
                        <Flex flex={1} align={'center'} gap={2} fontWeight={'bold'}>
                            <FaHospitalUser />
                            Ho Chi Minh
                        </Flex>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <UnorderedList>
                            <ListItem mb={2}>
                                <Flex align={'center'} gap={2}>
                                    <FaLocationDot />
                                    Quận 2
                                </Flex>
                            </ListItem>
                            <ListItem>
                                <Flex align={'center'} gap={2}>
                                    <FaPhone />
                                    0312345678
                                </Flex>
                            </ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem py={2}>
                    <AccordionButton>
                        <Flex flex={1} align={'center'} gap={2} fontWeight={'bold'}>
                            <FaHospitalUser />
                            Ha Noi
                        </Flex>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <UnorderedList>
                            <ListItem mb={2}>
                                <Flex align={'center'} gap={2}>
                                    <FaLocationDot />
                                    Quận 2
                                </Flex>
                            </ListItem>
                            <ListItem>
                                <Flex align={'center'} gap={2}>
                                    <FaPhone />
                                    0312345678
                                </Flex>
                            </ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

export default DentalDetailBranch