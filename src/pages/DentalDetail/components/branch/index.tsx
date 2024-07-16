import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, Flex, ListItem, UnorderedList } from "@chakra-ui/react"
import { Shadow } from "../../../../styles/styles"
import { FaHospitalUser, FaLocationDot, FaPhone } from "react-icons/fa6"
import useBranchByClinicId from "../../../../hooks/useBranchByClinicId"
import { useEffect, useState } from "react";
import BranchSummaryResponse from "../../../../types/BranchSummaryResponse";

interface Prop {
    clinicId: number;
}

const DentalDetailBranch = ({ clinicId }: Prop) => {
    const { data } = useBranchByClinicId({ clinicId: clinicId });
    const [branches, setBranches] = useState<BranchSummaryResponse[]>([]);

    useEffect(() => {
        if (data) {
            setBranches(data);
        }
    }, [data]);

    return (
        <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
            <Accordion defaultIndex={[0]} allowToggle>
                {branches.map((branch) => (
                    <AccordionItem py={2} key={branch.branchId}>
                        <AccordionButton>
                            <Flex flex={1} align={'center'} gap={2} fontWeight={'bold'}>
                                <FaHospitalUser />
                                {branch.city}
                            </Flex>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <UnorderedList>
                                <ListItem mb={2}>
                                    <Flex align={'center'} gap={2}>
                                        <FaLocationDot />
                                        {branch.address}
                                    </Flex>
                                </ListItem>
                                <ListItem>
                                    <Flex align={'center'} gap={2}>
                                        <FaPhone />
                                        {branch.phone}
                                    </Flex>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Card>
    )
}

export default DentalDetailBranch