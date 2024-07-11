import { SimpleGrid, Text } from "@chakra-ui/react"
import { Color } from "../../../../styles/styles"
import DentistItem from "../../../../components/dentist_item"
import useDentistByClinicId from "../../../../hooks/useDentistByClinicId";

interface Prop {
    clinicId: number;
}

const DentalDentist = ({ clinicId }: Prop) => {
    const { data } = useDentistByClinicId({ clinicId: clinicId });

    return (
        <>
            <Text
                maxW={'sm'}
                fontSize={20}
                pl={4}
                py={1}
                mb={4}
                fontWeight={500}
                borderRadius={'full'}
                bgGradient={Color.headingGradientMd}
            >
                Medical Team
            </Text>
            <SimpleGrid columns={4} spacing={6} mb={6}>
                <DentistItem type={2} data={data} />
            </SimpleGrid>
        </>
    )
}

export default DentalDentist