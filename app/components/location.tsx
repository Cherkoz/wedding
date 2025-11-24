export function Location() {
    return (
        <div className="container flex flex-col items-center gap-6">
            <div className="grid grid-cols-2 gap-6 w-full">
                <div className="aspect-video w-full bg-gray-100 rounded-2xl"></div>
                <div className="aspect-video w-full bg-gray-100 rounded-2xl"></div>
            </div>
            <h2 className="font-anastasia text-6xl text-center">Локация</h2>
            <p className="text-center">Шале, Электролитный пр., 7, корп. 2, зал Беллуно</p>
            <button className="py-4 mx-auto px-6 bg-pink-100 rounded-2xl mt-6">Посмотреть на карте</button>
        </div>
    );
}