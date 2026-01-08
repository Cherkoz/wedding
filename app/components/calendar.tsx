import { BsHeartFill } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

export function Calendar() {
    const textStyle = 'text-center py-2';

    return (
        <div className="container">
            <h2 className="font-anastasia text-6xl text-center mb-6">
                Дата бракосочетания
            </h2>

            <p className="text-center font-extrabold text-xl mb-2">Июнь</p>
            <div className="w-full grid grid-cols-7 gap-2">
                <div className={textStyle}>пн</div>
                <div className={textStyle}>вт</div>
                <div className={textStyle}>ср</div>
                <div className={textStyle}>чт</div>
                <div className={textStyle}>пт</div>
                <div className={textStyle}>сб</div>
                <div className={textStyle}>вс</div>

                {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                    <div
                        key={num}
                        className={`relative flex justify-center items-center text-center py-2 ${num === 27 ? 'text-red-500' : ''}`}
                    >
                        {num === 27 && <CiHeart className="absolute mt-1 w-18 h-18" />}
                        {num}
                    </div>
                ))}
            </div>
        </div>
    );
}