export function Location() {
    return (
        <div className="container flex flex-col items-center gap-6">
            <div className="grid grid-cols-2 gap-6 w-full">
                <div className="aspect-video w-full bg-gray-100 rounded-2xl"></div>
                <div className="aspect-video w-full bg-gray-100 rounded-2xl"></div>
            </div>
            <h2 className="font-anastasia text-6xl text-center">Локация</h2>
            <p className="text-center">
                Ресторан Catch,<br />
                ул. Академика Пилюгина, 3, Москва
            </p>
            <a
                href="https://yandex.ru/maps/213/moscow/?ll=37.530430%2C55.670252&mode=poi&poi%5Bpoint%5D=37.528808%2C55.671122&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D36700959360%26yclid%3D16656974419604799487&z=17.23"
                target="_blanck"
                className="mt-6"
            >
            <button className="py-4 mx-auto px-6 bg-pink-100 rounded-2xl">Посмотреть на карте</button>
            </a>
        </div>
    );
}