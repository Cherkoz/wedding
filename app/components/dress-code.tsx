import Image from "next/image";

export function DressCode() {
    return (
        <div className="container flex flex-col gap-6 text-center">
            <h2 className="font-anastasia text-6xl">Дресс-код</h2>

            <p className="text-xl">Нам будет приятно, если вы поддержите стилистику нашей свадьбы и используете в ваших нарядах предложенные цвета</p>
            <div className="flex justify-center w-full">
                <Image src="/assets/images/fabrics/1.jpg" width={200} height={200} alt="" className="w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-full" />
                <Image src="/assets/images/fabrics/2.jpg" width={200} height={200} alt="" className="w-[100px] md:w-[200px] ml-[-50px] md:ml-[-100px] h-[100px] md:h-[200px] rounded-full" />
                <Image src="/assets/images/fabrics/3.jpg" width={200} height={200} alt="" className="w-[100px] md:w-[200px] ml-[-50px] md:ml-[-100px] h-[100px] md:h-[200px] rounded-full" />
                <Image src="/assets/images/fabrics/4.jpg" width={200} height={200} alt="" className="w-[100px] md:w-[200px] ml-[-50px] md:ml-[-100px] h-[100px] md:h-[200px] rounded-full" />
                <Image src="/assets/images/fabrics/5.jpg" width={200} height={200} alt="" className="w-[100px] md:w-[200px] ml-[-50px] md:ml-[-100px] h-[100px] md:h-[200px] rounded-full" />
            </div>
            <p className="text-xl">Девушки, посторайтесь избегать оттенков белого и черного</p>
        </div>
    );
}