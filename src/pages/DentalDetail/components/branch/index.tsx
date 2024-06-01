import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, Flex, ListItem, UnorderedList } from "@chakra-ui/react"
import { Shadow } from "../../../../styles/styles"
import { FaLocationDot } from "react-icons/fa6"

const DentalDetailBranch = () => {
    return (
        <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
            <Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem py={2}>
                    <AccordionButton>
                        <Flex flex={1} align={'center'} gap={2}>
                            <FaLocationDot />
                            Ho Chi Minh
                        </Flex>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={4}>
                        <UnorderedList>
                            <ListItem>Quận 2</ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem py={2}>
                    <AccordionButton>
                        <Flex flex={1} align={'center'} gap={2}>
                            <FaLocationDot />
                            Ho Chi Minh
                        </Flex>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={4}>
                        <UnorderedList>
                            <ListItem>Quận 2</ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

export default DentalDetailBranch