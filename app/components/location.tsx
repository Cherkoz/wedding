import { Button } from "flowbite-react";
import { CarouselLocation } from "./carousel-location";
import { buttonTheme } from "../theme/button-theme";

export function Location() {
    return (
        <div className="container flex flex-col items-center gap-6 w-full relative max-w-screen! overflow-x-hidden">
            <h2 className="font-anastasia text-6xl text-center">Локация</h2>
            <p className="text-center">
                <span className="font-extrabold text-xl">Ресторан Catch,</span><br />
                ул. Академика Пилюгина, 3, Москва
            </p>
            <CarouselLocation />

            
            
            <a
                href="https://yandex.ru/maps/213/moscow/?ll=37.530430%2C55.670252&mode=poi&poi%5Bpoint%5D=37.528808%2C55.671122&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D36700959360%26yclid%3D16656974419604799487&z=17.23"
                target="_blanck"
            >
                <Button size="lg" color="pink" theme={buttonTheme}>
                    Посмотреть на карте
                </Button>
            </a>
        </div>
    );
}