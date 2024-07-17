import { SimpleGrid, Stack, Text } from "@chakra-ui/react"
import DentistItem from "../../components/dentist_item"
import { useEffect } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useDentists from "../../hooks/useDentists";
import Loading from "../../components/loading";

const DentistPage = () => {
    const { data, isLoading } = useDentists();

    useEffect(() => {
        changeTabTitle('Dentist');
    }, []);

    return (
        <>
            {!isLoading ? (
                <>
                    {data?.content.length !== 0 ? (
                        <SimpleGrid
                            columns={4}
                            spacingX={8}
                            spacingY={6}
                            maxW={'6xl'}
                            my={5}
                            mx={'auto'}
                            py={8}
                        >
                            <DentistItem type={1} data={data?.content} />
                        </SimpleGrid>
                    ) : (
                        <Stack m={'auto'}>
                            <Text>No dentist available</Text>
                        </Stack>
                    )}
                </>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default DentistPage