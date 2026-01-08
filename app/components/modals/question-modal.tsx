'use client';

import { Modal, ModalBody, ModalHeader } from "flowbite-react";

interface QuestionModalProps {
    onClose: () => void;
}

export function QuestionModal({ onClose }: QuestionModalProps) {
    return (
        <Modal dismissible show onClose={onClose}>
            <ModalHeader>Анкета гостя</ModalHeader>
            <ModalBody>
                {/* <div>kek</div> */}
            </ModalBody>
        </Modal>
    );
}