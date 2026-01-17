import { Button } from "flowbite-react";
import Image from "next/image";

export function Details() {
    return (
        <div className="container">
            <h2 className="mb-6 text-center text-6xl font-anastasia">Пожелания и детали</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Image src="/assets/images/details.jpeg" width={1000} height={1000} alt="" className="w-full" />
                <div>
                    <div className="border-b border-second pb-6 mb-6">
                        <h3 className="text-3xl font-bold mb-2">Подарки</h3>
                        <p className="text-2xl text-bold">Ваше присутствие - лучший подарок, но если вы захотите сделать еще что-то, будем рады конвертику</p>
                    </div>

                    <div className="border-b border-second pb-6 mb-6">
                        <h3 className="text-3xl font-extrabold mb-2">Контакты</h3>
                        <p className="text-2xl">
                            По возникающим вопросам можете обращаться по номеру телефона невесты <br/>
                            <a href="tel:+79774159646" className="font-extrabold">
                                +7 (977) 415-96-46
                            </a>
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-extrabold mb-6">Чат для гостей</h3>
                        <p className="text-2xl">Мы создали группу в Telegram. куда можно будет добавлять фото и видео с нашей свадьбы, чтобы сохранить в памяти лучшие моменты</p>
                        <a href="https://t.me/+RcCINPM2_Gs1YzI6" target="_blanck" className="block mt-6">
                            <Button color="brown" outline>
                                Вступить в чат
                            </Button>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}