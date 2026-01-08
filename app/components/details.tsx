import Image from "next/image";

export function Details() {
    return (
        <div className="container">
            <h2 className="mb-6 text-center text-6xl font-anastasia">Пожелания и детали</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Image src="/assets/images/details.jpeg" width={1000} height={1000} alt="" className="w-full" />
                <div>
                    <div className="border-b border-amber-950 pb-2 mb-4">
                        <h3 className="text-xl">Подарки</h3>
                        <p>Ваше присутствие - лучший подарок, но если вы захотите сделать еще что-то, будем рады конвертику</p>
                    </div>

                    <div className="border-b border-amber-950 pb-2 mb-4">
                        <h3 className="text-xl">Контакты</h3>
                        <p>
                            По возникающим вопросам можете обращаться по номеру телефона невесты <br/>
                            +7 (977) 415 96 46
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl">Чат для гостей</h3>
                        <p>Мы создали группу в Telegram. куда можно будет добавлять фото и видео с нашей свадьбы, чтобы сохранить в памяти лучшие моменты</p>
                        <button className="py-4 px-6 border border-orange-950 rounded-2xl mt-6">Вступить в чат</button>
                    </div>
                </div>
            </div>
        </div>
    );
}