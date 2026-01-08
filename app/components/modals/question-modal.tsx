'use client';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

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
            <ModalFooter className="w-full justify-between">
                <div />
                <Button>Отправить</Button>
            </ModalFooter>
        </Modal>
    );
}