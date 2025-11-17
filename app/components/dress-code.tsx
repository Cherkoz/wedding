import Image from "next/image";

export function DressCode() {
    return (
        <div className="container flex flex-col gap-6 text-center">
            <h2 className="font-anastasia text-6xl">Дресс-код</h2>

            <p>Нам будет приятно, если вы поддержите стилистику нашей свадьбы и используете в ваших нарядах предложенные цвета</p>
            <div className="flex justify-center w-full">
                <Image src="" alt="" className="w-[200px] h-[200px] rounded-full bg-red-200" />
                <Image src="" alt="" className="w-[200px] ml-[-100px] h-[200px] rounded-full bg-red-300" />
                <Image src="" alt="" className="w-[200px] ml-[-100px] h-[200px] rounded-full bg-red-400" />
                <Image src="" alt="" className="w-[200px] ml-[-100px] h-[200px] rounded-full bg-red-500" />
                <Image src="" alt="" className="w-[200px] ml-[-100px] h-[200px] rounded-full bg-red-600" />
            </div>
            <p>Девушки, посторайтесь избегать оттенков белого и черного</p>
        </div>
    );
}