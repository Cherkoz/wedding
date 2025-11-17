import Image from "next/image";

export function Hero() {
    return (
        <div className="container flex justify-center flex-col items-center gap-4">
            <div className="flex items-center">
                <h1 className="text-4xl">Владислав + Валерия =</h1>
                <Image src="" alt="" className="w-10 h-10 bg-red-500" />
            </div>

            <div className="bg-white p-1 shadow w-fit">
                <Image src="" alt="" className="w-50 h-70 bg-red-500" />
                <div className="font-anastasia text-4xl mt-2">Мы женимся!</div>
            </div>

            <div className="text-center">
                <div>27.06.2026</div>
                <div>17:00</div>
            </div>
        </div>
    );
}