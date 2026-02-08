'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, Label, Modal, ModalBody, ModalFooter, ModalHeader, Radio } from "flowbite-react";
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useState, useRef } from 'react';

interface QuestionModalProps {
    onClose: () => void;
    guestNames?: string[];
}

export function QuestionModal({ onClose, guestNames = [] }: QuestionModalProps) {
    const [isPending, setIsPending] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [allWillAttend, setAllWillAttend] = useState(true);

    const guestSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Обязательное поле')
            .min(2, 'Минимум 2 символа')
            .max(128, 'Максимум 128 символов'),
        attendance: Yup.string()
            .required('Обязательное поле')
            .oneOf(['yes', 'no'], 'Выберите один из вариантов'),
        eventAttendance: Yup.string()
            .when('attendance', {
                is: 'yes',
                then: (schema) => schema.required('Обязательное поле').oneOf(['zags', 'banquet', 'both'], 'Выберите один из вариантов'),
                otherwise: (schema) => schema.notRequired(),
            }),
        alcoholPreferences: Yup.array()
            .of(Yup.string())
            .min(1, 'Выберите хотя бы один вариант'),
    });

    const formSchema = Yup.object().shape({
        guests: Yup.array().of(guestSchema).min(1)
    });

    const hasMultipleGuests = guestNames.length > 0;
    const initialGuests = hasMultipleGuests
        ? guestNames.map(name => ({
            fullName: name,
            attendance: '',
            eventAttendance: '',
            alcoholPreferences: [],
        }))
        : [{
            fullName: '',
            attendance: '',
            eventAttendance: '',
            alcoholPreferences: [],
        }];

    const formMethods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            guests: initialGuests,
        },
    });

    const { handleSubmit, control, watch, formState: { errors } } = formMethods;

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

            // Проверяем, будет ли хотя бы один гость присутствовать
            const hasAttendingGuests = data.guests?.some(guest => guest.attendance === 'yes') ?? false;
            setAllWillAttend(hasAttendingGuests);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('❌ Ошибка при отправке анкеты. Попробуйте еще раз.');
        } finally {
            setIsPending(false);
        }
    });

    const renderGuestFields = (index: number) => {
        const guestErrors = (errors.guests as Record<number, unknown>)?.[index] as Record<string, { message?: string }> || {};

        return (
            <div key={index} className="space-y-4 pb-6 mb-6 border-b last:border-b-0 last:mb-0 last:pb-0 border-gray-200">
                {hasMultipleGuests && (
                    <h3 className="text-2xl font-extrabold">Гость {index + 1}</h3>
                )}

                <div>
                    <Label htmlFor={`guests.${index}.fullName`} className="mb-2 block text-xl font-bold">ФИО</Label>
                    <Controller
                        name={`guests.${index}.fullName` as const}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id={`guests.${index}.fullName`}
                                type="text"
                                placeholder="Введите ваше полное имя"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            />
                        )}
                    />
                    {guestErrors.fullName && (
                        <p className="mt-1 text-xl text-red-600">
                            {guestErrors.fullName.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label className="mb-2 block text-xl font-bold">Планируете ли вы присутствовать?</Label>
                    <div className="flex flex-col gap-2">
                        <Controller
                            name={`guests.${index}.attendance` as const}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Radio
                                            id={`attendance-yes-${index}`}
                                            {...field}
                                            value="yes"
                                            checked={field.value === 'yes'}
                                        />
                                        <Label htmlFor={`attendance-yes-${index}`} className="text-xl w-full">Обязательно буду</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio
                                            id={`attendance-no-${index}`}
                                            {...field}
                                            value="no"
                                            checked={field.value === 'no'}
                                        />
                                        <Label htmlFor={`attendance-no-${index}`} className="text-xl w-full">К сожалению, не смогу присутствовать</Label>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                    {guestErrors.attendance && (
                        <p className="mt-1 text-xl text-red-600">
                            {guestErrors.attendance.message}
                        </p>
                    )}
                </div>

                {watch(`guests.${index}.attendance`) === 'yes' && (
                    <div>
                        <Label className="mb-2 block text-xl font-bold">Где планируете присутствовать?</Label>
                        <div className="flex flex-col gap-2">
                            <Controller
                                name={`guests.${index}.eventAttendance` as const}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                id={`event-zags-${index}`}
                                                {...field}
                                                value="zags"
                                                checked={field.value === 'zags'}
                                            />
                                            <Label htmlFor={`event-zags-${index}`} className="text-xl w-full">Только в ЗАГСе</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                id={`event-banquet-${index}`}
                                                {...field}
                                                value="banquet"
                                                checked={field.value === 'banquet'}
                                            />
                                            <Label htmlFor={`event-banquet-${index}`} className="text-xl w-full">Только на банкете</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                id={`event-both-${index}`}
                                                {...field}
                                                value="both"
                                                checked={field.value === 'both'}
                                            />
                                            <Label htmlFor={`event-both-${index}`} className="text-xl w-full">Обязательно буду и в ЗАГСе, и на банкете</Label>
                                        </div>
                                    </>
                                )}
                            />
                        </div>
                        {guestErrors.eventAttendance && (
                            <p className="mt-1 text-xl text-red-600">
                                {guestErrors.eventAttendance.message}
                            </p>
                        )}
                    </div>
                )}

                <div>
                    <Label className="mb-2 block  text-xl font-bold">Предпочтения по алкоголю</Label>
                    <div className="flex flex-col gap-2">
                        <Controller
                            name={`guests.${index}.alcoholPreferences` as const}
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`alcohol-champagne-${index}`}
                                            ref={field.ref}
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
                                        <Label htmlFor={`alcohol-champagne-${index}`} className="text-xl w-full">Шампанское</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`alcohol-redwine-${index}`}
                                            checked={(field.value ?? []).includes('redWine')}
                                            onChange={(e) => {
                                                const currentValue = field.value ?? [];
                                                if (e.target.checked) {
                                                    field.onChange([...currentValue, 'redWine']);
                                                } else {
                                                    field.onChange(currentValue.filter((v) => v !== 'redWine'));
                                                }
                                            }}
                                        />
                                        <Label htmlFor={`alcohol-redwine-${index}`} className="text-xl w-full">Вино красное</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`alcohol-whitewine-${index}`}
                                            checked={(field.value ?? []).includes('whiteWine')}
                                            onChange={(e) => {
                                                const currentValue = field.value ?? [];
                                                if (e.target.checked) {
                                                    field.onChange([...currentValue, 'whiteWine']);
                                                } else {
                                                    field.onChange(currentValue.filter((v) => v !== 'whiteWine'));
                                                }
                                            }}
                                        />
                                        <Label htmlFor={`alcohol-whitewine-${index}`} className="text-xl w-full">Вино белое</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`alcohol-whiskey-${index}`}
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
                                        <Label htmlFor={`alcohol-whiskey-${index}`} className="text-xl w-full">Виски</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`alcohol-none-${index}`}
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
                                        <Label htmlFor={`alcohol-none-${index}`} className="text-xl w-full">Не пью</Label>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                    {guestErrors.alcoholPreferences && (
                        <p className="mt-1 text-xl text-red-600">
                            {guestErrors.alcoholPreferences.message}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <FormProvider {...formMethods}>
            <Modal dismissible show={!showSuccessModal} onClose={onClose}>
                <ModalHeader className="border-gray-200">
                    <span className="font-extrabold text-3xl">Анкета гостя</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-4">
                        {initialGuests.map((_, index) => renderGuestFields(index))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        disabled={isPending}
                        onClick={submit}
                        className="w-full"
                        color="brown"
                    >
                        Отправить анкету
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal dismissible show={showSuccessModal} onClose={() => {
                setShowSuccessModal(false);
                onClose();
            }}>
                <ModalHeader className="border-gray-200">
                    <span className="font-extrabold text-3xl">Успешно!</span>
                </ModalHeader>
                <ModalBody>
                    <div className="text-center space-y-4">
                        <div className="text-6xl">{allWillAttend ? '✅' : '💌'}</div>
                        <p className="text-2xl font-bold">Анкета успешно отправлена!</p>
                        {allWillAttend ? (
                            <p className="text-xl text-gray-600">Спасибо за ваш ответ. Мы ждём вас на нашем празднике!</p>
                        ) : (
                            <p className="text-xl text-gray-600">Спасибо за ваш ответ. Жаль, что вы не сможете присутствовать, но мы надеемся увидеться в другой раз!</p>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            setShowSuccessModal(false);
                            onClose();
                        }}
                        className="w-full"
                        color="brown"
                    >
                        Закрыть
                    </Button>
                </ModalFooter>
            </Modal>
        </FormProvider>
    );
}