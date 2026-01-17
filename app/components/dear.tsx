import Image from "next/image";

export function Dear() {
    return (
        <div className="relative overflow-hidden">
        <div className="container">
            <Image className="-z-10 absolute w-100 -left-60 md:-left-50" src="/assets/images/bg/width_200.webp" width={200} height={200} alt="" />
            <Image className="-z-10 absolute w-100 -right-60 top-0 md:-right-50" src="/assets/images/bg/width_200.webp" width={200} height={200} alt="" />

            <h2 className="font-anastasia text-6xl text-center mb-6">
                Дорогие друзья
                <br className="md:hidden" /> и родные
            </h2>

            <div className="flex flex-col gap-6 text-center text-2xl">
                <p>Совсем скоро в нашей жизни произойдет очень важное событие - наша свадьба!</p>
                <p>
                    Мы с радостью приглашаем вас разделить с нами
                    <br/>этот особенный день ваша поддержка и присутствие
                    <br/>сделают наш праздник незабываемым.
                </p>
                <p>Этот день полон значимости и радостных моментов, и ваше присутствие
                сделает его по-настоящему особенным.</p>
            </div>
        </div>
        </div>
    );
}