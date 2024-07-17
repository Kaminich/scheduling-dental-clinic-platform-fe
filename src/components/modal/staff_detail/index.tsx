import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { Border } from "../../../styles/styles";
import StaffDetailResponse, { initialStaffDetailResponse } from "../../../types/StaffDetailResponse";
import { formatDate } from "../../../utils/formatDate";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const StaffDetailModal = ({ isOpen, onClose, id }: Props) => {
    const [staff, setStaff] = useState<StaffDetailResponse>(initialStaffDetailResponse)

    const handleShowInfo = async (id: number) => {
        try {
            const api = new ApiClient<any>('/staff');
            const response = await api.getDetail(id);
            if (response.success) {
                setStaff(response.data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (id !== 0) {
            handleShowInfo(id);
        }
    }, [id]);


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                <ModalHeader fontSize='xl'>Dental Clinic Detail</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={6} borderY={Border.tableBorder}>
                    <Stack gap={4}>
                        <HStack>
                            <Text>Staff ID:</Text>
                            <Text>{staff.id}</Text>
                        </HStack>
                        <HStack>
                            <Text>Full Name:</Text>
                            <Text>{staff.fullName}</Text>
                        </HStack>
                        <HStack>
                            <Text>Gender:</Text>
                            <Text>{staff.gender}</Text>
                        </HStack>
                        <HStack>
                            <Text>Date of Birth:</Text>
                            <Text>{formatDate(staff.dob)}</Text>
                        </HStack>
                        <HStack>
                            <Text>Phone:</Text>
                            <Text>{staff.phone}</Text>
                        </HStack>
                        <HStack>
                            <Text>Email:</Text>
                            <Text>{staff.email}</Text>
                        </HStack>
                        <HStack>
                            <Text>Address:</Text>
                            <Text>{staff.address}</Text>
                        </HStack>
                        <HStack>
                            <Text>Clinic Branch Name:</Text>
                            <Text>{staff.clinicBranchName}</Text>
                        </HStack>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default StaffDetailModal;