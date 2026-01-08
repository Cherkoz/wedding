'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Radio } from "flowbite-react";
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useState } from 'react';

interface QuestionModalProps {
    onClose: () => void;
}

export function QuestionModal({ onClose }: QuestionModalProps) {
    const [isPending, setIsPending] = useState(false);

    const formSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Обязательное поле')
            .min(2, 'Минимум 2 символа')
            .max(128, 'Максимум 128 символов'),
        attendance: Yup.string()
            .required('Обязательное поле')
            .oneOf(['yes', 'no'], 'Выберите один из вариантов'),
    });

    const formMethods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: '',
            attendance: '',
        },
    });

    const { handleSubmit, control, formState: { errors } } = formMethods;

    const submit = handleSubmit(async (data) => {
        setIsPending(true);

        // TODO: Здесь добавить API вызов для отправки данных
        console.log('Submitted data:', data);

        // Пример: await Api.submitGuestForm(data)
        //   .then(() => {
        //     toast.success('Анкета отправлена');
        //     onClose();
        //   })
        //   .catch(toast.error);

        setIsPending(false);
    });

    return (
        <FormProvider {...formMethods}>
            <Modal dismissible show onClose={onClose}>
                <ModalHeader>Анкета гостя</ModalHeader>
                <ModalBody>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="fullName" className="mb-2 block">ФИО</Label>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="fullName"
                                        type="text"
                                        placeholder="Введите ваше полное имя"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    />
                                )}
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-2 block">Планируете ли вы присутствовать?</Label>
                            <div className="flex flex-col gap-2">
                                <Controller
                                    name="attendance"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Radio
                                                    id="attendance-yes"
                                                    {...field}
                                                    value="yes"
                                                    checked={field.value === 'yes'}
                                                />
                                                <Label htmlFor="attendance-yes">Обязательно буду</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio
                                                    id="attendance-no"
                                                    {...field}
                                                    value="no"
                                                    checked={field.value === 'no'}
                                                />
                                                <Label htmlFor="attendance-no">К сожалению, не смогу присутствовать</Label>
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                            {errors.attendance && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                                    {errors.attendance.message}
                                </p>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        disabled={isPending}
                        onClick={submit}
                        className="w-full"
                        // isProcessing={isPending}
                    >
                        Отправить
                    </Button>
                </ModalFooter>
            </Modal>
        </FormProvider>
    );
}