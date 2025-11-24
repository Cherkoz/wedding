import Image from "next/image";

export function Hero() {
    return (
        <div className="container overflow-hidden min-h-screen flex justify-center flex-col items-center gap-1">
            <h1 className="leading-[0.9] flex flex-col text-4xl md:text-6xl text-brown text-center mb-2 md:block">
                Владислав <span>+</span> Валерия
            </h1>

            <div className="relative flex flex-col items-center bg-white p-1 shadow w-fit">
                <Image src="/assets/images/hero-pink.png" className="-z-10 absolute -top-26 w-[803px] min-w-[803px] h-[540px]" width={803} height={540} alt="" />
                <Image src="/assets/images/love.jpg" width={747} height={1024} alt="" className="w-50 h-70" />
                <div className="font-anastasia text-4xl mt-2 -ml-3">Мы женимся!</div>
            </div>

            <div className="text-center font-anastasia text-4xl leading-[0.9] -ml-3">
                <div>27.06.2026</div>
                <div>17:00</div>
            </div>
        </div>
    );
}