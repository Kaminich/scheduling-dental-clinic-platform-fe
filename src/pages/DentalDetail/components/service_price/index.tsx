import { Card, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Border, Color, Shadow } from "../../../../styles/styles"
import ApiClient from "../../../../services/apiClient"
import { ApiResponse } from "../../../../types/ApiResponse";
import CategoryViewResponse from "../../../../types/CategoryViewResponse";
import { Fragment, useEffect, useState } from "react";
import CategoryResponse from "../../../../types/CategoryResponse";

interface Prop {
    clinicId: number;
}

const ServicePrice = ({ clinicId }: Prop) => {
    const api = new ApiClient<ApiResponse<CategoryResponse>>('/category');
    const [categories, setCategories] = useState<CategoryViewResponse[]>([]);

    const getServiceAndPrice = async () => {
        try {
            const response = await api.getUnauthen({
                params: {
                    clinicId
                }
            })
            if (response.success) {
                setCategories(response.data["Categories by clinic"])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (clinicId) {
            getServiceAndPrice();
        }
    }, [clinicId])

    return (
        <Stack>
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
                Service and Price list
            </Text>
            <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
                <Table size={'lg'} variant={'unstyled'}>
                    <Thead>
                        <Tr borderBottom={Border.tableBorder}>
                            <Th w={'2xl'}>Service</Th>
                            <Th
                                borderStart={Border.tableBorder}
                                borderEnd={Border.tableBorder}
                                textAlign={'center'}
                            >
                                Unit
                            </Th>
                            <Th textAlign={'center'}>Unit Price (VND)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category) => (
                            <Fragment key={category.id}>
                                <Tr borderBottom={Border.tableBorder}>
                                    <Th textTransform={'capitalize'}>{category.categoryName}</Th>
                                </Tr>
                                {category.services.map((service) => (
                                    <Tr key={service.id} borderBottom={Border.tableBorder}>
                                        <Td>{service.serviceName}</Td>
                                        <Td
                                            borderStart={Border.tableBorder}
                                            borderEnd={Border.tableBorder}
                                            textAlign={'center'}
                                        >
                                            {service.unitOfPrice}
                                        </Td>
                                        <Td textAlign={'center'}>
                                            {`${service.minimumPrice} - ${service.maximumPrice}`}
                                        </Td>
                                    </Tr>
                                ))}
                            </Fragment>
                        ))}
                    </Tbody>
                </Table>
            </Card>
        </Stack>
    )
}

export default ServicePrice