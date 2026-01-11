'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, Label, Modal, ModalBody, ModalFooter, ModalHeader, Radio } from "flowbite-react";
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
        guestCount: Yup.string()
            .required('Обязательное поле')
            .oneOf(['1', 'plus-one'], 'Выберите один из вариантов'),
        alcoholPreferences: Yup.array()
            .of(Yup.string())
            .min(1, 'Выберите хотя бы один вариант'),
    });

    const formMethods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: '',
            attendance: '',
            guestCount: '',
            alcoholPreferences: [],
        },
    });

    const { handleSubmit, control, formState: { errors } } = formMethods;

    const submit = handleSubmit(async (data) => {
        setIsPending(true);

        try {
            const response = await fetch('/api/submit-guest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Произошла ошибка при отправке');
            }

            alert('✅ Анкета успешно отправлена!');
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('❌ Ошибка при отправке анкеты. Попробуйте еще раз.');
        } finally {
            setIsPending(false);
        }
    });

    return (
        <FormProvider {...formMethods}>
            <Modal dismissible show onClose={onClose}>
                <ModalHeader className="border-gray-200">
                    <span className="font-extrabold">Анкета гостя</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="fullName" className="mb-2 block text-base font-extrabold">ФИО</Label>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="fullName"
                                        type="text"
                                        placeholder="Введите ваше полное имя"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                )}
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-base text-red-600">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-2 block text-base font-extrabold">Планируете ли вы присутствовать?</Label>
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
                                                <Label htmlFor="attendance-yes" className="text-base">Обязательно буду</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio
                                                    id="attendance-no"
                                                    {...field}
                                                    value="no"
                                                    checked={field.value === 'no'}
                                                />
                                                <Label htmlFor="attendance-no" className="text-base">К сожалению, не смогу присутствовать</Label>
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                            {errors.attendance && (
                                <p className="mt-1 text-base text-red-600">
                                    {errors.attendance.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-2 block text-base font-extrabold">Количество гостей</Label>
                            <div className="flex flex-col gap-2">
                                <Controller
                                    name="guestCount"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Radio
                                                    id="guest-count-1"
                                                    {...field}
                                                    value="1"
                                                    checked={field.value === '1'}
                                                />
                                                <Label htmlFor="guest-count-1" className="text-base">1 гость</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio
                                                    id="guest-count-plus-one"
                                                    {...field}
                                                    value="plus-one"
                                                    checked={field.value === 'plus-one'}
                                                />
                                                <Label htmlFor="guest-count-plus-one" className="text-base">+1 гость</Label>
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                            {errors.guestCount && (
                                <p className="mt-1 text-base text-red-600">
                                    {errors.guestCount.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-2 block text-base font-extrabold">Предпочтения по алкоголю</Label>
                            <div className="flex flex-col gap-2">
                                <Controller
                                    name="alcoholPreferences"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="alcohol-wine"
                                                    checked={(field.value ?? []).includes('wine')}
                                                    onChange={(e) => {
                                                        const currentValue = field.value ?? [];
                                                        if (e.target.checked) {
                                                            field.onChange([...currentValue, 'wine']);
                                                        } else {
                                                            field.onChange(currentValue.filter((v) => v !== 'wine'));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="alcohol-wine" className="text-base">Вино</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="alcohol-champagne"
                                                    checked={(field.value ?? []).includes('champagne')}
                                                    onChange={(e) => {
                                                        const currentValue = field.value ?? [];
                                                        if (e.target.checked) {
                                                            field.onChange([...currentValue, 'champagne']);
                                                        } else {
                                                            field.onChange(currentValue.filter((v) => v !== 'champagne'));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="alcohol-champagne" className="text-base">Шампанское</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="alcohol-vodka"
                                                    checked={(field.value ?? []).includes('vodka')}
                                                    onChange={(e) => {
                                                        const currentValue = field.value ?? [];
                                                        if (e.target.checked) {
                                                            field.onChange([...currentValue, 'vodka']);
                                                        } else {
                                                            field.onChange(currentValue.filter((v) => v !== 'vodka'));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="alcohol-vodka" className="text-base">Водка</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="alcohol-whiskey"
                                                    checked={(field.value ?? []).includes('whiskey')}
                                                    onChange={(e) => {
                                                        const currentValue = field.value ?? [];
                                                        if (e.target.checked) {
                                                            field.onChange([...currentValue, 'whiskey']);
                                                        } else {
                                                            field.onChange(currentValue.filter((v) => v !== 'whiskey'));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="alcohol-whiskey" className="text-base">Виски</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="alcohol-cognac"
                                                    checked={(field.value ?? []).includes('cognac')}
                                                    onChange={(e) => {
                                                        const currentValue = field.value ?? [];
                                                        if (e.target.checked) {
                                                            field.onChange([...currentValue, 'cognac']);
                                                        } else {
                                                            field.onChange(currentValue.filter((v) => v !== 'cognac'));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="alcohol-cognac" className="text-base">Коньяк</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="alcohol-beer"
                                                    checked={(field.value ?? []).includes('beer')}
                                                    onChange={(e) => {
                                                        const currentValue = field.value ?? [];
                                                        if (e.target.checked) {
                                                            field.onChange([...currentValue, 'beer']);
                                                        } else {
                                                            field.onChange(currentValue.filter((v) => v !== 'beer'));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="alcohol-beer" className="text-base">Пиво</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="alcohol-none"
                                                    checked={(field.value ?? []).includes('none')}
                                                    onChange={(e) => {
                                                        const currentValue = field.value ?? [];
                                                        if (e.target.checked) {
                                                            field.onChange([...currentValue, 'none']);
                                                        } else {
                                                            field.onChange(currentValue.filter((v) => v !== 'none'));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="alcohol-none" className="text-base">Не употребляю</Label>
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                            {errors.alcoholPreferences && (
                                <p className="mt-1 text-base text-red-600">
                                    {errors.alcoholPreferences.message}
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